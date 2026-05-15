import { getPackages } from "@/app/actions/packages";
import { PackageCard } from "@/components/public/package-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";

export const dynamic = 'force-dynamic';

export default async function PackagesPage() {
    const packages = await getPackages();

    return (
        <div className="min-h-screen relative overflow-x-hidden">
            {/* Full-page background image */}
            <div
                className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/bg-elephants.png')" }}
            />
            {/* Dark tint overlay */}
            <div className="fixed inset-0 -z-10 bg-stone-950/65" />

            {/* Hero */}
            <section className="pt-36 pb-20 text-center px-4">
                <FadeIn>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
                        <span className="text-[0.55rem]">✦</span> Handpicked Tours
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4 drop-shadow-xl">
                        Explore Our Packages
                    </h1>
                    <p className="text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed">
                        Find the perfect getaway from our curated selection of Sri Lankan adventures.
                    </p>
                </FadeIn>
            </section>

            {/* Packages grid */}
            <div className="container mx-auto px-4 md:px-6 pb-28">
                {packages.length === 0 ? (
                    <div className="text-center py-20 backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl">
                        <p className="text-stone-300 text-lg">No packages available at the moment. Please check back later.</p>
                    </div>
                ) : (
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {packages.map((pkg) => (
                            <StaggerItem key={pkg.id}>
                                <PackageCard pkg={pkg} />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                )}
            </div>
        </div>
    );
}
