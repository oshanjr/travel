import { auth } from "@/auth";
import { getUserBookings } from "@/app/actions/bookings";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Package as PackageIcon } from "lucide-react";
import { format } from "date-fns";

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login?callbackUrl=/profile");
    }

    const bookings = await getUserBookings();

    return (
        <div className="min-h-screen bg-gray-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-gray-50 to-gray-50 pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* User Info Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg rounded-3xl p-6 text-center sticky top-24">
                            <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 ring-4 ring-white shadow-md">
                                {session.user.name?.[0] || session.user.email?.[0] || 'U'}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{session.user.name}</h2>
                            <p className="text-sm text-gray-500 mb-6">{session.user.email}</p>

                            <div className="border-t border-gray-100 pt-6 text-left">
                                <h3 className="font-semibold text-sm text-gray-900 mb-3">Account Actions</h3>
                                <form action={async () => {
                                    "use server"
                                    const { signOut } = await import("@/auth")
                                    await signOut({ redirectTo: "/" })
                                }}>
                                    <Button variant="destructive" className="w-full justify-start rounded-xl">
                                        Sign Out
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Main Content: Bookings */}
                    <div className="lg:col-span-3 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <PackageIcon className="h-6 w-6 text-blue-600" />
                            My Bookings
                        </h2>

                        {bookings.length === 0 ? (
                            <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-3xl p-10 text-center">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                                <p className="text-gray-500 mb-6">Looks like you haven't booked any adventures yet.</p>
                                <Link href="/packages">
                                    <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
                                        Browse Packages
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bookings.map((booking: any) => (
                                    <div key={booking.id} className="group bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6">
                                        <div className="relative w-full md:w-32 h-32 rounded-xl overflow-hidden shrink-0">
                                            <Image
                                                src={booking.package.images?.[0] || '/placeholder.jpg'}
                                                alt={booking.package.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.package.title}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                                    ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                                        booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'}`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4 text-blue-500" />
                                                    {format(new Date(booking.createdAt), 'PPP')}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-semibold text-gray-900">Total:</span>
                                                    LKR {Number(booking.totalAmount).toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/packages/${booking.package.slug}`}>
                                                    <Button variant="outline" size="sm" className="rounded-full bg-white/50">View Package</Button>
                                                </Link>
                                                {/* Add 'View Receipt' or other actions here */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
