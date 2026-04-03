"use client";

import * as React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { MapPin } from "lucide-react";
import { Destination } from "@prisma/client";

interface DestinationsCarouselProps {
    destinations: Destination[];
}

export function DestinationsCarousel({ destinations }: DestinationsCarouselProps) {
    if (!destinations || destinations.length === 0) return null;

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full"
        >
            <CarouselContent className="-ml-4">
                {destinations.map((dest) => (
                    <CarouselItem key={dest.id} className="pl-4 md:basis-1/3 lg:basis-1/4">
                        <div className="relative group cursor-pointer overflow-hidden rounded-3xl h-80 shadow-lg ring-1 ring-black/5">
                            <Image
                                src={dest.image}
                                alt={dest.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Warm vignette overlay */}
                            <div className="absolute inset-0 vignette-warm opacity-90 group-hover:opacity-100 transition-opacity" />

                            {/* Destination name badge */}
                            <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400/90">
                                        Sri Lanka
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-0.5 font-serif">{dest.name}</h3>
                                <p className="text-sm text-emerald-200/80 font-medium">{dest.tourCount}</p>
                            </div>

                            {/* Hover top tag */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="bg-amber-500 text-emerald-950 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow">
                                    Explore
                                </span>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="hidden md:flex justify-end gap-2 mt-5 pr-12">
                <CarouselPrevious className="relative translate-y-0 translate-x-0 bg-white border-emerald-200 hover:bg-emerald-50 text-emerald-700 hover:text-emerald-900 shadow-sm" />
                <CarouselNext className="relative translate-y-0 translate-x-0 bg-white border-emerald-200 hover:bg-emerald-50 text-emerald-700 hover:text-emerald-900 shadow-sm" />
            </div>
        </Carousel>
    );
}
