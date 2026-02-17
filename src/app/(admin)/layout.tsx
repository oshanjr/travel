import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, Package, Calendar, Users } from "lucide-react";

const sidebarNavItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Packages",
        href: "/admin/packages",
        icon: Package,
    },
    {
        title: "Bookings",
        href: "/admin/bookings",
        icon: Calendar,
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users,
    },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <div className="flex gap-2 font-bold text-xl">
                        <span>Admin Panel</span>
                    </div>
                    <UserButton afterSignOutUrl="/" />
                </div>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <nav className="grid items-start gap-2">
                        {sidebarNavItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            >
                                <item.icon className="mr-2 h-4 w-4" />
                                <span>{item.title}</span>
                            </Link>
                        ))}
                    </nav>
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
