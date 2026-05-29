import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

// Noto family renders Japanese (日本語) and Latin consistently — ideal
// for a bilingual audience. Sans for UI/body, Serif for editorial headings.
const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false, // CJK fonts are large; skip preloading the full set
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Japanese Association at Iowa State University | 日本人会",
  description:
    "The Japanese Association at Iowa State University — connecting students through Japanese culture, language, and community. Open to everyone. アイオワ州立大学日本人会.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${notoSerif.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
