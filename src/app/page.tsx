import { prisma } from "@/lib/db";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationsCarousel } from "@/components/public/destinations-carousel";
import { HeroSlider } from "@/components/public/hero-slider";
import { PackageCard } from "@/components/public/package-card";
import { SriLankaDistrictMap } from "@/components/public/sri-lanka-map";
import { HeroSearch } from "@/components/public/hero-search";
import { ArrowRight, Award, Users, Map, Shield, Binoculars, Waves, Sprout, Mountain, Anchor, Compass } from "lucide-react";
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
      {/* ── About Us Section (50vh) ─────────────────────────── */}
      <section className="min-h-[50vh] flex items-center bg-stone-50 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 py-16">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Text side */}
            <div className="flex-1 text-center md:text-left">
              <span className="section-badge">About Travel.lk</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-950 font-serif mb-5 leading-tight">
                Crafting Unforgettable<br />
                <span className="text-amber-600 italic">Sri Lankan</span> Journeys
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6 max-w-lg mx-auto md:mx-0">
                Born from a deep love for this island, Travel.lk connects you with the authentic heart of Sri Lanka — from misty tea estates and ancient ruins to pristine coastlines and vibrant culture. Every itinerary is handcrafted by local experts who know these lands intimately.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-800 font-serif">10+</p>
                  <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Years</p>
                </div>
                <div className="w-px h-10 bg-stone-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-800 font-serif">5,000+</p>
                  <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Guests</p>
                </div>
                <div className="w-px h-10 bg-stone-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-800 font-serif">25</p>
                  <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Districts</p>
                </div>
                <div className="w-px h-10 bg-stone-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-800 font-serif">120+</p>
                  <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Tours</p>
                </div>
              </div>
              <Link href="/about">
                <Button className="bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-full px-8 shadow-lg">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Visual side — decorative accent */}
            <div className="flex-1 max-w-sm w-full hidden md:block">
              <div className="relative">
                {/* Decorative frame */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-emerald-200/40 to-amber-200/40 blur-sm" />
                <div className="relative rounded-3xl overflow-hidden bg-emerald-950 p-8 shadow-2xl">
                  <div className="text-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mx-auto">
                      <Map className="h-8 w-8 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-serif">Our Mission</h3>
                    <p className="text-emerald-200/70 text-sm leading-relaxed">
                      To share the beauty of Sri Lanka with the world, one unforgettable journey at a time — responsibly, authentically, and with heart.
                    </p>
                    <div className="pt-2 flex justify-center gap-2">
                      {["🌿", "🏛️", "🐘", "🌊", "☕"].map((emoji) => (
                        <span key={emoji} className="text-lg">{emoji}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Explore by Map Teaser ─────────────────────────────── */}
      <section className="py-20 bg-emerald-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
                <span className="text-[0.55rem]">✦</span> Interactive Map
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
                Explore All 25 Districts
              </h2>
              <p className="text-emerald-200/70 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
                Click on any district to discover its unique highlights, must-see attractions, activities, and curated travel packages — all in one interactive map.
              </p>
              <Link href="/explore">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-semibold rounded-full px-8 shadow-lg shadow-amber-500/25">
                  <MapPin className="mr-2 h-4 w-4" /> Open Interactive Map
                </Button>
              </Link>
            </div>
            <div className="flex-1 max-w-xs w-full">
              <SriLankaDistrictMap compact />
            </div>
          </div>
        </div>
      </section>

      {/* ── Activities Section ────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="section-badge">Unforgettable Experiences</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-950 font-serif mb-4">
              Activities in <span className="text-amber-500 italic">Sri Lanka</span>
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
              From misty peaks to golden shores, discover the endless ways to experience the magic of the island.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Binoculars className="h-6 w-6" />, title: "Wildlife Safari", desc: "Witness leopards, elephants, and rare birds in their natural habitat at Yala or Wilpattu." },
              { icon: <Waves className="h-6 w-6" />, title: "Surfing & Beaches", desc: "Ride the waves at Arugam Bay or relax on the pristine, palm-fringed sands of Mirissa." },
              { icon: <Sprout className="h-6 w-6" />, title: "Tea Estate Tours", desc: "Wander through the emerald hills of Nuwara Eliya and learn the art of Ceylon tea-making." },
              { icon: <Compass className="h-6 w-6" />, title: "Cultural Heritage", desc: "Explore ancient shrines, the Sigiriya rock fortress, and the sacred Temple of the Tooth." },
              { icon: <Mountain className="h-6 w-6" />, title: "Hiking & Trekking", desc: "Conquer misty trails in Ella or witness the sunrise from the sacred heights of Adam’s Peak." },
              { icon: <Anchor className="h-6 w-6" />, title: "Whale Watching", desc: "Set sail from Mirissa to encounter the majestic blue whales and playful dolphins." },
            ].map((activity, idx) => (
              <div 
                key={idx} 
                className="group p-8 rounded-2xl bg-stone-50 border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5"
              >
                <div className="mb-4 h-12 w-12 rounded-xl bg-white border border-stone-100 flex items-center justify-center text-emerald-700 group-hover:text-amber-600 transition-colors shadow-sm">
                  {activity.icon}
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3 font-serif line-clamp-1">
                  {activity.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 group-hover:text-stone-600 transition-colors">
                  {activity.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />


      {/* ── Search Section ─────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-emerald-950">
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(5,150,105,0.15),transparent_70%)]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-[120px]" />
        
        {/* Dotted pattern matching the Map Section */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "28px 28px" }} />


        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400 mb-3">
              <span className="w-10 h-px bg-amber-500/30" />
              Your Next Discovery
              <span className="w-10 h-px bg-amber-500/30" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif italic">
               Find Your Ideal <span className="text-amber-400">Getaway</span>
            </h2>
          </div>
          <HeroSearch />
        </div>
      </section>

      {/* ── Destinations Section ─────────────────────────────── */}
      <section className="py-20 bg-amber-50/40">
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

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
            <span className="text-[0.55rem]">✦</span> Start Your Adventure
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 font-serif">
            Ready to Discover Sri Lanka?
          </h2>
          <p className="text-emerald-100/80 mb-10 max-w-2xl mx-auto text-lg">
            Subscribe for exclusive travel offers, hidden gems, and curated itineraries delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3 items-center justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full sm:flex-1 h-14 px-6 rounded-full text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xl text-sm transition-all"
            />
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-full px-10 shadow-xl shadow-amber-500/20 shrink-0 transition-all active:scale-95"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
