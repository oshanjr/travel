import { Metadata } from "next";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { Map, Clock, Heart, Globe, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "About Us | A&S Pearl Lanka Tours",
    description: "Your trusted travel partner for unforgettable Sri Lankan experiences. Discover why we are trusted by travelers around the world.",
};

export default function AboutPage() {
    const features = [
        {
            icon: <Award className="h-6 w-6" />,
            title: "Years of Proven Experience",
            description: "Our extensive knowledge and expertise mean your travel plans are in safe hands, ensuring flawless, enriching experiences."
        },
        {
            icon: <Map className="h-6 w-6" />,
            title: "Tailor-Made Tours & Transport",
            description: "We craft customized itineraries and provide comfortable private transport options suited to your pace and preferences."
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: "24/7 Dedicated Support",
            description: "Our team is available around the clock to assist you before, during, and after your trip for total peace of mind."
        },
        {
            icon: <Heart className="h-6 w-6" />,
            title: "Authentic Local Experiences",
            description: "We take you beyond the typical tourist trails to experience the genuine culture, cuisine, and traditions of Sri Lanka."
        },
        {
            icon: <Globe className="h-6 w-6" />,
            title: "Trusted by Travelers",
            description: "Our commitment to quality and honesty has earned us the loyalty of clients from every corner of the globe."
        }
    ];

    return (
        <main className="min-h-screen relative overflow-x-hidden">
            {/* ── Full-page background image ── */}
            <div
                className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/bg-tea-misty.png')" }}
            />
            {/* Dark tint so text is always readable */}
            <div className="fixed inset-0 -z-10 bg-stone-950/60" />

            {/* ── Hero ── */}
            <section className="relative pt-36 pb-28 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn className="text-center max-w-3xl mx-auto">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
                            <span className="text-[0.55rem]">✦</span> Our Story
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-6 drop-shadow-xl">
                            Decades of <span className="text-amber-400 italic">Trusted Service</span> in Sri Lankan Tourism
                        </h1>
                        <p className="text-lg text-stone-200 leading-relaxed drop-shadow">
                            Your trusted travel partner for unforgettable Sri Lankan experiences. From tea plantations to tropical beaches, we curate heartfelt stories and meaningful adventures.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* ── Body Content ── */}
            <div className="container mx-auto px-4 pb-28 max-w-5xl">

                {/* Story + Vision/Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start mb-20">

                    {/* Story text — glass panel */}
                    <FadeIn direction="right">
                        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl shadow-black/20">
                            <div className="space-y-5 text-stone-100 leading-relaxed">
                                <p>
                                    Founded with a passion for showcasing Sri Lanka&apos;s unmatched beauty, <strong className="text-amber-300">A&S Pearl Lanka Tours</strong> has grown into a leading travel company known for personalized service and expert knowledge of the island&apos;s diverse landscapes and cultures.
                                </p>
                                <p>
                                    Our dedicated team of travel specialists and guides curate authentic experiences — whether it&apos;s a serene Ayurveda retreat, an adventurous mountain trek, or a cultural exploration through ancient cities. Every journey is thoughtfully designed to create lasting memories.
                                </p>
                                <p>
                                    Equipped with a modern fleet of vehicles and a network of trusted local partners, we ensure seamless transfers, comfortable accommodations, and immersive excursions. Our 24/7 customer support means you travel with confidence and peace of mind.
                                </p>
                                <p className="text-amber-200 font-medium italic border-l-4 border-amber-400 pl-4 py-1">
                                    &ldquo;We believe travel is about connection — with nature, history, and people. Our commitment is to deliver not just trips, but heartfelt stories and meaningful adventures that reflect the true soul of Sri Lanka.&rdquo;
                                </p>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Vision + Mission — glass cards */}
                    <FadeIn direction="left" className="space-y-6">
                        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl shadow-black/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-bl-full" />
                            <h3 className="text-2xl font-bold text-white font-serif mb-3">Our Vision</h3>
                            <p className="text-stone-200 leading-relaxed">
                                To be the heartbeat of Sri Lankan tourism—where every journey becomes a story, every destination a memory, and every guest a lifelong friend.
                            </p>
                        </div>

                        <div className="backdrop-blur-md bg-amber-500/10 border border-amber-400/25 rounded-3xl p-8 shadow-xl shadow-black/20 relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-400/10 rounded-tl-full" />
                            <h3 className="text-2xl font-bold text-amber-300 font-serif mb-3">Our Mission</h3>
                            <p className="text-stone-200 leading-relaxed">
                                To craft unforgettable, authentic travel experiences through trusted service, deep local knowledge, and a passion for showcasing the true soul of Sri Lanka.
                            </p>
                        </div>
                    </FadeIn>
                </div>

                {/* Why Choose Us heading */}
                <FadeIn className="text-center mb-12">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
                        <span className="text-[0.55rem]">✦</span> Why Choose Us
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-serif drop-shadow-lg">
                        Trusted by Travelers Worldwide
                    </h2>
                </FadeIn>

                {/* Feature cards — glass */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {features.map((feature, idx) => (
                        <StaggerItem key={idx}>
                            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-7 shadow-xl shadow-black/20 h-full hover:bg-white/15 hover:border-amber-400/40 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500 group">
                                <div className="rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-5 group-hover:bg-amber-400/25 transition-colors p-3 w-12 h-12">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white font-serif mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-stone-300 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* CTA — glass */}
                <FadeIn>
                    <div className="text-center backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-12 shadow-xl shadow-black/20">
                        <h2 className="text-3xl font-bold text-white font-serif mb-4">
                            Let us create a journey that&apos;s uniquely yours.
                        </h2>
                        <p className="text-stone-200 mb-8 max-w-2xl mx-auto">
                            Get in touch with our travel experts today and start planning your perfect Sri Lankan getaway.
                        </p>
                        <Link href="/contact">
                            <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-full px-10 shadow-lg shadow-amber-500/30">
                                Inquire Now
                            </Button>
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
