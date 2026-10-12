import type { ReactNode } from "react";
import { ArrowUpRight, Award, MapPin } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { ContactForm } from "../components/ContactForm";
import { ImageSlot } from "../components/ImageSlot";
import { gpa, profile, skills, strengths, vision, volunteerSummary } from "../data/portfolio";
import { getContent, type Content, type Practicum } from "../lib/content";

export default async function Home() {
  const content = await getContent();

  return (
    <AppShell>
      <Hero />
      <PracticeSection
        practicum={content.practicum}
        practices={content.practices}
        volunteers={content.volunteers}
      />
      <CampusSection campusActivities={content.campusActivities} />
      <ProjectsSection projects={content.projects} />
      <AwardsSection awards={content.awards} />
      <ContactSection />
      <div hidden data-content-source={content.source} />
    </AppShell>
  );
}

function SectionTitle({
  kicker,
  title,
  action,
}: {
  kicker?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        {kicker ? (
          <p className="mb-1 text-xs font-semibold tracking-wide text-sage uppercase">{kicker}</p>
        ) : null}
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="scroll-mt-24">
      <div className="flex flex-col-reverse gap-6 rounded-2xl bg-white p-6 card-shadow sm:p-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-sage">
            {profile.school} · {profile.role}
          </p>
          <h1 className="mt-2 text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-4xl">
            세상을 다정하게 자라나게 하는
            <br className="hidden sm:block" /> 사회복지사, 김민주
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-7 text-muted sm:text-base">
            {profile.tagline} {profile.bio}
          </p>
          <ul className="mt-6 space-y-3">
            {vision.map((item) => (
              <li key={item.label} className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3">
                <span className="w-24 shrink-0 rounded-full bg-mint py-1 text-center text-xs font-semibold text-forest">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-ink">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <ImageSlot
          src={profile.photo}
          alt={`${profile.name} 프로필`}
          label="사진 또는 캐릭터"
          className="aspect-[4/5] w-36 shrink-0 self-center sm:w-44 md:w-52"
        />
      </div>
    </section>
  );
}

function PracticeSection({
  practicum,
  practices,
  volunteers,
}: Pick<Content, "practicum" | "practices" | "volunteers">) {
  return (
    <section id="practice" className="mt-12 scroll-mt-24">
      <SectionTitle
        kicker="Field practice & volunteer"
        title="사회복지 현장 · 자원봉사 경험"
      />
      {practicum ? <PracticumCard practicum={practicum} /> : null}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {practices.map((item) => (
          <article key={item.place} className="flex flex-col rounded-2xl bg-white p-5 card-shadow">
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-forest">
                {item.role}
              </span>
              <span className="text-xs text-muted">{item.period}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink">{item.place}</h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted">{item.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-mint px-3 py-1 text-xs font-medium text-forest">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {volunteers.map((item) => (
          <article key={item.title} className="rounded-2xl border border-line bg-white/70 p-4">
            <p className="text-sm font-semibold text-ink">{item.title}</p>
            <p className="mt-1 text-xs text-sage">{item.org}</p>
            <p className="mt-2 text-xs leading-5 text-muted">
              {item.period} · {item.note}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PracticumCard({ practicum }: { practicum: Practicum }) {
  return (
    <article className="rounded-2xl bg-white p-5 card-shadow">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-forest px-3 py-1 text-xs font-semibold text-white">
          {practicum.role}
        </span>
        <span className="text-xs text-muted">{practicum.period}</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink">
        {practicum.place}
        <span className="ml-2 text-sm font-medium text-sage">{practicum.team}</span>
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">{practicum.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {practicum.highlights.map((item) => (
          <span key={item} className="rounded-full bg-mint px-3 py-1 text-xs font-medium text-forest">
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function GpaChart() {
  const min = 4.0;
  const max = 4.5;

  return (
    <article className="rounded-2xl bg-white p-5 card-shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-ink">학업 성취도</h3>
        <span className="rounded-full bg-mint px-3 py-1 text-xs font-medium text-forest">평점 / 4.5</span>
      </div>
      <div className="mt-6 flex h-44 items-end justify-around gap-4">
        {gpa.map((item, index) => {
          const latest = index === gpa.length - 1;
          const height = ((item.value - min) / (max - min)) * 100;
          return (
            <div key={item.year} className="flex flex-1 flex-col items-center gap-2">
              <span className={`text-sm font-semibold ${latest ? "text-forest" : "text-muted"}`}>
                {item.value.toFixed(2)}
              </span>
              <div className="flex h-32 w-full items-end justify-center">
                <div
                  className={`w-[60%] max-w-12 rounded-full ${latest ? "bg-sage" : "hatch bg-emerald-100"}`}
                  style={{ height: `${Math.max(height, 12)}%` }}
                />
              </div>
              <span className="text-xs text-muted">{item.year}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-center text-xs text-muted">평점 4.08에서 4.33으로 꾸준히 상승</p>
    </article>
  );
}

function CampusSection({ campusActivities }: Pick<Content, "campusActivities">) {
  return (
    <section id="campus" className="mt-12 scroll-mt-24">
      <SectionTitle kicker="Campus archive" title="교내 활동 아카이브" />
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.95fr_0.9fr]">
        <article className="rounded-2xl bg-white p-5 card-shadow">
          <h3 className="mb-5 font-semibold text-ink">활동으로 키운 역량</h3>
          <ul className="space-y-4">
            {strengths.map((item, index) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint text-xs font-semibold text-forest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{item.title}</p>
                  <p className="text-xs leading-5 text-muted">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <GpaChart />

        <div className="grid gap-4">
          {campusActivities.slice(0, 2).map((item) => (
            <article key={item.title} className="rounded-2xl bg-white p-5 card-shadow">
              <div className="mb-3 flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                <p className="text-xs text-muted">{item.date}</p>
              </div>
              <h3 className="font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-2xl border border-line bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs text-muted">{volunteerSummary.label}</p>
            <ArrowUpRight className="h-4 w-4 text-sage" />
          </div>
          <p className="text-2xl font-semibold text-ink">{volunteerSummary.value}</p>
          <p className="mt-1 text-sm text-muted">{volunteerSummary.hint}</p>
        </article>
        {campusActivities.slice(2).map((item) => (
          <article key={item.title} className="rounded-2xl border border-line bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
              <p className="text-xs text-muted">{item.date}</p>
            </div>
            <h3 className="font-semibold text-ink">{item.title}</h3>
            <p className="mt-1 text-sm text-muted">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection({ projects }: Pick<Content, "projects">) {
  return (
    <section id="projects" className="mt-12 scroll-mt-24">
      <SectionTitle kicker="Original projects" title="자체 제작 프로젝트" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {projects.map((project, index) => {
          const dark = index === 0;
          return (
            <article
              key={project.title}
              className={`flex flex-col gap-4 rounded-2xl p-4 ${dark ? "hatch-strong bg-forest-deep text-white" : "bg-white card-shadow"}`}
            >
              <ImageSlot
                src={project.image}
                alt={`${project.title} 대표 이미지`}
                label="대표 이미지 (가로형)"
                dark={dark}
                className="aspect-video w-full"
              />
              <div className="flex flex-1 flex-col px-1 pb-1">
                <p className={`text-xs ${dark ? "text-emerald-100" : "text-sage"}`}>{project.period}</p>
                <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>
                <p className={`mt-2 text-sm leading-6 ${dark ? "text-emerald-50" : "text-muted"}`}>
                  {project.summary}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1 text-xs ${
                        dark ? "bg-white/15 text-white" : "bg-mint text-forest"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function AwardsSection({ awards }: Pick<Content, "awards">) {
  return (
    <section id="awards" className="mt-12 scroll-mt-24">
      <SectionTitle kicker="Credentials" title="수상 및 자격증" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {awards.map((item) => (
          <article key={item.title} className="flex items-start gap-4 rounded-2xl bg-white p-5 card-shadow">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mint text-forest">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-sage">{item.type}</p>
              <h3 className="mt-1 font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {item.org} · {item.year}
              </p>
            </div>
          </article>
        ))}
      </div>
      <h3 className="mt-8 mb-4 font-semibold text-ink">활용 가능한 도구</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((item) => (
          <article key={item.label} className="rounded-2xl border border-line bg-white p-5">
            <span className="rounded-full bg-forest px-3 py-1 text-[11px] font-semibold text-white">
              {item.label}
            </span>
            <h4 className="mt-3 font-semibold text-ink">{item.title}</h4>
            <p className="mt-1 text-sm leading-6 text-muted">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="mt-12 mb-4 scroll-mt-24">
      <SectionTitle kicker="Connect" title="연락처" />
      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <article className="hatch-strong flex flex-col justify-between overflow-hidden rounded-2xl bg-forest p-6 text-white">
          <div>
            <p className="text-sm text-emerald-100">함께 성장하는 미래를 꿈꿉니다</p>
            <h3 className="mt-2 text-2xl font-semibold">경청하고 실천하는 사회복지사 {profile.name}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="font-semibold">경청</p>
                <p className="mt-1 text-sm text-emerald-50">마음을 다해 듣겠습니다</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="font-semibold">실천</p>
                <p className="mt-1 text-sm text-emerald-50">행동으로 증명하겠습니다</p>
              </div>
            </div>
          </div>
          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </li>
            <li>
              <a className="underline decoration-emerald-200 underline-offset-4" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
          </ul>
        </article>
        <article className="rounded-2xl bg-white p-6 card-shadow">
          <h3 className="mb-4 font-semibold text-ink">메시지 남기기</h3>
          <ContactForm />
        </article>
      </div>
    </section>
  );
}
