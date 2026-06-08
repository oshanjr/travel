import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";

export const metadata: Metadata = {
    title: "Travel Blog | A&S Pearl Lanka Tours",
    description: "Read the latest tips, guides, and stories about traveling in Sri Lanka.",
};

import { getPosts } from "@/app/actions/blog";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const posts = await getPosts(true);
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
                                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
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
