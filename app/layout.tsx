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
  title: "情绪抽屉 - 记录情绪，释怀过往",
  description: "一个私密的情绪记录空间，帮助你封存当下的想法，与未来的自己约定和解。",
  keywords: "情绪记录,心情日记,时光胶囊,释怀,情感管理",
  authors: [{ name: "情绪抽屉" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
