import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "glowify_admin";
export const SESSION_SECONDS = 60 * 60 * 8; // 8 jam

const secret = () => process.env.ADMIN_SECRET ?? "";
export const adminConfigured = () => !!process.env.ADMIN_PASSWORD && secret().length >= 16;

const sha = (s: string) => crypto.createHash("sha256").update(s).digest();
const hmac = (s: string) => crypto.createHmac("sha256", secret()).update(s).digest("hex");

export function checkPassword(input: string): boolean {
  const real = process.env.ADMIN_PASSWORD ?? "";
  if (!real) return false;
  return crypto.timingSafeEqual(sha(input), sha(real));
}

export function createToken(): string {
  const exp = String(Date.now() + SESSION_SECONDS * 1000);
  return `${exp}.${hmac(exp)}`;
}

function verifyToken(token: string | undefined): boolean {
  if (!token || !adminConfigured()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = hmac(exp);
  return sig.length === expected.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export async function isAdmin(): Promise<boolean> {
  return verifyToken((await cookies()).get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
