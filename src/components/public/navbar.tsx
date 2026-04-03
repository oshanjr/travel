"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar({ session }: { session: any }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const routes = [
        { href: "/", label: "Home" },
        { href: "/explore", label: "Explore Map" },
        { href: "/packages", label: "Packages" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact Us" },
        { href: "/blog", label: "Blog" },
    ];

    const isHome = pathname === "/";

    // Pill nav styles
    const scrolledStyles = {
        container: "w-[95%] md:w-[820px]",
        background: "bg-emerald-950/95 backdrop-blur-xl border-emerald-800/40 shadow-xl shadow-emerald-950/20",
        text: "text-white/90 hover:text-amber-400",
        logo: "text-white",
        padding: "py-2.5 px-6",
    };

    const topStyles = {
        container: "w-[98%] md:w-[1060px]",
        background: isHome
            ? "bg-white/10 backdrop-blur-sm border-white/15"
            : "bg-emerald-950/80 backdrop-blur-md border-emerald-800/30 shadow-sm",
        text: isHome ? "text-white hover:text-amber-300" : "text-white/90 hover:text-amber-400",
        logo: "text-white",
        padding: "py-3 px-8",
    };

    const styles = isScrolled ? scrolledStyles : topStyles;

    return (
        <div className="fixed left-0 right-0 z-50 flex flex-col items-center">
            {/* Top Contact Bar — desktop only */}
            <div
                className={cn(
                    "w-full transition-all duration-500 overflow-hidden",
                    isScrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
                )}
            >
                <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 hidden md:flex justify-end items-center gap-6 w-full">
                    <a
                        href="tel:+94112345678"
                        className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                    >
                        <Phone className="h-3 w-3" />
                        +94 11 234 5678
                    </a>
                    <a
                        href="mailto:hello@travel.lk"
                        className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                    >
                        <Mail className="h-3 w-3" />
                        hello@travel.lk
                    </a>
                </div>
            </div>

            {/* Main Pill Navbar */}
            <div className="w-full flex justify-center pt-3 px-2">
                <header
                    className={cn(
                        "flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] rounded-full border",
                        styles.container,
                        styles.background,
                        styles.padding,
                    )}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
                            <span className="text-emerald-950 font-bold text-xs">T</span>
                        </div>
                        <span className={cn("text-xl md:text-2xl font-bold tracking-tight transition-colors", styles.logo)}>
                            Travel<span className="text-amber-400">.lk</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 flex-1 justify-center px-4">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-sm font-medium transition-colors relative pb-0.5 whitespace-nowrap",
                                    styles.text,
                                    pathname === route.href && "text-amber-400 font-semibold"
                                )}
                            >
                                {route.label}
                                {pathname === route.href && (
                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
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
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={cn("text-xs font-medium h-8 text-white/80 hover:text-amber-400 hover:bg-white/10")}
                                        >
                                            Dashboard
                                        </Button>
                                    </Link>
                                ) : null}
                                <Link href="/profile">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/20 cursor-pointer">
                                        {session.user.name?.[0] || session.user.email?.[0] || "U"}
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white/80 hover:text-white hover:bg-white/10 rounded-full text-xs"
                                    >
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button
                                        size="sm"
                                        className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-semibold rounded-full px-5 text-xs shadow-md shadow-amber-500/20"
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-1.5 rounded-full hover:bg-white/15 transition-colors text-white"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </header>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="absolute top-[5.5rem] left-1/2 -translate-x-1/2 w-[90%] bg-emerald-950/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl ring-1 ring-white/10 flex flex-col gap-1 animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Mobile contact info */}
                        <div className="flex flex-col gap-2 pb-4 mb-2 border-b border-white/10">
                            <a href="tel:+94112345678" className="flex items-center gap-2 text-xs text-emerald-300">
                                <Phone className="h-3 w-3" /> +94 11 234 5678
                            </a>
                            <a href="mailto:hello@travel.lk" className="flex items-center gap-2 text-xs text-emerald-300">
                                <Mail className="h-3 w-3" /> hello@travel.lk
                            </a>
                        </div>

                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "text-base font-medium py-3 border-b border-white/8 text-center text-white/80 hover:text-amber-400 transition-colors",
                                    pathname === route.href && "text-amber-400 font-semibold"
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                        {!session?.user && (
                            <div className="flex flex-col gap-3 mt-4">
                                <Link href="/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="outline" className="w-full justify-center rounded-full border-white/20 text-white hover:bg-white/10">
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/register" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full justify-center bg-amber-500 hover:bg-amber-400 text-emerald-950 font-semibold rounded-full">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
