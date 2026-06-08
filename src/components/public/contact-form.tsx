"use client";

import { useState } from "react";
import { submitInquiry } from "@/app/actions/inquiries";
import { Loader2, Check } from "lucide-react";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        const result = await submitInquiry({ name, email, message });

        if (result.success) {
            setIsSuccess(true);
            e.currentTarget.reset();
        } else {
            setError(result.error || "Something went wrong.");
        }
        
        setIsSubmitting(false);
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center p-10 text-center h-full">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-serif mb-3">Message Sent!</h3>
                <p className="text-stone-300">We'll get back to you as soon as possible.</p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className="flex-1 p-10">
            <h2 className="text-2xl font-bold text-white font-serif mb-6">Send a Message</h2>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-stone-200 mb-1.5">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/10 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm"
                        placeholder="Your Name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-200 mb-1.5">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/10 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm"
                        placeholder="your@email.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-200 mb-1.5">Message</label>
                    <textarea
                        rows={5}
                        name="message"
                        required
                        className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/10 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm resize-none"
                        placeholder="How can we help you?"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex justify-center items-center w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/25 active:scale-95 disabled:opacity-70"
                >
                    {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
                    {isSubmitting ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    );
}
