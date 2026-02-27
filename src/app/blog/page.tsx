import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Travel Blog | Travel.lk",
    description: "Read the latest tips, guides, and stories about traveling in Sri Lanka.",
};

// Mock blog data
const posts = [
    {
        id: 1,
        title: "10 Must-Visit Beaches in Sri Lanka",
        excerpt: "From the golden sands of Mirissa to the surfing paradise of Arugam Bay, discover the best beaches Sri Lanka has to offer.",
        date: "October 12, 2026",
        image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        author: "Sarah Jenkins"
    },
    {
        id: 2,
        title: "A Foodie's Guide to Sri Lankan Curries",
        excerpt: "Spicy, aromatic, and incredibly diverse. Here's your ultimate guide to navigating the vibrant world of Sri Lankan cuisine.",
        date: "September 28, 2026",
        image: "https://images.unsplash.com/photo-1601314167099-232775b4dbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        author: "David Chen"
    },
    {
        id: 3,
        title: "Hiking the Knuckles Mountain Range",
        excerpt: "Everything you need to know about trekking through one of Sri Lanka's most rugged and beautiful landscapes.",
        date: "August 15, 2026",
        image: "https://images.unsplash.com/photo-1625736300986-caeb31998bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        author: "Kamal Perera"
    }
];

export default function BlogPage() {
    return (
        <main className="min-h-screen pt-28 pb-20 bg-slate-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Travel Blog</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Stories, tips, and guides to inspire your next Sri Lankan adventure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="text-sm text-slate-500 mb-3 flex items-center justify-between">
                                    <span>{post.date}</span>
                                    <span>By {post.author}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-3 line-clamp-2">
                                    <Link href={`/blog/${post.id}`} className="hover:text-blue-600 transition">
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-slate-600 mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <Link href={`/blog/${post.id}`} className="text-blue-600 font-semibold hover:text-blue-800 transition flex items-center gap-1">
                                    Read Full Story <span aria-hidden="true">&rarr;</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
