"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                            <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                <h3 className="text-xl font-bold mb-1">{dest.name}</h3>
                                <p className="text-sm text-gray-300 font-medium">{dest.tourCount}</p>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="hidden md:flex justify-end gap-2 mt-4 pr-12">
                <CarouselPrevious className="relative translate-y-0 translate-x-0 bg-transparent border-gray-300 hover:bg-blue-50 text-gray-500 hover:text-blue-600" />
                <CarouselNext className="relative translate-y-0 translate-x-0 bg-transparent border-gray-300 hover:bg-blue-50 text-gray-500 hover:text-blue-600" />
            </div>
        </Carousel>
    );
}
