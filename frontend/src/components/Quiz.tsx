"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { questions, recommend, skinAdvice } from "@/lib/quiz";
import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import { useCart } from "./CartProvider";

export default function Quiz({ products }: { products: Product[] }) {
  const router = useRouter();
  const { addMany } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const done = step >= questions.length;
  const progress = (step / questions.length) * 100;

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <div className="fade-in mx-auto max-w-2xl">
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-line">
        <div className="h-full bg-linear-to-r from-pink to-lav transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {!done && (
        <div key={step}>
          <p className="mb-1 text-sm text-muted">Pertanyaan {step + 1} dari {questions.length}</p>
          <h2 className="mb-5 font-display text-3xl font-semibold">{questions[step].title}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {questions[step].options.map((o) => (
              <button
                key={o.label}
                onClick={() => {
                  setAnswers((a) => [...a, o.label]);
                  setStep((s) => s + 1);
                }}
                className={`${o.bg} rounded-2xl border-2 border-transparent p-5 text-left font-medium transition hover:border-pink`}
              >
                <span className="mb-1 block text-2xl">{o.emoji}</span>
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {done && <Result skin={answers[0]} concern={answers[1]} />}
    </div>
  );

  function Result({ skin, concern }: { skin: string; concern: string }) {
    const recs = recommend(skin, concern, products);
    const ids = recs.map((p) => p.id);
    return (
      <div className="w-[min(100vw-2.5rem,72rem)] sm:relative sm:left-1/2 sm:-translate-x-1/2">
        <span className="mb-3 inline-block rounded-full border border-line bg-surface px-4 py-1 text-xs font-semibold text-pink">🎉 Hasil Skin Quiz</span>
        <h2 className="font-display text-3xl font-semibold">Kulit {skin.toLowerCase()} dengan fokus {concern.toLowerCase()}</h2>
        <p className="mb-4 text-muted">{skinAdvice[skin]}</p>

        <div className="my-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-pinks p-6">
            <h3 className="mb-2 font-display text-lg font-semibold">Rutinitas kamu</h3>
            {recs.map((p, i) => (
              <div key={p.id} className="my-1.5 flex items-center gap-2.5 text-sm">
                <b className="grid size-6 shrink-0 place-items-center rounded-full bg-pink text-xs text-white">{i + 1}</b>
                {p.category === "Moisturizer" ? "Pelembap" : p.category}: {p.name}
              </div>
            ))}
          </div>
          <div className="rounded-3xl bg-lavs p-6">
            <h3 className="mb-2 font-display text-lg font-semibold">Langkah berikutnya</h3>
            <p className="mb-4 text-sm text-muted">Tambahkan semua ke keranjang atau diskusikan hasilnya dengan Glow AI.</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => addMany(ids)} className="rounded-full bg-linear-to-br from-pink to-lav px-4 py-2 text-sm font-medium text-white">+ Semua ke keranjang</button>
              <button
                onClick={() => {
                  sessionStorage.setItem("glowify:chat-seed", `Hasil quiz saya: kulit ${skin.toLowerCase()}, masalah utama ${concern.toLowerCase()}. Tolong jelaskan rutinitas pagi dan malam yang cocok.`);
                  router.push("/chat");
                }}
                className="rounded-full border-2 border-line bg-surface px-4 py-2 text-sm font-medium"
              >
                Konsultasi hasil
              </button>
              <button onClick={reset} className="rounded-full border-2 border-line bg-surface px-4 py-2 text-sm font-medium">Ulangi</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recs.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    );
  }
}
