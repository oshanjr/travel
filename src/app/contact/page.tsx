import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | A&S Pearl Lanka Tours",
    description: "Get in touch with A&S Pearl Lanka Tours for inquiries and bookings.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-stone-50 pb-20">
            {/* Hero Header with Beach */}
            <div className="relative pt-32 pb-28 mb-16 overflow-hidden bg-stone-950">
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-90"
                    style={{ backgroundImage: "url('/bg-beach-contact.png')" }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-stone-50 via-stone-950/20 to-stone-950/60" />
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
                        <span className="text-[0.55rem]">✦</span> Get in Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">Contact Us</h1>
                    <p className="text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed">
                        Have questions or ready to book your trip? Reach out to our friendly team.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl -mt-32 relative z-20">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col md:flex-row gap-12">
                    <div className="flex-1 space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-stone-900 mb-2">Our Office</h3>
                            <p className="text-stone-600">
                                123 Tourism Way<br />
                                Colombo 03, Sri Lanka
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-stone-900 mb-2">Phone</h3>
                            <p className="text-stone-600">+94 11 234 5678</p>
                            <p className="text-stone-600">+94 77 123 4567 (WhatsApp)</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-stone-900 mb-2">Email</h3>
                            <p className="text-stone-600">info@aspearllankatours.com</p>
                            <p className="text-stone-600">bookings@aspearllankatours.com</p>
                        </div>
                    </div>

                    <div className="flex-1">
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                                <input type="text" className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 bg-stone-50" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                                <input type="email" className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 bg-stone-50" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 bg-stone-50" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-amber-500 text-stone-950 font-bold py-3.5 rounded-xl hover:bg-amber-400 transition shadow-lg shadow-amber-500/20">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
