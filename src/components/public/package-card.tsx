import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Package } from "@prisma/client";

interface PackageCardProps {
    pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
    const images = pkg.images as string[] || [];
    const mainImage = images.length > 0 ? images[0] : "/placeholder-package.jpg";

    return (
        <div className="group rounded-3xl border border-stone-200/80 bg-white shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden">
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                    src={mainImage}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Featured badge */}
                {pkg.isFeatured && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-emerald-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        Featured
                    </div>
                )}
                {/* Duration badge */}
                <div className="absolute bottom-4 right-4 bg-emerald-950/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center gap-1">
                    <Clock className="h-3 w-3 text-amber-400" />
                    {pkg.duration}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-stone-500 text-xs font-medium mb-2">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                    {pkg.location}
                </div>

                <h3 className="text-lg font-bold text-emerald-950 mb-3 line-clamp-1 group-hover:text-emerald-700 transition-colors font-serif">
                    {pkg.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < 5 ? "fill-amber-400 text-amber-400" : "text-stone-300"}`}
                        />
                    ))}
                    <span className="text-xs font-medium text-stone-600 ml-1">4.8</span>
                    <span className="text-xs text-stone-400">(120 reviews)</span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
                    <div>
                        <p className="text-[10px] text-stone-400 uppercase tracking-wider font-medium">From</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-emerald-800">${Number(pkg.price)}</span>
                            <span className="text-xs text-stone-400">/ person</span>
                        </div>
                    </div>
                    <Button
                        asChild
                        size="sm"
                        className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-semibold rounded-full px-6 shadow-sm shadow-amber-500/20"
                    >
                        <Link href={`/packages/${pkg.slug}`}>
                            Book Now
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
