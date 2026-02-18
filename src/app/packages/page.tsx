import { getPackages } from "@/app/actions/packages";
import { PackageCard } from "@/components/public/package-card";

export const dynamic = 'force-dynamic';

export default async function PackagesPage() {
    const packages = await getPackages();

    return (
        <div className="min-h-screen bg-gray-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-gray-50 to-gray-50 pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Packages</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find the perfect getaway from our curated selection of Sri Lankan adventures.
                    </p>
                </div>

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
