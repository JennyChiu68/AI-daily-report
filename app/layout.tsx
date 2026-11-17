import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI前沿日报 | 2026.11.17",
  description: "为手机阅读设计的中文 AI 前沿情报：模型榜单、关键图表与每日快讯。",
  openGraph: {
    title: "千问4旗舰上线，OpenAI遭加州安全诉讼 | AI前沿日报",
    description: "11月17日关注千问4旗舰、Hy4 Flash、OpenAI安全诉讼和百度AI云收入增长。",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AI前沿日报" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "千问4旗舰上线，OpenAI遭加州安全诉讼 | AI前沿日报",
    description: "追踪Hy4 Flash首日用量、千问工作任务成本与书生科学多模态模型。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
