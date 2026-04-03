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
        window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
    };

    // Shared premium overlays
    const PremiumOverlays = () => (
        <>
            {/* Cinematic vignette */}
            <div className="absolute inset-0 vignette-warm" />
            {/* Top fade for navbar */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-emerald-950/10 to-transparent" />
            {/* Bottom fade for search widget */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 via-transparent to-transparent" />
            {/* Side vignette for cinematic look */}
            <div className="absolute inset-0" style={{
                background: "radial-gradient(ellipse at center, transparent 50%, rgba(6,30,20,0.4) 100%)"
            }} />
            {/* Subtle gold shimmer line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
        </>
    );

    // Shared scroll indicator
    const ScrollIndicator = () => (
        <button
            onClick={scrollDown}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors scroll-indicator"
            aria-label="Scroll down"
        >
            <span className="text-[9px] uppercase tracking-[0.25em] font-medium">Discover More</span>
            <ChevronDown className="h-4 w-4" />
        </button>
    );

    if (!slides || slides.length === 0) {
        return (
            <div className="relative h-screen w-full flex items-center justify-center bg-emerald-950 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={defaultImage || "/hero-bg.jpg"}
                        alt="Hero Background"
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                </div>
                <PremiumOverlays />

                <div className="container relative z-10 flex flex-col items-center justify-center px-4 md:px-6 text-center -mt-16">
                    <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-300/80 mb-5 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        <span className="w-8 h-px bg-amber-400/50" />
                        Welcome to Sri Lanka
                        <span className="w-8 h-px bg-amber-400/50" />
                    </p>
                    <h1 className="mb-5 text-5xl font-bold leading-[1.1] md:text-7xl lg:text-8xl max-w-5xl drop-shadow-2xl animate-fade-in-up font-serif italic" style={{ animationDelay: "0.3s" }}>
                        {defaultTitle || "Explore Sri Lanka"}
                    </h1>
                    <p className="mb-8 text-base md:text-lg font-light text-white/70 max-w-xl drop-shadow-md tracking-wide animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                        Pristine beaches · Misty highlands · Timeless heritage
                    </p>
                </div>

                <ScrollIndicator />
            </div>
        );
    }

    return (
        <div className="relative h-screen w-full bg-emerald-950 text-white overflow-hidden">
            <Carousel
                plugins={[plugin.current]}
                className="w-full h-full"
                opts={{ loop: true, duration: 60 }}
            >
                {/* Changed: Added !ml-0 and flex to enforce proper layout and override Shadcn margins */}
                <CarouselContent className="h-screen !ml-0 flex">
                    {slides.map((slide, index) => (
                        <CarouselItem key={slide.id} className="relative w-full h-full !pl-0 min-w-0 shrink-0 grow-0 basis-full">
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.image}
                                    alt={slide.title || "Hero Background"}
                                    fill
                                    className="object-cover scale-105"
                                    priority={index === 0}
                                />
                            </div>
                            <PremiumOverlays />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="container relative z-10 flex flex-col items-center justify-center px-4 md:px-6 text-center -mt-16">
                                    <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-300/80 mb-5">
                                        <span className="w-8 h-px bg-amber-400/50" />
                                        Sri Lanka Awaits
                                        <span className="w-8 h-px bg-amber-400/50" />
                                    </p>
                                    <h1 className="mb-5 text-5xl font-bold leading-[1.1] md:text-7xl lg:text-8xl max-w-5xl drop-shadow-2xl animate-fade-in-up font-serif italic">
                                        {slide.title}
                                    </h1>
                                    <p className="mb-8 text-base md:text-lg font-light text-white/70 max-w-xl drop-shadow-md tracking-wide">
                                        {slide.subtitle}
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <ScrollIndicator />
        </div>
    );
}