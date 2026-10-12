import { cacheLife } from "next/cache";
import * as fallback from "../data/portfolio";

export type Practicum = {
  place: string;
  team: string;
  period: string;
  role: string;
  summary: string;
  highlights: string[];
};

export type Intro = {
  affiliation: string;
  headline: string;
  tagline: string;
  bio: string;
  location: string;
  contactTitle: string;
  contactLead: string;
  volunteerLabel: string;
  volunteerValue: string;
  volunteerHint: string;
};

export type Content = {
  intro: Intro;
  vision: { label: string; text: string }[];
  strengths: { title: string; desc: string }[];
  skills: { label: string; title: string; desc: string }[];
  gpa: { year: string; value: number }[];
  contactValues: { title: string; desc: string }[];
  practicum: Practicum | null;
  practices: { place: string; period: string; role: string; tags: string[]; summary: string }[];
  volunteers: { title: string; org: string; period: string; note: string }[];
  campusActivities: { title: string; date: string; desc: string; color: string }[];
  projects: { title: string; period: string; summary: string; tags: string[]; image?: string; imageAlt?: string }[];
  awards: { title: string; org: string; year: string; type: string }[];
};

const campusColors = ["bg-accent", "bg-forest", "bg-emerald-300", "bg-teal-400", "bg-emerald-500"];

const staticIntro: Intro = {
  affiliation: `${fallback.profile.school} · ${fallback.profile.role}`,
  headline: fallback.profile.headline,
  tagline: fallback.profile.tagline,
  bio: fallback.profile.bio,
  location: fallback.profile.location,
  contactTitle: fallback.profile.contactTitle,
  contactLead: fallback.profile.contactLead,
  volunteerLabel: fallback.volunteerSummary.label,
  volunteerValue: fallback.volunteerSummary.value,
  volunteerHint: fallback.volunteerSummary.hint,
};

// Row names in the "소개" category that map to intro fields.
const introKeys: Record<string, keyof Intro> = {
  소속: "affiliation",
  "대표 문구": "headline",
  "한 줄 소개": "tagline",
  자기소개: "bio",
  지역: "location",
  "연락처 제목": "contactTitle",
  "연락처 문구": "contactLead",
  "봉사 요약 제목": "volunteerLabel",
  "봉사 요약 숫자": "volunteerValue",
  "봉사 요약 설명": "volunteerHint",
};

const staticContent: Content = {
  intro: staticIntro,
  vision: fallback.vision,
  strengths: fallback.strengths,
  skills: fallback.skills,
  gpa: fallback.gpa,
  contactValues: fallback.contactValues,
  practicum: fallback.practicum,
  practices: fallback.practices,
  volunteers: fallback.volunteers,
  campusActivities: fallback.campusActivities,
  projects: fallback.projects,
  awards: fallback.awards,
};

const orDefault = <T,>(items: T[], defaults: T[]) => (items.length > 0 ? items : defaults);

/* eslint-disable @typescript-eslint/no-explicit-any */
type NotionPage = { properties: Record<string, any> };

const plain = (items: any[] | undefined) => (items ?? []).map((t) => t.plain_text).join("").trim();

// Accepts both the intended property types and plain-text columns left over from CSV import.
function text(prop: any): string {
  if (!prop) return "";
  switch (prop.type) {
    case "title":
    case "rich_text":
      return plain(prop[prop.type]);
    case "select":
      return prop.select?.name ?? "";
    case "number":
      return prop.number == null ? "" : String(prop.number);
    case "checkbox":
      return prop.checkbox ? "Yes" : "";
    default:
      return "";
  }
}

