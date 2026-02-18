"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";

export function PublicLayoutWrapper({
    children,
    session
}: {
    children: React.ReactNode;
    session: any;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/register");

    // Don't show Navbar/Footer on Admin pages
    if (isAdmin) {
        return <>{children}</>;
    }

    // Optional: Hide on Auth pages if desired, but user asked for glassy UI there too.
    // Usually Navbar is useful on auth pages to go back home.

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar session={session} />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
