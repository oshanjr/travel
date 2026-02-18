import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Admin Login</h2>
                    <p className="mt-2 text-sm text-gray-600">Sign in to access the dashboard</p>
                </div>

                <form
                    action={async (formData) => {
                        "use server";
                        await signIn("credentials", {
                            ...Object.fromEntries(formData),
                            redirectTo: "/admin",
                        });
                    }}
                    className="mt-8 space-y-6"
                >
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
                        Sign in
                    </Button>
                </form>
            </div>
        </div>
    );
}
