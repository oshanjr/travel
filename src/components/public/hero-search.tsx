"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar as CalendarIcon, Sparkles } from "lucide-react";

export function HeroSearch() {
    return (
        <div className="w-full max-w-4xl mx-auto relative z-20">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/20 overflow-hidden flex flex-col group">
                {/* Desktop/Tablet Header */}
                <div className="bg-stone-50/50 border-b border-stone-100 px-8 py-5 hidden sm:flex justify-between items-center gap-4">
                    <h3 className="font-bold text-emerald-950 text-xl font-serif">Find Your Perfect <span className="text-amber-600">Package</span></h3>
                    <Button asChild className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-semibold shadow-md h-11 px-6 rounded-full">
                        <a href="/custom-trip">
                            <Sparkles className="mr-2 h-5 w-5" />
                            Build a Custom Itinerary
                        </a>
                    </Button>
                </div>

                <div className="p-6 md:p-8 bg-white">
                    <form action="/packages" className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full space-y-1.5">
                            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Destination</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-5 w-5 text-emerald-600/50" />
                                <Input name="destination" placeholder="Where do you want to go?" className="h-12 pl-10 bg-stone-50 border-stone-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all rounded-xl" />
                            </div>
                        </div>
                        <div className="flex-1 w-full space-y-1.5">
                            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Date</label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-emerald-600/50" />
                                <Input name="date" type="date" className="h-12 pl-10 bg-stone-50 border-stone-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all rounded-xl" />
                            </div>
                        </div>
                        <Button type="submit" size="lg" className="h-12 bg-emerald-800 hover:bg-emerald-700 text-white px-8 shadow-lg shadow-emerald-800/20 w-full md:w-auto rounded-xl font-semibold">
                            <Search className="mr-2 h-4 w-4" /> Search Packages
                        </Button>
                    </form>

                    {/* Mobile-only Custom Itinerary Button */}
                    <div className="mt-4 sm:hidden">
                        <Button asChild className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-semibold shadow-md w-full h-12 rounded-xl">
                            <a href="/custom-trip">
                                <Sparkles className="mr-2 h-5 w-5" />
                                Build a Custom Itinerary
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
