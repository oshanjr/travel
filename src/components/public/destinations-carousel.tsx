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

const destinations = [
    { name: "Sigiriya", image: "https://images.unsplash.com/photo-1590664216212-65e7f1e76068?q=80&w=2070&auto=format&fit=crop", count: "25 Tours" },
    { name: "Ella", image: "https://images.unsplash.com/photo-1588258524675-c6353668e965?q=80&w=1887&auto=format&fit=crop", count: "18 Tours" },
    { name: "Mirissa", image: "https://images.unsplash.com/photo-1580854406168-d05510619889?q=80&w=1934&auto=format&fit=crop", count: "12 Tours" },
    { name: "Kandy", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop", count: "30 Tours" },
    { name: "Galle", image: "https://images.unsplash.com/photo-1578564969242-70678d3805ba?q=80&w=2072&auto=format&fit=crop", count: "15 Tours" },
];

export function DestinationsCarousel() {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full"
        >
            <CarouselContent className="-ml-4">
                {destinations.map((dest, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4">
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
                                <p className="text-sm text-gray-300 font-medium">{dest.count}</p>
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
