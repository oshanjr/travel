import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PublicLayoutWrapper } from "@/components/layout/public-layout-wrapper";
import { auth } from "@/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Travel.lk - Explore Sri Lanka",
  description: "Experience the best of Sri Lanka with our curated travel packages.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <PublicLayoutWrapper session={session}>
          {children}
        </PublicLayoutWrapper>
      </body>
    </html>
  );
}
