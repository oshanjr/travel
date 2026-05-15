import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";

export const metadata: Metadata = {
    title: "Travel Blog | A&S Pearl Lanka Tours",
    description: "Read the latest tips, guides, and stories about traveling in Sri Lanka.",
};

// Mock blog data
const posts = [
    {
        id: 1,
        title: "10 Must-Visit Beaches in Sri Lanka",
        excerpt: "From the golden sands of Mirissa to the surfing paradise of Arugam Bay, discover the best beaches Sri Lanka has to offer.",
        date: "October 12, 2026",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        author: "Sarah Jenkins",
        category: "Beaches",
    },
    {
        id: 2,
        title: "A Foodie's Guide to Sri Lankan Curries",
        excerpt: "Spicy, aromatic, and incredibly diverse. Here's your ultimate guide to navigating the vibrant world of Sri Lankan cuisine.",
        date: "September 28, 2026",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        author: "David Chen",
        category: "Food & Culture",
    },
    {
        id: 3,
        title: "Hiking the Knuckles Mountain Range",
        excerpt: "Everything you need to know about trekking through one of Sri Lanka's most rugged and beautiful landscapes.",
        date: "August 15, 2026",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        author: "Kamal Perera",
        category: "Hiking",
    },
    {
        id: 4,
        title: "Exploring the Ancient City of Sigiriya",
        excerpt: "Rise before dawn and climb the legendary Lion Rock to witness a sunrise you will never forget. Here's our complete guide.",
        date: "July 3, 2026",
        image: "https://images.unsplash.com/photo-1588598198321-9735fd52e0c3?auto=format&fit=crop&w=800&q=80",
        author: "Amara Silva",
        category: "Heritage",
    },
    {
        id: 5,
        title: "Wildlife Safari at Yala National Park",
        excerpt: "Yala is home to the world's highest density of leopards. Here's how to make the most of your safari experience.",
        date: "June 20, 2026",
        image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80",
        author: "Ravi Mendis",
        category: "Wildlife",
    },
    {
        id: 6,
        title: "The Perfect Ceylon Tea Experience",
        excerpt: "Wander through the emerald hills of Nuwara Eliya and discover the story behind every cup of Ceylon tea.",
        date: "May 8, 2026",
        image: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&w=800&q=80",
        author: "Priya Fernando",
        category: "Culture",
    },
];

export default function BlogPage() {
    return (
        <main className="min-h-screen relative overflow-x-hidden">
            {/* Full-page background image */}
            <div
                className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/bg-blog.png')" }}
            />
            {/* Dark tint overlay */}
            <div className="fixed inset-0 -z-10 bg-stone-950/70" />

            {/* Hero */}
            <section className="pt-36 pb-20 text-center px-4">
                <FadeIn>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
                        <span className="text-[0.55rem]">✦</span> Stories & Guides
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4 drop-shadow-xl">
                        Travel Blog
                    </h1>
                    <p className="text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed">
                        Stories, tips, and guides to inspire your next Sri Lankan adventure.
                    </p>
                </FadeIn>
            </section>

            {/* Blog grid */}
            <div className="container mx-auto px-4 max-w-6xl pb-28">
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <StaggerItem key={post.id}>
                        <article
                            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-xl shadow-black/20 hover:bg-white/15 hover:border-amber-400/40 hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-500 group"
                        >
                            {/* Image */}
                            <div className="relative h-52 w-full overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
                                <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-amber-500 text-stone-950 px-3 py-1 rounded-full">
                                    {post.category}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="text-xs text-stone-400 mb-3 flex items-center justify-between">
                                    <span>{post.date}</span>
                                    <span>By {post.author}</span>
                                </div>
                                <h2 className="text-xl font-bold text-white font-serif mb-3 line-clamp-2 group-hover:text-amber-300 transition-colors">
                                    <Link href={`/blog/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-stone-300 text-sm mb-5 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <Link
                                    href={`/blog/${post.id}`}
                                    className="inline-flex items-center gap-1.5 text-amber-400 font-semibold text-sm hover:text-amber-300 transition-colors"
                                >
                                    Read Full Story <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </article>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </main>
    );
}
