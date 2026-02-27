"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { createBooking } from "@/app/actions/bookings";
import { Package } from "@prisma/client";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface BookingModalProps {
    pkg: Package;
}

export function BookingModal({ pkg }: BookingModalProps) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    async function handleBooking() {
        if (!session?.user) {
            router.push("/login");
            return;
        }

        if (!date) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("packageId", pkg.id);
            formData.append("date", date.toISOString());
            formData.append("guests", "1");
            formData.append("totalAmount", pkg.price.toString());

            await createBooking(formData);
        } catch (error: any) {
            // If it's a NEXT_REDIRECT error, it's expected and we shouldn't alert
            if (error.message && error.message.includes('NEXT_REDIRECT')) {
                throw error;
            }
            alert("Failed to book.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="w-full md:w-auto">
                    Book Now
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Confirm Booking</DialogTitle>
                    <DialogDescription>
                        You are booking <strong>{pkg.title}</strong> for <strong>${Number(pkg.price)}</strong>.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Select Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleBooking} disabled={loading || !date}>
                        {loading ? "Booking..." : "Confirm & Book"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
