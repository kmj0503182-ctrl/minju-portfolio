"use client";

import { MouseEvent, ReactNode, useState } from "react";
import {
  Award,
  FolderHeart,
  Handshake,
  Home,
  Mail,
  Menu,
  School,
  X,
} from "lucide-react";
import { navItems, profile } from "../data/portfolio";

const menuIcons = {
  home: Home,
  practice: Handshake,
  campus: School,
  projects: FolderHeart,
  awards: Award,
  contact: Mail,
};

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  function goTo(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    setActive(id);
    setOpen(false);
    const main = document.getElementById("content");
    const target = document.getElementById(id);
    if (!main || !target) return;
    const offset = target.getBoundingClientRect().top - main.getBoundingClientRect().top + main.scrollTop - 8;
    main.scrollTo({ top: offset, behavior: "smooth" });
  }

  return (
    <div className="h-[100dvh] overflow-hidden bg-shell px-3 py-3 sm:px-5 sm:py-5 lg:px-8 lg:py-8">
      <div className="mx-auto flex h-full max-w-[1440px] overflow-hidden rounded-[28px] bg-paper soft-ring lg:rounded-[36px]">
        <aside className="hidden w-[232px] shrink-0 flex-col overflow-y-auto border-r border-line/80 bg-mint/40 px-5 py-7 lg:flex">
          <Brand />
          <nav className="mt-10">
            <p className="mb-3 px-3 text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
              Menu
            </p>
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = menuIcons[item.id];
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(event) => goTo(event, item.id)}
                      className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-white text-forest shadow-sm"
                          : "text-muted hover:bg-white/80 hover:text-forest"
                      }`}
                    >
                      <span
                        className={`-ml-3 h-6 w-1 rounded-full ${isActive ? "bg-forest" : "bg-transparent"}`}
                      />
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#f7fbf8]">
          <header className="flex shrink-0 items-center gap-3 px-4 py-4 lg:hidden">
            <button
              type="button"
              className="rounded-2xl bg-white p-2.5 text-forest soft-ring"
              onClick={() => setOpen(true)}
              aria-label="메뉴 열기"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Brand compact />
          </header>

          <main id="content" className="min-h-0 flex-1 overflow-y-auto px-4 pb-28 sm:px-6 md:pb-10 lg:px-8 lg:pt-8">
            {children}
          </main>
        </div>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 gap-1 rounded-2xl bg-white/95 p-2 shadow-lg backdrop-blur md:hidden">
        {navItems.slice(0, 5).map((item) => {
          const Icon = menuIcons[item.id];
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(event) => goTo(event, item.id)}
              className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium ${
                isActive ? "bg-mint text-forest" : "text-muted hover:bg-mint hover:text-forest"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </a>
          );
        })}
      </nav>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-forest-deep/30"
            onClick={() => setOpen(false)}
            aria-label="메뉴 닫기"
          />
          <div className="absolute top-3 right-3 left-3 rounded-3xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <Brand />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-mint p-2 text-forest"
                aria-label="닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = menuIcons[item.id];
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(event) => goTo(event, item.id)}
                      className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-ink hover:bg-mint"
                    >
                      <Icon className="h-4 w-4 text-forest" />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-[11px] font-semibold text-white">
        민주
      </span>
      {compact ? (
        <span className="text-base font-semibold text-ink">김민주</span>
      ) : (
        <div>
          <span className="block text-lg leading-none font-semibold tracking-tight text-ink">
            {profile.name}
          </span>
          <span className="mt-0.5 block text-[11px] text-muted">Portfolio</span>
        </div>
      )}
    </div>
  );
}
