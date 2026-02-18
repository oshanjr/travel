"use client";

import { useFormState, useFormStatus } from "react-dom";
import { registerUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2 } from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={pending}>
            {pending ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
            Create Account
        </Button>
    );
}

const initialState: any = {
    message: null,
    error: null,
};

export default function RegisterPage() {
    const [state, formAction] = useFormState(registerUser, initialState);

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586796676774-c9f0bd5a2818?q=80&w=2000&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            {/* Glassy Card */}
            <div className="relative z-10 w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl ring-1 ring-black/5">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Join Travel.lk</h1>
                    <p className="text-gray-200">Start your journey with us today.</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Full Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20"
                        />
                        {state?.error?.name && <p className="text-red-300 text-sm">{state.error.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email Address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20"
                        />
                        {state?.error?.email && <p className="text-red-300 text-sm">{state.error.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20"
                        />
                        {state?.error?.password && <p className="text-red-300 text-sm">{state.error.password}</p>}
                    </div>

                    {state?.message && (
                        <div className="p-3 rounded bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                            {state.message}
                        </div>
                    )}

                    <SubmitButton />
                </form>

                <div className="mt-6 text-center text-sm text-gray-300">
                    Already have an account?{" "}
                    <Link href="/login" className="text-white font-semibold hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
