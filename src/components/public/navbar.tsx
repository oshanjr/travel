"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar({ session }: { session: any }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const routes = [
        { href: "/", label: "Home" },
        { href: "/packages", label: "Packages" },
    ];

    // Dynamic classes based on scroll and path
    // Floating Pill Effect
    const isHome = pathname === "/";
    const styles = isScrolled
        ? {
            container: "w-[95%] md:w-[750px] top-4 rounded-full",
            background: "bg-white/80 backdrop-blur-xl border-white/20 shadow-lg",
            text: "text-gray-800 hover:text-blue-600",
            logo: "bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent",
            padding: "py-2 px-6"
        }
        : {
            container: "w-[98%] md:w-[1000px] top-6 rounded-2xl md:rounded-full",
            background: isHome ? "bg-white/10 backdrop-blur-sm border-white/10" : "bg-white/10 backdrop-blur-md border-white/10 shadow-sm",
            text: isHome ? "text-white hover:text-blue-200" : "text-gray-800 hover:text-blue-600",
            logo: isHome ? "text-white" : "bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent",
            padding: "py-3 px-8"
        };

    // Note: For non-home pages at top, we might need dark text if bg is light.
    // Assuming non-home pages have light background (gray-50 from layout).
    // Then styling for non-home top needs to be visible.

    return (
        <div className="fixed left-0 right-0 z-50 flex justify-center transition-all duration-300 ease-in-out">
            <header
                className={cn(
                    "flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    "border",
                    styles.container,
                    styles.background,
                    styles.padding,
                    styles.text
                )}
                style={{
                    position: isScrolled ? 'fixed' : 'relative',
                    // Actually, the parent is fixed. The header is the pill.
                    // If parent is fixed top-0 w-full, flex center. 
                    // Top positioning handled by margin or top formatting context on the header itself?
                    // Better: Parent is 0-height fixed wrapper at top? 
                    // No, parent "fixed left-0 right-0 z-50 flex justify-center" works.
                    // And we change `top` via class on the header? No, `top` property works on fixed/absolute/sticky.
                    // If header is `static` inside `fixed` flex container, `top` on header does nothing.
                    // We need `mt` (margin-top) or `translate-y`.
                }}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <span className={cn("text-xl md:text-2xl font-bold transition-colors", styles.logo)}>
                        Travel.lk
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 mx-auto">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm font-medium transition-colors relative group",
                                styles.text,
                                pathname === route.href && "font-bold"
                            )}
                        >
                            {route.label}
                            {pathname === route.href && (
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-3 shrink-0">
                    {session?.user ? (
                        <div className="flex items-center gap-3">
                            {session.user.role === "ADMIN" || session.user.role === "SUPER_ADMIN" ? (
                                <Link href="/admin">
                                    <Button variant="ghost" size="sm" className={cn("text-xs font-medium h-8", styles.text, "hover:bg-white/20")}>
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : null}
                            <Link href="/profile">
                                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/30 cursor-pointer">
                                    {session.user.name?.[0] || session.user.email?.[0] || 'U'}
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className={cn(styles.text, "hover:bg-white/20 rounded-full")}>
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 rounded-full px-5 text-xs">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={cn("md:hidden p-1 rounded-full hover:bg-white/20 transition-colors", styles.text)}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)}>
                    <div
                        className="absolute top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white/90 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl ring-1 ring-white/50 flex flex-col gap-4 animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium py-3 border-b border-gray-100 text-center text-gray-800"
                            >
                                {route.label}
                            </Link>
                        ))}
                        {!session?.user && (
                            <div className="flex flex-col gap-3 mt-2">
                                <Link href="/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="outline" className="w-full justify-center rounded-full border-gray-300">Log in</Button>
                                </Link>
                                <Link href="/register" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full justify-center bg-blue-600 rounded-full text-white">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
