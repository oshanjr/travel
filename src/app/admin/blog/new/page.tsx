import { BlogForm } from "@/components/admin/blog-form";

export const metadata = {
    title: "New Post | Blog CMS",
};

export default function NewPostPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Create New Post</h2>
                <p className="text-muted-foreground">
                    Add a new story or guide to the blog.
                </p>
            </div>
            
            <BlogForm />
        </div>
    );
}
