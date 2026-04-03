"use client";

import * as React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { HeroSlide } from "@prisma/client";
import { HeroSearch } from "@/components/public/hero-search";
import { ChevronDown } from "lucide-react";

interface HeroSliderProps {
    slides: HeroSlide[];
    defaultTitle?: string;
    defaultImage?: string;
}

export function HeroSlider({ slides, defaultTitle, defaultImage }: HeroSliderProps) {
    const plugin = React.useRef(
        Autoplay({ delay: 5500, stopOnInteraction: true })
    );

    const scrollDown = () => {
        window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    };

    if (!slides || slides.length === 0) {
        return (
            <div className="relative min-h-[90vh] w-full flex items-center justify-center bg-emerald-950 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={defaultImage || "/hero-bg.jpg"}
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                {/* Warm dark vignette overlay */}
                <div className="absolute inset-0 vignette-warm" />
                {/* Extra top darkening for navbar readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-transparent to-transparent" />

                <div className="container relative z-10 flex flex-col items-center justify-center px-4 md:px-6 text-center -mt-16">
                    <p className="section-badge text-amber-300/90 mb-4">✦ Welcome to Sri Lanka</p>
                    <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl max-w-4xl drop-shadow-xl animate-fade-in-up font-serif italic">
                        {defaultTitle || "Explore Sri Lanka"}
                    </h1>
                    <p className="mb-8 text-lg md:text-xl font-light text-emerald-100/90 max-w-2xl drop-shadow-md tracking-wide">
                        Discover the Pearl of the Indian Ocean — pristine beaches, misty highlands & timeless heritage.
                    </p>
                </div>

                {/* Search Widget */}
                <div className="absolute -bottom-14 left-0 right-0 z-20 w-full px-4">
                    <HeroSearch />
                </div>

                {/* Scroll-down indicator */}
                <button
                    onClick={scrollDown}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors scroll-indicator"
                    aria-label="Scroll down"
                >
                    <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
                    <ChevronDown className="h-5 w-5" />
                </button>
            </div>
        );
    }

    return (
        <div className="relative min-h-[90vh] w-full bg-emerald-950 text-white overflow-hidden">
            <Carousel
                plugins={[plugin.current]}
                className="w-full h-full"
                opts={{
                    loop: true,
                    duration: 60,
                }}
            >
                <CarouselContent className="h-[90vh] ml-0">
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
                            {/* Warm vignette overlay */}
                            <div className="absolute inset-0 vignette-warm" />
                            {/* Top fade for navbar */}
                            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/50 via-transparent to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="container relative z-10 flex flex-col items-center justify-center px-4 md:px-6 text-center -mt-16">
                                    <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300/90 mb-5">
                                        <span className="text-[0.55rem]">✦</span> Sri Lanka Awaits
                                    </p>
                                    <h1 className="mb-5 text-5xl font-bold leading-tight md:text-7xl max-w-4xl drop-shadow-xl animate-fade-in-up font-serif italic">
                                        {slide.title}
                                    </h1>
                                    <p className="mb-8 text-lg md:text-xl font-light text-emerald-100/90 max-w-2xl drop-shadow-md tracking-wide">
                                        {slide.subtitle}
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Search Widget - Positioned absolutely over the carousel */}
            <div className="absolute -bottom-14 left-0 right-0 z-20 w-full px-4">
                <HeroSearch />
            </div>

            {/* Scroll-down indicator */}
            <button
                onClick={scrollDown}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors scroll-indicator"
                aria-label="Scroll down"
            >
                <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
                <ChevronDown className="h-5 w-5" />
            </button>
        </div>
    );
}
