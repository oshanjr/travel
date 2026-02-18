import Link from "next/link";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Package } from "@prisma/client";

interface PackageCardProps {
    pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
    // Safe JSON parsing or casting for images. 
    // In DB it's Json, here we assume it's string[]
    const images = pkg.images as string[] || [];
    const mainImage = images.length > 0 ? images[0] : "/placeholder-package.jpg";

    // Calculate discount if needed, for now just show price
    // const hasDiscount = pkg.discountPrice && pkg.discountPrice < pkg.price;

    return (
        <div className="group rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                    src={mainImage}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {pkg.isFeatured && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                        Featured
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="flex items-center gap-1 text-gray-500 text-xs font-medium mb-2">
                    <MapPin className="h-3.5 w-3.5 text-blue-600" />
                    {pkg.location}
                    <span className="mx-1">•</span>
                    {pkg.duration}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {pkg.title}
                </h3>

                {/* Placeholder for rating - could be dynamic later */}
                <div className="flex items-center gap-1 mb-4">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">4.8</span>
                    <span className="text-sm text-gray-500">(120 reviews)</span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div>
                        <p className="text-xs text-gray-500">From</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-blue-700">${Number(pkg.price)}</span>
                        </div>
                    </div>
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                        <Link href={`/packages/${pkg.slug}`}>
                            Book Now
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
