import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage({ searchParams }: { searchParams: { success?: string, callbackUrl?: string } }) {
    const successMessage = searchParams.success;
    const callbackUrl = searchParams.callbackUrl || "/admin"; // Default to admin but logic in auth.config handles it too

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625736300986-19379650d322?q=80&w=2000&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 w-full max-w-md space-y-8 rounded-3xl bg-white/5 backdrop-blur-md p-10 shadow-2xl border border-white/10 ring-1 ring-black/5">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-200">Sign in to your account</p>
                </div>

                {successMessage && (
                    <div className="p-3 rounded bg-green-500/20 border border-green-500/50 text-green-200 text-sm text-center">
                        {successMessage}
                    </div>
                )}

                <form
                    action={async (formData) => {
                        "use server";
                        await signIn("credentials", {
                            ...Object.fromEntries(formData),
                            redirectTo: callbackUrl,
                        });
                    }}
                    className="mt-8 space-y-6"
                >
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="text-white">Email address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-white">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white border-none h-11 text-base">
                        Sign in
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-300">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-white font-semibold hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
