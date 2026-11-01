import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Hausa Novels Hub — Read. Listen. Discover.",
  description: "Discover novels and audiobooks in Hausa, English, Arabic and more."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
