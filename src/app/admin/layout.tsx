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
        <div className="flex min-h-screen w-full bg-muted/40">
            <Sidebar />
            <div className="flex flex-col flex-1 pl-64">
                {/* pl-64 pushes content right to accommodate fixed sidebar if needed, 
            but here sidebar is flex-col so it takes space. 
            However, Sidebar component uses absolute positioning? No, w-64. 
            Standard flex layout: 
        */}
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:ml-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
