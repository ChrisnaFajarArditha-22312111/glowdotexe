import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, SESSION_SECONDS, adminConfigured, checkPassword, createToken } from "@/lib/auth";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "Admin belum dikonfigurasi. Isi ADMIN_PASSWORD dan ADMIN_SECRET (min. 16 karakter) di .env.local." },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";

  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 600)); // memperlambat tebak-tebakan password
    return NextResponse.json({ error: "Password salah." }, { status: 401 });
  }

  (await cookies()).set(ADMIN_COOKIE, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return NextResponse.json({ ok: true });
}
