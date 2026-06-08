import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Package } from "@prisma/client";

interface PackageCardProps {
    pkg: Package;
    variant?: "default" | "glass";
}

export function PackageCard({ pkg, variant = "default" }: PackageCardProps) {
    const images = pkg.images as string[] || [];
    const mainImage = images.length > 0 ? images[0] : "/placeholder-package.jpg";

    const isGlass = variant === "glass";

    const containerClasses = isGlass
        ? "group rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:bg-white/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden"
        : "group rounded-3xl border border-stone-200/80 bg-white shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden";

    const textPrimary = isGlass ? "text-white" : "text-stone-950";
    const textSecondary = isGlass ? "text-white/70" : "text-stone-500";
    const textMuted = isGlass ? "text-white/50" : "text-stone-400";
    const textHover = isGlass ? "group-hover:text-amber-400" : "group-hover:text-stone-700";
    const borderTop = isGlass ? "border-white/10" : "border-stone-100";

    return (
        <div className={containerClasses}>
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
                    <div className="absolute top-4 left-4 bg-amber-500 text-stone-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        Featured
                    </div>
                )}
                {/* Duration badge */}
                <div className="absolute bottom-4 right-4 bg-stone-950/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center gap-1">
                    <Clock className="h-3 w-3 text-amber-400" />
                    {pkg.duration}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className={`flex items-center gap-1.5 text-xs font-medium mb-2 ${textSecondary}`}>
                    <MapPin className={`h-3.5 w-3.5 ${textSecondary}`} />
                    {pkg.location}
                </div>

                <h3 className={`text-lg font-bold mb-3 line-clamp-1 transition-colors font-serif ${textPrimary} ${textHover}`}>
                    {pkg.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < 5 ? "fill-amber-400 text-amber-400" : (isGlass ? "text-white/20" : "text-stone-300")}`}
                        />
                    ))}
                    <span className={`text-xs font-medium ml-1 ${isGlass ? "text-white/90" : "text-stone-600"}`}>4.8</span>
                    <span className={`text-xs ${textMuted}`}>(120 reviews)</span>
                </div>

                <div className={`flex items-center justify-between mt-auto pt-3 border-t ${borderTop}`}>
                    <div>
                        <p className={`text-[10px] uppercase tracking-wider font-medium ${textMuted}`}>From</p>
                        <div className="flex items-baseline gap-1">
                            <span className={`text-2xl font-bold ${isGlass ? "text-white" : "text-stone-800"}`}>${Number(pkg.price)}</span>
                            <span className={`text-xs ${textMuted}`}>/ person</span>
                        </div>
                    </div>
                    <Button
                        asChild
                        size="sm"
                        className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-full px-6 shadow-sm shadow-amber-500/20"
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
