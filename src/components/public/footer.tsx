import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

const usefulLinks = [
    { label: "Sri Lanka Tourism", href: "https://www.sltda.gov.lk/en" },
    { label: "Electronic Travel Auth", href: "https://eta.gov.lk/slvisa/" },
    { label: "Dept. of Immigration", href: "https://www.immigration.gov.lk/" },
    { label: "Airport & Aviation", href: "https://www.airport.lk/" },
    { label: "Dept. of Wildlife", href: "http://www.dwc.gov.lk/" },
    { label: "Sri Lanka Police", href: "https://www.police.lk/" },
];

export function Footer() {
    return (
        <footer className="bg-emerald-950 text-white relative overflow-hidden">
            {/* Gold top border */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

            {/* Subtle texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Main columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-14 pb-10">
                    {/* Brand */}
                    <div className="space-y-5 lg:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow">
                                <span className="text-emerald-950 font-bold text-xs">T</span>
                            </div>
                            <span className="text-2xl font-bold">
                                Travel<span className="text-amber-400">.lk</span>
                            </span>
                        </Link>
                        <p className="text-emerald-300/70 text-sm leading-relaxed">
                            Discover the wonders of Sri Lanka with our curated travel experiences.
                            From pristine beaches to misty mountains — we make every journey unforgettable.
                        </p>
                        <div className="flex gap-3 pt-1">
                            <Link href="#" className="h-9 w-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-emerald-300 hover:text-amber-400 hover:border-amber-400/40 hover:bg-amber-400/10 transition-all">
                                <Facebook className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="h-9 w-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-emerald-300 hover:text-amber-400 hover:border-amber-400/40 hover:bg-amber-400/10 transition-all">
                                <Instagram className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="h-9 w-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-emerald-300 hover:text-amber-400 hover:border-amber-400/40 hover:bg-amber-400/10 transition-all">
                                <Twitter className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="h-9 w-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-emerald-300 hover:text-amber-400 hover:border-amber-400/40 hover:bg-amber-400/10 transition-all">
                                <Youtube className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-base mb-5 text-white tracking-wide uppercase text-xs">
                            Quick Links
                        </h3>
                        <ul className="space-y-3 text-sm text-emerald-300/80">
                            <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
                            <li><Link href="/packages" className="hover:text-amber-400 transition-colors">Packages</Link></li>
                            <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
                            <li><Link href="/blog" className="hover:text-amber-400 transition-colors">Blog</Link></li>
                            <li><Link href="/custom-trip" className="hover:text-amber-400 transition-colors">Custom Trip</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-base mb-5 text-white tracking-wide uppercase text-xs">
                            Contact Us
                        </h3>
                        <ul className="space-y-4 text-sm text-emerald-300/80">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                <span>123 Temple Road, Colombo 03, Sri Lanka</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                                <a href="tel:+94112345678" className="hover:text-amber-400 transition-colors">+94 11 234 5678</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                                <a href="mailto:hello@travel.lk" className="hover:text-amber-400 transition-colors">hello@travel.lk</a>
                            </li>
                        </ul>

                        {/* Useful Travel Links (Blue Ceylon-inspired) */}
                        <h3 className="font-semibold text-base mt-8 mb-4 text-white tracking-wide uppercase text-xs">
                            Useful Links
                        </h3>
                        <ul className="space-y-2 text-xs text-emerald-300/70">
                            {usefulLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
                                    >
                                        <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-base mb-5 text-white tracking-wide uppercase text-xs">
                            Newsletter
                        </h3>
                        <p className="text-emerald-300/70 text-sm mb-5 leading-relaxed">
                            Subscribe for the latest offers, hidden gems and travel guides.
                        </p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-sm text-white placeholder:text-emerald-400/50 focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/40 outline-none transition-all"
                            />
                            <button className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-semibold py-2.5 rounded-xl transition-colors text-sm shadow-md shadow-amber-500/20">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-emerald-400/60">
                    <p>© {new Date().getFullYear()} Travel.lk · All rights reserved.</p>
                    <div className="flex gap-5">
                        <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
