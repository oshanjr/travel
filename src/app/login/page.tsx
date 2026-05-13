import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ success?: string, callbackUrl?: string, error?: string }> }) {
    const { success, callbackUrl: url, error } = await searchParams;
    const successMessage = success;
    const errorMessage = error === "CredentialsSignin" ? "Invalid email or password." : error;
    const callbackUrl = url || "/admin";

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-slate-900"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop')",
                }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
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
                {errorMessage && (
                    <div className="p-3 rounded bg-red-500/20 border border-red-500/50 text-red-200 text-sm text-center">
                        {errorMessage}
                    </div>
                )}

                <form
                    action={async (formData) => {
                        "use server";
                        try {
                            await signIn("credentials", {
                                ...Object.fromEntries(formData),
                                redirectTo: callbackUrl,
                            });
                        } catch (err) {
                            if (err instanceof AuthError) {
                                switch (err.type) {
                                    case 'CredentialsSignin':
                                        redirect(`/login?error=CredentialsSignin&callbackUrl=${callbackUrl}`);
                                    default:
                                        redirect(`/login?error=SomethingWentWrong&callbackUrl=${callbackUrl}`);
                                }
                            }
                            throw err;
                        }
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

                    <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white border-none h-11 text-base">
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
