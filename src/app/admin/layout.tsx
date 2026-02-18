import { Sidebar } from "@/components/admin/sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    // Double check role just in case middleware missed it or for safety
    if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
        // Create an Unauthorized page later or just redirect home
        redirect("/");
    }
    return (
        <div className="min-h-screen w-full bg-muted/40">
            <Sidebar />
            <div className="flex flex-col sm:pl-64">
                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
