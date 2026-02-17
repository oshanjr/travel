import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <div className="mr-4 hidden md:flex">
                        <Link href="/" className="mr-6 flex items-center space-x-2">
                            <span className="hidden font-bold sm:inline-block">
                                Travel Agency
                            </span>
                        </Link>
                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            <Link
                                href="/packages"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                            >
                                Packages
                            </Link>
                            <Link
                                href="/about"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                            >
                                About
                            </Link>
                        </nav>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <div className="w-full flex-1 md:w-auto md:flex-none">
                            {/* Add search here later if needed */}
                        </div>
                        <nav className="flex items-center space-x-2">
                            <UserButton afterSignOutUrl="/" />
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/sign-in">Sign In</Link>
                            </Button>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="py-6 md:px-8 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by Travel Agency.
                    </p>
                </div>
            </footer>
        </div>
    );
}
