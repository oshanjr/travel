import { getPackages } from "@/app/actions/packages";
import { PackageCard } from "@/components/public/package-card";

export const dynamic = 'force-dynamic';

export default async function PackagesPage() {
    const packages = await getPackages();

    return (
        <div className="min-h-screen bg-stone-50 pb-20">
            {/* Hero Header with Elephants */}
            <div className="relative pt-32 pb-24 mb-16 overflow-hidden bg-stone-950">
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-90"
                    style={{ backgroundImage: "url('/bg-elephants.png')" }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-stone-50 via-stone-950/20 to-stone-950/60" />
                
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
                        <span className="text-[0.55rem]">✦</span> Handpicked Tours
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">Explore Our Packages</h1>
                    <p className="text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed">
                        Find the perfect getaway from our curated selection of Sri Lankan adventures.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">

                {packages.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        No packages available at the moment. Please check back later.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {packages.map((pkg) => (
                            <PackageCard key={pkg.id} pkg={pkg} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
