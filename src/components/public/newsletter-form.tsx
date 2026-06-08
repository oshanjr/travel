"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/app/actions/subscribers";
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";

export function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const result = await subscribeNewsletter(email);

        if (result.success) {
            setIsSuccess(true);
            setEmail("");
        } else {
            setError(result.error || "Something went wrong.");
        }
        
        setIsSubmitting(false);
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto bg-green-500/10 border border-green-500/30 rounded-3xl backdrop-blur-md">
                <div className="w-12 h-12 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-serif mb-2">Subscribed!</h3>
                <p className="text-stone-300 text-sm">Thank you for subscribing to our newsletter. We'll keep you updated!</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col max-w-lg mx-auto w-full gap-2">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Your email address"
                    className="w-full sm:flex-1 h-14 px-6 rounded-full text-white bg-white/10 border border-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-stone-400 text-sm transition-all"
                />
                <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto h-14 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-full px-10 shadow-xl shadow-amber-500/25 shrink-0 transition-all active:scale-95 disabled:opacity-70"
                >
                    {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
                    Subscribe
                </Button>
            </div>
            {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
        </form>
    );
}
