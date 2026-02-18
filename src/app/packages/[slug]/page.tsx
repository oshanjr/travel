import { auth } from "@/auth";
import { getPackageBySlug } from "@/app/actions/packages";
import { BookingCard } from "@/components/public/booking-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";

export default async function PackageDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const pkg = await getPackageBySlug(slug);
    const session = await auth();

    if (!pkg) {
        notFound();
    }

    const images = pkg.images as string[];
    const mainImage = images[0] || '/placeholder.jpg';
    const itinerary = pkg.itinerary as any[]; // Type this properly if possible
    const inclusions = pkg.inclusions as string[];

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Header */}
            <div className="relative h-[50vh] w-full">
                <Image
                    src={mainImage}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="container absolute bottom-0 left-0 right-0 z-10 px-4 pb-10 text-white">
                    <h1 className="text-4xl font-bold md:text-6xl drop-shadow-lg">{pkg.title}</h1>
                    <div className="mt-4 flex flex-wrap gap-6 text-lg">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-yellow-500" />
                            {pkg.location}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-yellow-500" />
                            {pkg.duration}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content (Left) */}
                    <div className="lg:col-span-2 space-y-8">
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                            </TabsList>
                            <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
                                <TabsContent value="overview" className="space-y-4 mt-0">
                                    <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        Experience the magic of {pkg.location} with this comprehensive tour.
                                        Ideal for those looking to explore the rich culture and stunning landscapes of Sri Lanka.
                                        {/* Dynamic description could come from DB if added later */}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        {images.slice(1, 3).map((img, idx) => (
                                            <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
                                                <Image src={img} alt={`${pkg.title} ${idx + 1}`} fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="itinerary" className="mt-0">
                                    <h2 className="text-2xl font-bold mb-6">Daily Itinerary</h2>
                                    <div className="relative border-l border-blue-200 ml-3 space-y-8 pb-4">
                                        {itinerary.map((item, index) => (
                                            <div key={index} className="ml-6 relative">
                                                <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                                                <h3 className="font-bold text-lg text-gray-900">Day {item.day}: {item.title}</h3>
                                                <p className="mt-2 text-gray-600">{item.description}</p>
                                            </div>
                                        ))}
                                        {itinerary.length === 0 && <p className="text-gray-500">No itinerary details available.</p>}
                                    </div>
                                </TabsContent>

                                <TabsContent value="inclusions" className="mt-0">
                                    <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                                    <ul className="grid gap-3 sm:grid-cols-2">
                                        {inclusions.map((inc, index) => (
                                            <li key={index} className="flex items-center gap-2 text-gray-700">
                                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                                {inc}
                                            </li>
                                        ))}
                                    </ul>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>

                    {/* Sidebar (Right) */}
                    <div className="relative">
                        <BookingCard
                            price={Number(pkg.price)}
                            user={session?.user}
                            packageId={pkg.id}
                            packageSlug={pkg.slug}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
