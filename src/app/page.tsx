import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { DestinationsCarousel } from "@/components/public/destinations-carousel";
import { HeroSlider } from "@/components/public/hero-slider";
import { PackageCard } from "@/components/public/package-card";
import { ArrowRight, Award, Users, Map, Shield } from "lucide-react";
import Link from "next/link";

// Helper to fetch Hero Config
async function getHeroConfig() {
  try {
    const title = await prisma.siteConfig.findUnique({ where: { key: "hero_title" } });
    const image = await prisma.siteConfig.findUnique({ where: { key: "hero_image" } });
    return {
      title: title?.value || "Explore Sri Lanka",
      image: image?.value || "/hero-bg.jpg"
    };
  } catch (error) {
    console.error("Error fetching hero config:", error);
    return {
      title: "Explore Sri Lanka",
      image: "/hero-bg.jpg"
    };
  }
}

// Fetch hero slides
async function getHeroSlides() {
  try {
    return await prisma.heroSlide.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }
}

// Fetch featured packages
async function getFeaturedPackages() {
  try {
    return await prisma.package.findMany({
      where: { isFeatured: true },
      take: 3,
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Error fetching featured packages:", error);
    return [];
  }
}

// Fetch destinations
async function getDestinations() {
  try {
    return await prisma.destination.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
}

// Why Choose Us stats (static, no DB)
const whyChooseUs = [
  {
    icon: Award,
    value: "10+",
    label: "Years of Experience",
    description: "A decade crafting unforgettable Sri Lanka journeys.",
  },
  {
    icon: Users,
    value: "5,000+",
    label: "Happy Travellers",
    description: "Guests from over 40 countries trust us every year.",
  },
  {
    icon: Map,
    value: "120+",
    label: "Curated Tours",
    description: "From beaches to highlands, every corner of the island.",
  },
  {
    icon: Shield,
    value: "100%",
    label: "Safe & Reliable",
    description: "Fully licensed, insured, and committed to your safety.",
  },
];

export default async function Home() {
  const heroConfig = await getHeroConfig();
  const heroSlides = await getHeroSlides();
  const featuredPackages = await getFeaturedPackages();
  const destinations = await getDestinations();

  return (
    <main className="min-h-screen">
      <HeroSlider
        slides={heroSlides}
        defaultTitle={heroConfig.title}
        defaultImage={heroConfig.image}
      />

      {/* ── Destinations Section ─────────────────────────────── */}
      <section className="pt-36 pb-20 bg-amber-50/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="section-badge">Explore Destinations</span>
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 font-serif">
                Popular Destinations
              </h2>
              <p className="text-stone-500 mt-2 max-w-md">
                Explore the most visited and beloved places across Sri Lanka
              </p>
            </div>
            <Button
              variant="ghost"
              className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 hidden md:flex font-medium"
              asChild
            >
              <Link href="/packages">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <DestinationsCarousel destinations={destinations} />
        </div>
      </section>

      {/* ── Why Choose Us ──────────────────────────────────────── */}
      <section className="py-20 bg-emerald-950 text-white relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 25% 50%, #ffffff 1px, transparent 1px), radial-gradient(circle at 75% 50%, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
              <span className="text-[0.55rem]">✦</span> Why Travel With Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
              Your Journey, Our Promise
            </h2>
            <p className="text-emerald-300/80 mt-3 max-w-xl mx-auto">
              From the moment you inquire to the day you return home, we are with you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300 group"
                >
                  <div className="h-14 w-14 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center mb-5 group-hover:bg-amber-500/25 transition-colors">
                    <Icon className="h-6 w-6 text-amber-400" />
                  </div>
                  <p className="text-3xl font-bold text-white font-serif mb-1">{item.value}</p>
                  <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">{item.label}</p>
                  <p className="text-xs text-emerald-300/70 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Packages Section ──────────────────────────── */}
      <section className="py-20 bg-stone-50/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="section-badge">Featured Tours</span>
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 font-serif">
              Handpicked Packages
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto mt-3">
              Curated tours and experiences designed to give you the very best of Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-emerald-700 text-emerald-800 hover:bg-emerald-50 font-semibold px-8"
            >
              <Link href="/packages">Browse All Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── CTA / Newsletter Section ───────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{
        background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)"
      }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "12px 12px"
        }} />

        <div className="container px-4 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
            <span className="text-[0.55rem]">✦</span> Start Your Adventure
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 font-serif">
            Ready to Discover Sri Lanka?
          </h2>
          <p className="text-emerald-100/80 mb-10 max-w-2xl mx-auto text-lg">
            Subscribe for exclusive travel offers, hidden gems, and curated itineraries delivered to your inbox.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 h-12 px-5 rounded-full text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-lg text-sm"
            />
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-full px-6 shadow-lg shadow-amber-500/20 shrink-0"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