function list(prop: any): string[] {
  if (prop?.type === "multi_select") return prop.multi_select.map((t: any) => t.name as string);
  return text(prop)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function read(page: NotionPage) {
  const p = page.properties;
  const file = p["이미지"]?.files?.[0];
  const order = Number(text(p["순서"]));
  return {
    name: text(p["이름"]),
    category: text(p["분류"]),
    period: text(p["기간"]),
    role: text(p["소속·역할"]),
    desc: text(p["설명"]),
    tags: list(p["태그"]),
    order: text(p["순서"]) && !Number.isNaN(order) ? order : 999,
    visible: /^(yes|y|true|o|공개|예|✅)$/i.test(text(p["공개"])),
    image: (file?.file?.url ?? file?.external?.url) as string | undefined,
    imageAlt: text(p["이미지 설명"]),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

async function notionFetch(path: string, version: string, body?: unknown) {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN?.trim()}`,
      "Notion-Version": version,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`);
  return res.json();
}

async function queryPath(path: string, version: string): Promise<NotionPage[]> {
  const pages: NotionPage[] = [];
  let cursor: string | undefined;
  do {
    const data = await notionFetch(path, version, { page_size: 100, start_cursor: cursor });
    pages.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return pages;
}

// The legacy database query endpoint can omit rows added by a CSV merge; read every data source instead.
async function queryAll(databaseId: string): Promise<NotionPage[]> {
  const version = "2025-09-03";
  try {
    const db = await notionFetch(`databases/${databaseId}`, version);
    const sources: { id: string }[] = db.data_sources ?? [];
    if (sources.length > 0) {
      const results = await Promise.all(
        sources.map((source) => queryPath(`data_sources/${source.id}/query`, version)),
      );
      return results.flat();
    }
  } catch (error) {
    console.error(error);
  }
  return queryPath(`databases/${databaseId}/query`, "2022-06-28");
}

export async function getContent(): Promise<Content> {
  "use cache";
  cacheLife("minutes");

  const token = process.env.NOTION_TOKEN?.trim();
  const rawId = process.env.NOTION_DATABASE_ID?.trim() ?? "";
  const databaseId = (rawId.replace(/-/g, "").match(/[0-9a-f]{32}/i) ?? [rawId])[0];
  if (!token || !databaseId) return staticContent;

  try {
    const rows = (await queryAll(databaseId))
      .map(read)
      .filter((row) => row.visible && row.name)
      .sort((a, b) => a.order - b.order);
    const of = (category: string) => rows.filter((row) => row.category === category);

    const [first, ...restPractices] = of("대표 봉사");
    const [role, ...team] = (first?.role ?? "").split(" · ");

    const intro = { ...staticIntro };
    for (const row of of("소개")) {
      const key = introKeys[row.name];
      if (key && row.desc) intro[key] = row.desc;
    }

    const gpa = of("학점")
      .map((row) => ({ year: row.name, value: Number(row.desc) }))
      .filter((item) => !Number.isNaN(item.value) && item.value > 0);

    return {
      intro,
      vision: orDefault(
        of("비전").map((row) => ({ label: row.name, text: row.desc })),
        staticContent.vision,
      ),
      strengths: orDefault(
        of("역량").map((row) => ({ title: row.name, desc: row.desc })),
        staticContent.strengths,
      ),
      skills: orDefault(
        of("도구").map((row) => ({ label: row.role, title: row.name, desc: row.desc })),
        staticContent.skills,
      ),
      gpa: orDefault(gpa, staticContent.gpa),
      contactValues: orDefault(
        of("연락처 키워드").map((row) => ({ title: row.name, desc: row.desc })),
        staticContent.contactValues,
      ),
      practicum: first
        ? { place: first.name, role, team: team.join(" · "), period: first.period, summary: first.desc, highlights: first.tags }
        : null,
      practices: restPractices.map((row) => ({
        place: row.name,
        period: row.period,
        role: row.role,
        tags: row.tags,
        summary: row.desc,
      })),
      volunteers: of("기타 봉사").map((row) => ({
        title: row.name,
        org: row.role,
        period: row.period,
        note: row.desc,
      })),
      campusActivities: of("교내활동").map((row, index) => ({
        title: row.name,
        date: row.period,
        desc: row.desc,
        color: campusColors[index % campusColors.length],
      })),
      projects: of("프로젝트").map((row) => ({
        title: row.name,
        period: row.period,
        summary: row.desc,
        tags: row.tags,
        image: row.image,
        imageAlt: row.imageAlt || undefined,
      })),
      awards: of("수상·자격").map((row) => ({
        title: row.name,
        org: row.role,
        year: row.period,
        type: row.tags[0] ?? "수상",
      })),
    };
  } catch (error) {
    console.error(error);
    return staticContent;
  }
}
