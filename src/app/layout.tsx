import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Tanvir Singh — Portfolio",
  description: "Personal portfolio built with Next.js, TypeScript, and Tailwind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        {/* Vercel analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}