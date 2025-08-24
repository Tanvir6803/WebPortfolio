import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "devicon/devicon.min.css";

export const metadata: Metadata = {
  title: "Tanvir Singh — Portfolio",
  description: "Personal portfolio built with Next.js, TypeScript, and Tailwind.",
  icons: {
    // favicon
    icon: [{ url: "/logo.jpg", type: "image/png" }],
    // old browser
    shortcut: [{ url: "/logo.jpg", type: "image/png" }],
    // IOS
    apple: [{ url: "/logo.jpg", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        {/* Fixed navbar */}
        <Navbar />
        <div className="h-14" aria-hidden />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
