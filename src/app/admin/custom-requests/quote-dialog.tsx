"use client";

import { useState } from "react";
import { quoteCustomTripRequest } from "./actions";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { CustomTripRequest } from "@prisma/client";

interface QuoteDialogProps {
    request: CustomTripRequest;
}

export function QuoteDialog({ request }: QuoteDialogProps) {
    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const destinations = request.destinations as string[];

    async function handleQuote() {
        if (!price || isNaN(Number(price))) {
            alert("Please enter a valid amount.");
            return;
        }

        setIsSubmitting(true);
        const res = await quoteCustomTripRequest(request.id, price);
        setIsSubmitting(false);

        if (res.success) {
            setOpen(false);
            setPrice("");
        } else {
            alert(res.error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    View & Action
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Custom Trip Request details</DialogTitle>
                    <DialogDescription>
                        Review the requirements and provide a quote.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-semibold block text-slate-500">Customer Name</span>
                            <span className="text-slate-900">{request.customerName}</span>
                        </div>
                        <div>
                            <span className="font-semibold block text-slate-500">Customer Email</span>
                            <span className="text-slate-900"><a href={`mailto:${request.customerEmail}`} className="text-blue-600 hover:underline">{request.customerEmail}</a></span>
                        </div>
                        <div>
                            <span className="font-semibold block text-slate-500">Guests</span>
                            <span className="text-slate-900">{request.guestCount} People</span>
                        </div>
                        <div>
                            <span className="font-semibold block text-slate-500">Duration</span>
                            <span className="text-slate-900">{request.durationDays} Days</span>
                        </div>
                        <div>
                            <span className="font-semibold block text-slate-500">Vehicle Type</span>
                            <span className="text-slate-900">{request.vehicleType}</span>
                        </div>
                        <div>
                            <span className="font-semibold block text-slate-500">Needs Accommodation</span>
                            <span className="text-slate-900">{request.needsAccommodation ? "Yes" : "No"}</span>
                        </div>
                    </div>

                    <div>
                        <span className="font-semibold block text-slate-500 text-sm mb-2">Destinations</span>
                        <div className="flex flex-wrap gap-2">
                            {destinations.map(dest => (
                                <Badge key={dest} variant="secondary" className="bg-blue-50 text-blue-700">
                                    {dest}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {request.activitiesOfInterest && (
                        <div>
                            <span className="font-semibold block text-slate-500 text-sm mb-1">Activities of Interest</span>
                            <p className="text-sm bg-slate-50 p-3 rounded-md text-slate-700 whitespace-pre-wrap">
                                {request.activitiesOfInterest}
                            </p>
                        </div>
                    )}

                    {request.status !== "PENDING" ? (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-center justify-between">
                            <div>
                                <span className="font-semibold text-green-800 text-sm block">Current Status</span>
                                <Badge className="bg-green-600 mt-1">{request.status}</Badge>
                            </div>
                            <div className="text-right">
                                <span className="font-semibold text-green-800 text-sm block">Quoted Price</span>
                                <span className="text-lg font-bold text-green-900">${request.quotedPrice?.toString()}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-2">
                            <Label htmlFor="price">Quoted Price ($)</Label>
                            <Input
                                id="price"
                                type="number"
                                placeholder="e.g. 1200"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <DialogFooter>
                    {request.status === "PENDING" && (
                        <Button onClick={handleQuote} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending Quote...
                                </>
                            ) : (
                                "Send Quote"
                            )}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
