"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar as CalendarIcon, Sparkles } from "lucide-react";

export function HeroSearch() {
    return (
        <div className="w-full max-w-4xl mx-auto relative z-20">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
                <div className="bg-gray-50/50 border-b px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h3 className="font-semibold text-gray-700 text-lg hidden sm:block">Find Your Perfect Package</h3>
                    <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-md w-full sm:w-auto h-11 px-6">
                        <a href="/custom-trip">
                            <Sparkles className="mr-2 h-5 w-5" />
                            Build a Custom Itinerary
                        </a>
                    </Button>
                </div>

                <div className="p-6 md:p-8 bg-white">
                    <form action="/packages" className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Destination</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input name="destination" placeholder="Where do you want to go?" className="h-12 pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                            </div>
                        </div>
                        <div className="flex-1 w-full space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input name="date" type="date" className="h-12 pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                            </div>
                        </div>
                        <Button type="submit" size="lg" className="h-12 bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-lg shadow-blue-600/20 w-full md:w-auto">
                            <Search className="mr-2 h-4 w-4" /> Search Packages
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
