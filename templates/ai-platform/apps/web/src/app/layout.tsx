import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "__PROJECT_TITLE__",
  description: "AI/data platform starter",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={geist.variable} lang="zh-CN">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
