import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = { title: "Glowify CMS", description: "Area pengembangan CMS Glowify" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="id"><body>{children}</body></html>;
}
