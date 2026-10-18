"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";

const links = [
  { href: "/", label: "🏠 Beranda" },
  { href: "/quiz", label: "🧴 Skin Quiz" },
  { href: "/chat", label: "💬 Konsultasi AI" },
  { href: "/produk", label: "🛍️ Produk" },
  { href: "/mitra", label: "🤝 Mitra" },
];

export default function Navbar() {
  const path = usePathname();
  const { count, setOpen } = useCart();

  return (
    <nav className="sticky top-0 z-20 border-b border-line bg-bg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 md:h-[62px] md:flex-nowrap md:py-0">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold">
          <Image src="/logo/glowify-icon.svg" alt="" width={32} height={32} priority />
          Glowify
        </Link>

        <div className="order-3 flex w-full gap-1.5 overflow-x-auto md:order-none md:w-auto [scrollbar-width:none]">
          {links.map((l) => {
            const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? "bg-linear-to-br from-pink to-lav text-white" : "text-muted hover:bg-pinks hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Buka keranjang"
          className="relative grid size-10 shrink-0 place-items-center rounded-full bg-pinks text-lg"
        >
          🛒
          <span className="absolute -right-1 -top-1 grid h-[19px] min-w-[19px] place-items-center rounded-full bg-pink px-1 text-[11px] font-semibold text-white">
            {count}
          </span>
        </button>
      </div>
    </nav>
  );
}
