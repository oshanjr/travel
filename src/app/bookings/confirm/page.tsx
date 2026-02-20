import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Calendar, Users, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { createBooking } from "@/app/actions/bookings";

export default async function BookingConfirmPage({
    searchParams,
}: {
    searchParams: Promise<{ packageId: string; date: string; guests: string; price: string }>;
}) {
    const session = await auth();
    const resolvedParams = await searchParams;

    if (!session?.user) {
        const callbackUrl = `/bookings/confirm?${new URLSearchParams(resolvedParams).toString()}`;
        redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }

    const { packageId, date, guests, price } = resolvedParams;

    if (!packageId || !date || !guests || !price) {
        redirect("/packages");
    }

    const pkg = await prisma.package.findUnique({
        where: { id: packageId },
    });

    if (!pkg) {
        redirect("/packages");
    }

    const totalAmount = Number(price);
    const guestCount = Number(guests);
    const bookingDate = new Date(date);

    return (
        <div className="min-h-screen bg-gray-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-gray-50 to-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Confirm Your Booking</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Package Summary */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 sticky top-32">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={(pkg.images as string[])[0] || "/placeholder.jpg"}
                                    alt={pkg.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6 space-y-4">
                                <h3 className="font-bold text-xl text-gray-900">{pkg.title}</h3>
                                <div className="text-sm text-gray-500">
                                    <p>{pkg.duration}</p>
                                    <p>{pkg.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Details & Payment */}
                    <div className="md:col-span-2">
                        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 text-blue-900">
                                    <Calendar className="h-6 w-6" />
                                    <div>
                                        <p className="text-xs font-semibold uppercase opacity-70">Date</p>
                                        <p className="font-medium">{format(bookingDate, "PPP")}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-teal-50 text-teal-900">
                                    <Users className="h-6 w-6" />
                                    <div>
                                        <p className="text-xs font-semibold uppercase opacity-70">Guests</p>
                                        <p className="font-medium">{guestCount} People</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 py-6 mb-6">
                                <div className="flex justify-between items-center text-lg mb-2">
                                    <span className="text-gray-600">Package Price</span>
                                    <span className="font-medium">${Number(pkg.price)} x {guestCount}</span>
                                </div>
                                <div className="flex justify-between items-center text-xl font-bold text-gray-900 mt-4">
                                    <span>Total Amount</span>
                                    <span className="text-blue-600">${totalAmount}</span>
                                </div>
                            </div>

                            {/* Payment Method Placeholder */}
                            <div className="mb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
                                <div className="p-4 border rounded-xl bg-gray-50 text-gray-500 text-sm flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Payment integration will be simulated for this demo.
                                </div>
                            </div>

                            <form action={createBooking}>
                                <input type="hidden" name="packageId" value={packageId} />
                                <input type="hidden" name="date" value={date} />
                                <input type="hidden" name="guests" value={guests} />
                                <input type="hidden" name="totalAmount" value={totalAmount} />

                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl text-lg shadow-lg shadow-blue-600/20">
                                    Confirm & Pay
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
