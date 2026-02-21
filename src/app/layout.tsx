import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/Providers/ThemeProvider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/shadcnui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JalanSehat – Laporkan Jalan Rusak",
  description:
    "Platform pelaporan jalan rusak publik berbasis real-time. Bantu percepat perbaikan infrastruktur di lingkungan Anda.",
  keywords: ["jalan rusak", "laporan infrastruktur", "smart city", "JalanSehat"],
  openGraph: {
    title: "JalanSehat – Laporkan Jalan Rusak",
    description: "Bantu percepat perbaikan infrastruktur dengan laporan real-time.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground font-[var(--font-inter)]">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
