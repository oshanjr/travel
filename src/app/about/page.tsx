import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Travel.lk",
    description: "Learn more about Travel.lk and our passion for Sri Lankan tourism.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-28 pb-20 bg-slate-50">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">About Us</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        We are passionate about showing you the authentic beauty of Sri Lanka.
                    </p>
                </div>

                <div className="prose prose-lg prose-slate max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                    <h2>Our Story</h2>
                    <p>
                        Founded with a love for our island home, Travel.lk started as a small team of local enthusiasts wanting to share the hidden gems of Sri Lanka with the world. Over the years, we've grown into a comprehensive travel agency, but our core mission remains the same: providing unforgettable, personalized experiences.
                    </p>

                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li><strong>Local Expertise:</strong> Our guides are locals who know Sri Lanka inside and out.</li>
                        <li><strong>Customized Itineraries:</strong> We tailor every trip to your specific interests and budget.</li>
                        <li><strong>Sustainable Tourism:</strong> We believe in protecting our environment and supporting local communities.</li>
                        <li><strong>24/7 Support:</strong> We're here for you every step of the way, from planning to your safe return.</li>
                    </ul>

                    <h2>Our Vision</h2>
                    <p>
                        To be the most trusted and innovative travel partner in Sri Lanka, offering immersive and sustainable travel experiences that connect people, cultures, and landscapes.
                    </p>
                </div>
            </div>
        </main>
    );
}
