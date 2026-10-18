import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line py-7 text-center text-xs text-muted">
      © {new Date().getFullYear()} Glowify · Saran AI bukan pengganti konsultasi dokter kulit.{" "}
      <Link href="/admin" className="underline-offset-2 hover:underline">Admin</Link>
    </footer>
  );
}
