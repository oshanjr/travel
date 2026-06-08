import { prisma } from "@/lib/db";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationsCarousel } from "@/components/public/destinations-carousel";
import { HeroSlider } from "@/components/public/hero-slider";
import { PackageCard } from "@/components/public/package-card";
import { SriLankaDistrictMap } from "@/components/public/sri-lanka-map";
import { HeroSearch } from "@/components/public/hero-search";
import { GoogleReviews } from "@/components/public/google-reviews";
import { ArrowRight, Award, Users, Map, Shield, Binoculars, Waves, Sprout, Mountain, Anchor, Compass } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { NewsletterForm } from "@/components/public/newsletter-form";

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
      {/* ── About Us Section ─────────────────────────── */}
      <section className="min-h-[50vh] flex items-center relative overflow-hidden bg-stone-950">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80" style={{ backgroundImage: "url('/bg-tea-misty.png')" }} />
        <div className="absolute inset-0 z-0 bg-stone-950/60" />

        <FadeIn className="container mx-auto px-4 md:px-6 relative z-10 py-16">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4"><span className="text-[0.55rem]">✦</span> About A&S Pearl Lanka Tours</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-serif mb-5 leading-tight drop-shadow-xl">
                Crafting Unforgettable<br />
                <span className="text-amber-400 italic">Sri Lankan</span> Journeys
              </h2>
              <p className="text-stone-200 leading-relaxed mb-6 max-w-lg mx-auto md:mx-0">
                Born from a deep love for this island, A&S Pearl Lanka Tours connects you with the authentic heart of Sri Lanka — from misty tea estates and ancient ruins to pristine coastlines and vibrant culture. Every itinerary is handcrafted by local experts who know these lands intimately.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-8">
                <div className="text-center"><p className="text-2xl font-bold text-white font-serif">10+</p><p className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">Years</p></div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center"><p className="text-2xl font-bold text-white font-serif">5,000+</p><p className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">Guests</p></div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center"><p className="text-2xl font-bold text-white font-serif">25</p><p className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">Districts</p></div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center"><p className="text-2xl font-bold text-white font-serif">120+</p><p className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">Tours</p></div>
              </div>
              <Link href="/about">
                <Button className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-full px-8 shadow-lg shadow-amber-500/25">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex-1 max-w-sm w-full hidden md:block">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl shadow-black/20">
                <div className="text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mx-auto"><Map className="h-8 w-8 text-amber-400" /></div>
                  <h3 className="text-xl font-bold text-white font-serif">Our Mission</h3>
                  <p className="text-stone-200/70 text-sm leading-relaxed">To share the beauty of Sri Lanka with the world, one unforgettable journey at a time — responsibly, authentically, and with heart.</p>
                  <div className="pt-2 flex justify-center gap-2">{["🌿", "🏛️", "🐘", "🌊", "☕"].map((emoji) => (<span key={emoji} className="text-lg">{emoji}</span>))}</div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Explore by Map Teaser ─────────────────────────────── */}
      <section className="py-20 bg-stone-950 relative overflow-hidden">
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
              <p className="text-stone-200/70 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
                Click on any district to discover its unique highlights, must-see attractions, activities, and curated travel packages — all in one interactive map.
              </p>
              <Link href="/explore">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-full px-8 shadow-lg shadow-amber-500/25">
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
      <section className="py-24 relative overflow-hidden bg-stone-950">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-70" style={{ backgroundImage: "url('/bg-sigiriya-dark.png')" }} />
        <div className="absolute inset-0 z-0 bg-stone-950/70" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4"><span className="text-[0.55rem]">✦</span> Unforgettable Experiences</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-serif mb-4">
              Activities in <span className="text-amber-400 italic">Sri Lanka</span>
            </h2>
            <p className="text-stone-300 max-w-2xl mx-auto leading-relaxed">
              From misty peaks to golden shores, discover the endless ways to experience the magic of the island.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Binoculars className="h-6 w-6" />, title: "Wildlife Safari", desc: "Witness leopards, elephants, and rare birds in their natural habitat at Yala or Wilpattu." },
              { icon: <Waves className="h-6 w-6" />, title: "Surfing & Beaches", desc: "Ride the waves at Arugam Bay or relax on the pristine, palm-fringed sands of Mirissa." },
              { icon: <Sprout className="h-6 w-6" />, title: "Tea Estate Tours", desc: "Wander through the stone hills of Nuwara Eliya and learn the art of Ceylon tea-making." },
              { icon: <Compass className="h-6 w-6" />, title: "Cultural Heritage", desc: "Explore ancient shrines, the Sigiriya rock fortress, and the sacred Temple of the Tooth." },
              { icon: <Mountain className="h-6 w-6" />, title: "Hiking & Trekking", desc: "Conquer misty trails in Ella or witness the sunrise from the sacred heights of Adam's Peak." },
              { icon: <Anchor className="h-6 w-6" />, title: "Whale Watching", desc: "Set sail from Mirissa to encounter the majestic amber whales and playful dolphins." },
            ].map((activity, idx) => (
              <StaggerItem key={idx}>
                <div className="group backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-amber-400/40 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500 h-full shadow-xl shadow-black/20">
                  <div className="mb-4 h-12 w-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:bg-amber-400/25 transition-colors">
                    {activity.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-serif line-clamp-1">{activity.title}</h3>
                  <p className="text-stone-300 text-sm leading-relaxed line-clamp-3 group-hover:text-stone-200 transition-colors">{activity.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />


      {/* ── Search Section ─────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-stone-950">
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.12),transparent_70%)]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-stone-400/10 rounded-full blur-[120px]" />
        
        {/* Dotted pattern matching the Map Section */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)", backgroundSize: "28px 28px" }} />


        <FadeIn className="container mx-auto px-4 relative z-10">
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
        </FadeIn>
      </section>

      {/* ── Destinations Section ─────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-stone-950">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60" style={{ backgroundImage: "url('/bg-elephants.png')" }} />
        <div className="absolute inset-0 z-0 bg-stone-950/70" />
        <FadeIn className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3"><span className="text-[0.55rem]">✦</span> Explore Destinations</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">Popular Destinations</h2>
              <p className="text-stone-300 mt-2 max-w-md">Explore the most visited and beloved places across Sri Lanka</p>
            </div>
            <Button variant="ghost" className="text-amber-400 hover:text-amber-300 hover:bg-white/10 hidden md:flex font-medium" asChild>
              <Link href="/packages">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <DestinationsCarousel destinations={destinations} />
        </FadeIn>
      </section>

      {/* ── Why Choose Us ──────────────────────────────────────── */}
      <section className="py-24 text-white relative overflow-hidden bg-stone-950">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: "url('/bg-sigiriya-dark.png')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <FadeIn className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
              <span className="text-[0.55rem]">✦</span> Why Travel With Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
              Your Journey, Our Promise
            </h2>
            <p className="text-stone-300/80 mt-3 max-w-xl mx-auto">
              From the moment you inquire to the day you return home, we are with you every step of the way.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.label}>
                  <div
                    className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-500 group h-full hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-amber-500/20"
                  >
                    <div className="h-14 w-14 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center mb-5 group-hover:bg-amber-500/25 transition-colors">
                      <Icon className="h-6 w-6 text-amber-400" />
                    </div>
                    <p className="text-3xl font-bold text-white font-serif mb-1">{item.value}</p>
                    <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">{item.label}</p>
                    <p className="text-xs text-stone-300/70 leading-relaxed">{item.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Featured Packages Section ──────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-stone-950">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50" style={{ backgroundImage: "url('/bg-beach-contact.png')" }} />
        <div className="absolute inset-0 z-0 bg-stone-950/75" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <FadeIn className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3"><span className="text-[0.55rem]">✦</span> Featured Tours</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
              Handpicked Packages
            </h2>
            <p className="text-stone-300 max-w-2xl mx-auto mt-3">
              Curated tours and experiences designed to give you the very best of Sri Lanka.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <StaggerItem key={pkg.id}>
                <PackageCard pkg={pkg} variant="glass" />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-amber-400/50 text-amber-400 hover:bg-white/10 font-semibold px-8"
            >
              <Link href="/packages">Browse All Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Google Reviews Section ─────────────────────────────── */}
      <GoogleReviews />

      {/* ── CTA / Newsletter Section ───────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-stone-950">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50" style={{ backgroundImage: "url('/bg-tea-misty.png')" }} />
        <div className="absolute inset-0 z-0 bg-stone-950/70" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-[120px]" />

        <FadeIn className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
            <span className="text-[0.55rem]">✦</span> Start Your Adventure
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 font-serif">
            Ready to Discover Sri Lanka?
          </h2>
          <p className="text-stone-300 mb-10 max-w-2xl mx-auto text-lg">
            Subscribe for exclusive travel offers, hidden gems, and curated itineraries delivered to your inbox.
          </p>
          <NewsletterForm />
        </FadeIn>
      </section>
    </main>
  );
}
