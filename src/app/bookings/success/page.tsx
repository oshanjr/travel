import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function BookingSuccessPage({ searchParams }: { searchParams: { id: string } }) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
                <div className="flex justify-center mb-6">
                    <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-500">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
                <p className="text-gray-600 mb-8">
                    Your adventure awaits. We've sent a confirmation email with all the details.
                </p>

                <div className="space-y-3">
                    <Link href="/profile">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12">
                            View My Bookings
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="ghost" className="w-full rounded-xl text-gray-500">
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
