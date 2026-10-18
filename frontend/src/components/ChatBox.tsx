"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: "Hai! Aku Glow AI 👋 Ceritakan kondisi kulitmu, atau pilih topik di bawah ya.",
};
const TOPICS = ["Kulit berminyak & jerawat", "Kulit kusam", "Kulit sensitif", "Urutan skincare"];

export default function ChatBox() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const msgsRef = useRef<Msg[]>([GREETING]);
  msgsRef.current = messages;

  const send = useCallback(async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    const next: Msg[] = [...msgsRef.current, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghubungi Glow AI");
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Maaf, Glow AI sedang bermasalah. Coba kirim ulang pesanmu sebentar lagi ya." },
      ]);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Pesan awal dari hasil Skin Quiz
  useEffect(() => {
    const seed = sessionStorage.getItem("glowify:chat-seed");
    if (seed) {
      sessionStorage.removeItem("glowify:chat-seed");
      send(seed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  return (
    <div className="overflow-hidden rounded-[26px] border border-line bg-surface shadow-[0_26px_50px_-30px_#e56b8a]">
      <div className="flex items-center gap-3 bg-linear-to-br from-pinks to-lavs px-5 py-4">
        <div className="grid size-10 place-items-center rounded-full bg-pink font-display text-lg font-bold text-white">G</div>
        <div>
          <b className="block text-sm leading-tight">Glow AI</b>
          <small className="text-xs text-muted">● Online · asisten skincare</small>
        </div>
      </div>

      <div className="flex h-[360px] flex-col gap-2.5 overflow-y-auto p-4" aria-live="polite">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[86%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm ${
              m.role === "user" ? "self-end rounded-br-sm bg-pink text-white" : "rounded-bl-sm bg-lavs"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && <div className="w-fit rounded-2xl rounded-bl-sm bg-lavs px-3.5 py-2.5 text-sm text-muted">Glow AI sedang mengetik…</div>}
        <div ref={bottom} />
      </div>

      <div className="flex flex-wrap gap-2 px-4 pb-3">
        {TOPICS.map((t) => (
          <button key={t} onClick={() => send(t)} disabled={loading} className="rounded-full border-[1.5px] border-line bg-surface px-3 py-1.5 text-xs font-medium disabled:opacity-50">
            {t}
          </button>
        ))}
      </div>

      <form
        className="flex gap-2 border-t border-line p-3.5"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis keluhan kulitmu…"
          aria-label="Pesan"
          className="min-w-0 flex-1 rounded-full border-[1.5px] border-line bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
        />
        <button disabled={loading} className="rounded-full bg-linear-to-br from-pink to-lav px-5 py-2 text-sm font-medium text-white disabled:opacity-50">Kirim</button>
      </form>
    </div>
  );
}
