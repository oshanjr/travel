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
        <main className="min-h-screen bg-stone-50 pb-24">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-stone-950">
                {/* Background Image with Overlay */}
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
                    style={{ backgroundImage: "url('/bg-tea-misty.png')" }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-stone-50 via-stone-950/40 to-stone-950/70" />
                
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn className="text-center max-w-3xl mx-auto">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
                            <span className="text-[0.55rem]">✦</span> Our Story
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-6">
                            Decades of <span className="text-amber-400 italic">Trusted Service</span> in Sri Lankan Tourism
                        </h1>
                        <p className="text-lg text-stone-300 leading-relaxed">
                            Your trusted travel partner for unforgettable Sri Lankan experiences. From tea plantations to tropical beaches, we curate heartfelt stories and meaningful adventures.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <div className="container mx-auto px-4 mt-16 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
                    <FadeIn direction="right" className="space-y-6 text-stone-600 leading-relaxed">
                        <p>
                            Founded with a passion for showcasing Sri Lanka's unmatched beauty, <strong>A&S Pearl Lanka Tours</strong> has grown into a leading travel company known for personalized service and expert knowledge of the island’s diverse landscapes and cultures.
                        </p>
                        <p>
                            Our dedicated team of travel specialists and guides curate authentic experiences — whether it's a serene Ayurveda retreat, an adventurous mountain trek, or a cultural exploration through ancient cities. Every journey is thoughtfully designed to create lasting memories.
                        </p>
                        <p>
                            Equipped with a modern fleet of vehicles and a network of trusted local partners, we ensure seamless transfers, comfortable accommodations, and immersive excursions. Our 24/7 customer support means you travel with confidence and peace of mind.
                        </p>
                        <p className="text-stone-800 font-medium italic border-l-4 border-amber-500 pl-4 py-1">
                            "We believe travel is about connection — with nature, history, and people. Our commitment is to deliver not just trips, but heartfelt stories and meaningful adventures that reflect the true soul of Sri Lanka."
                        </p>
                    </FadeIn>

                    <FadeIn direction="left" className="space-y-8">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full -z-10 opacity-50" />
                            <h3 className="text-2xl font-bold text-stone-900 font-serif mb-3">Our Vision</h3>
                            <p className="text-stone-600 leading-relaxed">
                                To be the heartbeat of Sri Lankan tourism—where every journey becomes a story, every destination a memory, and every guest a lifelong friend.
                            </p>
                        </div>

                        <div className="bg-stone-950 p-8 rounded-3xl shadow-xl relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-900/30 rounded-tl-full -z-10" />
                            <h3 className="text-2xl font-bold text-white font-serif mb-3">Our Mission</h3>
                            <p className="text-stone-300 leading-relaxed">
                                To craft unforgettable, authentic travel experiences through trusted service, deep local knowledge, and a passion for showcasing the true soul of Sri Lanka.
                            </p>
                        </div>
                    </FadeIn>
                </div>

                <FadeIn className="text-center mb-12">
                    <span className="section-badge">Why Choose Us</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 font-serif">
                        Trusted by Travelers Worldwide
                    </h2>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {features.map((feature, idx) => (
                        <StaggerItem key={idx}>
                            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-100 h-full hover:border-amber-300 transition-colors group">
                                <div className="h-14 w-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-stone-900 font-serif mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-stone-600 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <FadeIn className="text-center bg-amber-50 p-12 rounded-3xl border border-amber-100">
                    <h2 className="text-3xl font-bold text-stone-900 font-serif mb-4">
                        Let us create a journey that’s uniquely yours.
                    </h2>
                    <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
                        Get in touch with our travel experts today and start planning your perfect Sri Lankan getaway.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-full px-10 shadow-lg shadow-amber-500/20">
                            Inquire Now
                        </Button>
                    </Link>
                </FadeIn>
            </div>
        </main>
    );
}
