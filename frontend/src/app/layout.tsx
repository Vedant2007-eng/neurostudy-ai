import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeuroStudy AI",
  description: "Your Multi-Agent AI Study Companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}