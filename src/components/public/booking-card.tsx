"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BookingCardProps {
    price: number;
    user: any; // Using any for simplicity in prop passing, refine if needed
    packageId: string;
    packageSlug: string;
}

export function BookingCard({ price, user, packageId, packageSlug }: BookingCardProps) {
    const [date, setDate] = useState<Date>();
    const [guests, setGuests] = useState(1);
    const router = useRouter();

    const handleBookNow = () => {
        if (!user) {
            router.push(`/login?callbackUrl=/packages/${packageSlug}`);
            return;
        }

        if (!date) {
            alert("Please select a date");
            return;
        }

        // Redirect to booking confirmation logic (Phase 3 next step)
        router.push(`/bookings/confirm?packageId=${packageId}&date=${date.toISOString()}&guests=${guests}`);
    };

    return (
        <Card className="sticky top-24 shadow-xl border-t-4 border-t-blue-600">
            <CardHeader>
                <div className="text-sm text-gray-500 font-medium">Starting from</div>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">${price}</span>
                    <span className="text-gray-500">/ person</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Select Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(date) => date < new Date()}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="space-y-2">
                    <Label>Guests</Label>
                    <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            type="number"
                            min={1}
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between mb-2 text-sm">
                        <span className="text-gray-600">Total ({guests} guests)</span>
                        <span className="font-semibold">${price * guests}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                    onClick={handleBookNow}
                >
                    Book Now
                </Button>
            </CardFooter>
        </Card>
    );
}
