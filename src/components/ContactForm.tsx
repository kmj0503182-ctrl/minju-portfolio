"use client";

import { FormEvent, useState } from "react";
import { profile } from "../data/portfolio";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    setStatus("sending");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `[포트폴리오] ${name}님의 메시지`,
          _template: "table",
        }),
      });

      if (!response.ok) {
        throw new Error("send failed");
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl bg-mint p-6 text-center">
        <p className="font-semibold text-forest">메시지를 보내 주셔서 감사합니다.</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {profile.email} 으로 전달되었습니다. 처음 보낼 때는 Gmail에서 FormSubmit 확인 메일의 링크를 한 번 눌러 주세요.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">이름</span>
        <input
          required
          name="name"
          autoComplete="name"
          className="w-full rounded-2xl border border-sage/70 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sage/40"
          placeholder="이름"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">이메일</span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className="w-full rounded-2xl border border-sage/70 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sage/40"
          placeholder="회신받을 이메일"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">메시지</span>
        <textarea
          required
          name="message"
          rows={4}
          className="w-full resize-none rounded-2xl border border-sage/70 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sage/40"
          placeholder="전하고 싶은 말을 적어 주세요."
        />
      </label>
      {status === "error" ? (
        <p role="alert" className="text-sm text-red-700">
          전송에 실패했습니다. {profile.email} 로 직접 메일을 보내 주세요.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-2xl bg-forest py-3 text-sm font-semibold text-white transition hover:bg-forest-deep disabled:opacity-60"
      >
        {status === "sending" ? "보내는 중..." : "메시지 보내기"}
      </button>
    </form>
  );
}
