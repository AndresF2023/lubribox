import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LubriBox - Lubricentro",
  description: "Consultá precios de service y pedí tu turno en LubriBox",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-neutral-950 text-white">
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
