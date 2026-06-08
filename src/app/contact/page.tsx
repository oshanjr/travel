import { Metadata } from "next";
import { FadeIn } from "@/components/ui/fade-in";
import { ContactForm } from "@/components/public/contact-form";

export const metadata: Metadata = {
    title: "Contact Us | A&S Pearl Lanka Tours",
    description: "Get in touch with A&S Pearl Lanka Tours for inquiries and bookings.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen relative overflow-x-hidden">
            {/* Full-page background image */}
            <div
                className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/bg-beach-contact.png')" }}
            />
            {/* Dark tint overlay */}
            <div className="fixed inset-0 -z-10 bg-stone-950/65" />

            {/* Hero */}
            <section className="pt-36 pb-20 text-center px-4">
                <FadeIn>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
                        <span className="text-[0.55rem]">✦</span> Get in Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4 drop-shadow-xl">
                        Contact Us
                    </h1>
                    <p className="text-lg text-stone-200 max-w-xl mx-auto leading-relaxed">
                        Have questions or ready to book your trip? Reach out to our friendly team.
                    </p>
                </FadeIn>
            </section>

            {/* Glass form card */}
            <FadeIn className="container mx-auto px-4 max-w-4xl pb-28">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl shadow-black/30 flex flex-col md:flex-row gap-0 overflow-hidden">

                    {/* Info panel */}
                    <div className="flex-1 p-10 space-y-8 border-b md:border-b-0 md:border-r border-white/15">
                        <div>
                            <h3 className="text-lg font-bold text-amber-300 mb-2">Our Office</h3>
                            <p className="text-stone-200">
                                123 Tourism Way<br />
                                Colombo 03, Sri Lanka
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-amber-300 mb-2">Phone</h3>
                            <p className="text-stone-200">+94 11 234 5678</p>
                            <p className="text-stone-200">+94 77 123 4567 (WhatsApp)</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-amber-300 mb-2">Email</h3>
                            <p className="text-stone-200">info@aspearllankatours.com</p>
                            <p className="text-stone-200">bookings@aspearllankatours.com</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-amber-300 mb-2">Hours</h3>
                            <p className="text-stone-200">Mon – Sat: 8:00 AM – 7:00 PM</p>
                            <p className="text-stone-200">Sun: 9:00 AM – 5:00 PM</p>
                        </div>
                    </div>

                    {/* Form panel */}
                    <ContactForm />
                </div>
            </FadeIn>
        </main>
    );
}
