import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-100 via-gray-50 to-gray-50 pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl p-8 md:p-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">About Travel.lk</h1>
                    <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-inner">
                        <Image
                            src="https://images.unsplash.com/photo-1546708773-e57c8d35ca6e?q=80&w=2074&auto=format&fit=crop"
                            alt="Sri Lanka Scenery"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                        <p>
                            Welcome to <strong>Travel.lk</strong>, your premier gateway to the island paradise of Sri Lanka.
                            We are a passionate team of explorers, storytellers, and travel experts dedicated to sharing the
                            magic of our homeland with the world.
                        </p>
                        <p>
                            Founded in 2024, our mission is simple: to create unforgettable travel experiences that
                            connect you with the rich culture, breathtaking landscapes, and warm hospitality of Sri Lanka.
                            From the ancient ruins of the Cultural Triangle to the pristine beaches of the South Coast,
                            we curate journeys that go beyond the ordinary.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-center">
                                <h3 className="font-bold text-blue-900 mb-2">Expert Guides</h3>
                                <p className="text-sm">Locals who know every hidden gem.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100 text-center">
                                <h3 className="font-bold text-teal-900 mb-2">Sustainable Travel</h3>
                                <p className="text-sm">Committed to protecting our nature.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 text-center">
                                <h3 className="font-bold text-amber-900 mb-2">24/7 Support</h3>
                                <p className="text-sm">We are with you every step of the way.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
