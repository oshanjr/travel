"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, MapPin, Calendar as CalendarIcon, Hotel, FileText, Plane } from "lucide-react";
import { useState } from "react";

export function HeroSearch() {
    const [activeTab, setActiveTab] = useState("tours");

    return (
        <div className="w-full max-w-4xl mx-auto relative z-20">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                <Tabs defaultValue="tours" className="w-full" onValueChange={setActiveTab}>
                    <div className="bg-gray-50/50 border-b px-6 pt-4">
                        <TabsList className="bg-transparent h-auto p-0 gap-6">
                            <TabsTrigger
                                value="tours"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-0 pb-3 text-gray-500 data-[state=active]:text-blue-600 font-medium text-base gap-2"
                            >
                                <Plane className="h-4 w-4" /> Tours
                            </TabsTrigger>
                            <TabsTrigger
                                value="hotels"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-0 pb-3 text-gray-500 data-[state=active]:text-blue-600 font-medium text-base gap-2"
                            >
                                <Hotel className="h-4 w-4" /> Hotels
                            </TabsTrigger>
                            <TabsTrigger
                                value="visa"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-0 pb-3 text-gray-500 data-[state=active]:text-blue-600 font-medium text-base gap-2"
                            >
                                <FileText className="h-4 w-4" /> Visa
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="p-6 md:p-8 bg-white">
                        <TabsContent value="tours" className="mt-0">
                            <div className="flex flex-col md:flex-row gap-4 items-end">
                                <div className="flex-1 w-full space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Destination</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <Input placeholder="Where do you want to go?" className="h-12 pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                                    </div>
                                </div>
                                <div className="flex-1 w-full space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</label>
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <Input type="date" className="h-12 pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                                    </div>
                                </div>
                                <Button size="lg" className="h-12 bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-lg shadow-blue-600/20">
                                    <Search className="mr-2 h-4 w-4" /> Search Tours
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="hotels" className="mt-0">
                            <div className="flex flex-col md:flex-row gap-4 items-end">
                                <div className="flex-1 w-full space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">City or Hotel</label>
                                    <div className="relative">
                                        <Hotel className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <Input placeholder="Enter city or hotel name" className="h-12 pl-10 bg-gray-50 border-gray-200" />
                                    </div>
                                </div>
                                <div className="flex-1 w-full space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Check-in</label>
                                    <Input type="date" className="h-12 bg-gray-50 border-gray-200" />
                                </div>
                                <Button size="lg" className="h-12 bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-lg shadow-blue-600/20">
                                    <Search className="mr-2 h-4 w-4" /> Search Hotels
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="visa" className="mt-0">
                            <div className="flex flex-col md:flex-row gap-4 items-end">
                                <div className="flex-1 w-full space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Citizenship</label>
                                    <Input placeholder="Your Country" className="h-12 bg-gray-50 border-gray-200" />
                                </div>
                                <div className="flex-1 w-full space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Traveling To</label>
                                    <Input placeholder="Destination Country" className="h-12 bg-gray-50 border-gray-200" defaultValue="Sri Lanka" readOnly />
                                </div>
                                <Button size="lg" className="h-12 bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-lg shadow-blue-600/20">
                                    <Search className="mr-2 h-4 w-4" /> Check Requirements
                                </Button>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
