import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Travel.lk",
    description: "Get in touch with Travel.lk for inquiries and bookings.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-28 pb-20 bg-slate-50">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Contact Us</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Have questions or ready to book your trip? Reach out to our friendly team.
                    </p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-12">
                    <div className="flex-1 space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Our Office</h3>
                            <p className="text-slate-600">
                                123 Tourism Way<br />
                                Colombo 03, Sri Lanka
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Phone</h3>
                            <p className="text-slate-600">+94 11 234 5678</p>
                            <p className="text-slate-600">+94 77 123 4567 (WhatsApp)</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Email</h3>
                            <p className="text-slate-600">info@travel.lk</p>
                            <p className="text-slate-600">bookings@travel.lk</p>
                        </div>
                    </div>

                    <div className="flex-1">
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
