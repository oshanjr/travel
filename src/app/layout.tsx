import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PublicLayoutWrapper } from "@/components/layout/public-layout-wrapper";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <PublicLayoutWrapper session={session}>
          {children}
        </PublicLayoutWrapper>
      </body>
    </html>
  );
}
