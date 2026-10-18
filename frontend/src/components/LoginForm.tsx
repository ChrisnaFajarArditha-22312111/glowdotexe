"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) return setError(data.error || "Gagal masuk.");
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <label className="text-sm font-medium">
        Password admin
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          className="mt-1 w-full rounded-2xl border-[1.5px] border-line bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink"
        />
      </label>
      {error && <p role="alert" className="text-sm text-pink">{error}</p>}
      <button disabled={loading} className="rounded-full bg-linear-to-br from-pink to-lav px-6 py-3 text-sm font-medium text-white disabled:opacity-60">
        {loading ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}
