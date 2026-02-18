import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/public/hero-search";
import { DestinationsCarousel } from "@/components/public/destinations-carousel";
import { PackageCard } from "@/components/public/package-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Helper to fetch Hero Config
async function getHeroConfig() {
  const title = await prisma.siteConfig.findUnique({ where: { key: "hero_title" } });
  const image = await prisma.siteConfig.findUnique({ where: { key: "hero_image" } });
  return {
    title: title?.value || "Explore Sri Lanka",
    image: image?.value || "/hero-bg.jpg"
  };
}

// Fetch featured packages
async function getFeaturedPackages() {
  return await prisma.package.findMany({
    where: { isFeatured: true },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });
}

export default async function Home() {
  const { title, image } = await getHeroConfig();
  const featuredPackages = await getFeaturedPackages();

  return (
    <main className="min-h-screen bg-gray-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-gray-50 to-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[85vh] w-full flex items-center justify-center bg-slate-900 text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={image}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="container relative z-10 flex flex-col items-center justify-center px-4 md:px-6 text-center -mt-20">
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl max-w-4xl drop-shadow-xl animate-fade-in-up">
            {title}
          </h1>
          <p className="mb-8 text-xl md:text-2xl font-light text-gray-100 max-w-2xl drop-shadow-md">
            Discover the pearl of the Indian Ocean with our curated travel experiences.
          </p>
        </div>

        {/* Search Widget (Floating overlapping bottom) */}
        <div className="absolute -bottom-24 left-0 right-0 z-20 w-full px-4">
          <HeroSearch />
        </div>
      </div>

      {/* Spacing for Search Widget overlap */}
      <div className="h-32 bg-transparent"></div>


      {/* Destinations Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Destinations</h2>
              <p className="text-gray-500">Explore the most visited places in Sri Lanka</p>
            </div>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hidden md:flex">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <DestinationsCarousel />
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Packages</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Handpicked tours and experiences designed to give you the best of Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Link href="/packages">
                Browse All Packages
              </Link>
            </Button>
          </div>
        </div>
      </section>


      {/* Newsletter / CTA Section (Placeholder) */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="container px-4 relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start your adventure?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Sign up for our newsletter to get the latest travel updates and exclusive offers.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Button size="lg" className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 font-bold">
              Subscribe
            </Button>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-800 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-800 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </section>
    </main>
  );
}
