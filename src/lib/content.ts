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

export type Content = {
  practicum: Practicum | null;
  practices: { place: string; period: string; role: string; tags: string[]; summary: string }[];
  volunteers: { title: string; org: string; period: string; note: string }[];
  campusActivities: { title: string; date: string; desc: string; color: string }[];
  projects: { title: string; period: string; summary: string; tags: string[]; image?: string }[];
  awards: { title: string; org: string; year: string; type: string }[];
};

const campusColors = ["bg-sage", "bg-forest", "bg-emerald-300", "bg-teal-400", "bg-emerald-500"];

const staticContent: Content = {
  practicum: fallback.practicum,
  practices: fallback.practices,
  volunteers: fallback.volunteers,
  campusActivities: fallback.campusActivities,
  projects: fallback.projects,
  awards: fallback.awards,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
type NotionPage = { properties: Record<string, any> };

const plain = (items: any[] | undefined) => (items ?? []).map((t) => t.plain_text).join("").trim();

function read(page: NotionPage) {
  const p = page.properties;
  const file = p["이미지"]?.files?.[0];
  return {
    name: plain(p["이름"]?.title),
    category: p["분류"]?.select?.name ?? "",
    period: plain(p["기간"]?.rich_text),
    role: plain(p["소속·역할"]?.rich_text),
    desc: plain(p["설명"]?.rich_text),
    tags: (p["태그"]?.multi_select ?? []).map((t: any) => t.name as string),
    order: (p["순서"]?.number as number | null) ?? 999,
    visible: p["공개"]?.checkbox === true,
    image: (file?.file?.url ?? file?.external?.url) as string | undefined,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

async function notionFetch(path: string, version: string, body?: unknown) {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": version,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`);
  return res.json();
}

async function queryAll(databaseId: string): Promise<NotionPage[]> {
  let path = `databases/${databaseId}/query`;
  let version = "2022-06-28";
  try {
    await notionFetch(path, version, { page_size: 1 });
  } catch {
    const db = await notionFetch(`databases/${databaseId}`, "2025-09-03");
    path = `data_sources/${db.data_sources[0].id}/query`;
    version = "2025-09-03";
  }

  const pages: NotionPage[] = [];
  let cursor: string | undefined;
  do {
    const data = await notionFetch(path, version, { page_size: 100, start_cursor: cursor });
    pages.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return pages;
}

export async function getContent(): Promise<Content> {
  "use cache";
  cacheLife("minutes");

  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!token || !databaseId) return staticContent;

  try {
    const rows = (await queryAll(databaseId))
      .map(read)
      .filter((row) => row.visible && row.name)
      .sort((a, b) => a.order - b.order);
    const of = (category: string) => rows.filter((row) => row.category === category);

    const [first, ...restPractices] = of("대표 봉사");
    const [role, ...team] = (first?.role ?? "").split(" · ");

    return {
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
