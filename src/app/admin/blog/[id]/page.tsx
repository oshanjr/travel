import { prisma } from "@/lib/db";
import { BlogForm } from "@/components/admin/blog-form";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Edit Post | Blog CMS",
};

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const post = await prisma.blogPost.findUnique({
        where: { id: params.id }
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Edit Post</h2>
                <p className="text-muted-foreground">
                    Update the contents of this blog post.
                </p>
            </div>
            
            <BlogForm post={post} />
        </div>
    );
}
