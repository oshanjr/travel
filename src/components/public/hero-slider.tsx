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
import Autoplay from "embla-carousel-autoplay";
import { HeroSlide } from "@prisma/client";
import { HeroSearch } from "@/components/public/hero-search";

interface HeroSliderProps {
    slides: HeroSlide[];
    defaultTitle?: string;
    defaultImage?: string;
}

export function HeroSlider({ slides, defaultTitle, defaultImage }: HeroSliderProps) {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    if (!slides || slides.length === 0) {
        // Fallback to default static hero if no slides
        return (
            <div className="relative min-h-[85vh] w-full flex items-center justify-center bg-slate-900 text-white">
                <div className="absolute inset-0">
                    <Image
                        src={defaultImage || "/hero-bg.jpg"}
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-black/50" />
                <div className="container relative z-10 flex flex-col items-center justify-center px-4 md:px-6 text-center -mt-20">
                    <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl max-w-4xl drop-shadow-xl animate-fade-in-up">
                        {defaultTitle || "Explore Sri Lanka"}
                    </h1>
                    <p className="mb-8 text-xl md:text-2xl font-light text-gray-100 max-w-2xl drop-shadow-md">
                        Discover the pearl of the Indian Ocean with our curated travel experiences.
                    </p>
                </div>
                <div className="absolute -bottom-24 left-0 right-0 z-20 w-full px-4">
                    <HeroSearch />
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-[85vh] w-full bg-slate-900 text-white">
            <Carousel
                plugins={[plugin.current]}
                className="w-full h-full"
                opts={{
                    loop: true,
                    duration: 60,
                }}
            >
                <CarouselContent className="h-[85vh] ml-0">
                    {slides.map((slide) => (
                        <CarouselItem key={slide.id} className="relative w-full h-full pl-0">
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.image}
                                    alt={slide.title || "Hero Background"}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/40" />

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="container relative z-10 flex flex-col items-center justify-center px-4 md:px-6 text-center -mt-20">
                                    <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl max-w-4xl drop-shadow-xl animate-fade-in-up">
                                        {slide.title}
                                    </h1>
                                    <p className="mb-8 text-xl md:text-2xl font-light text-gray-100 max-w-2xl drop-shadow-md">
                                        {slide.subtitle}
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* Optional: Add navigation controls if desired, but for hero usually autoplay is better */}
                {/* <CarouselPrevious className="left-4" /> */}
                {/* <CarouselNext className="right-4" /> */}
            </Carousel>

            {/* Search Widget - Positioned absolutely over the carousel */}
            <div className="absolute -bottom-24 left-0 right-0 z-20 w-full px-4">
                <HeroSearch />
            </div>
        </div>
    );
}
