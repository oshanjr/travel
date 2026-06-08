"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPost, updatePost } from "@/app/actions/blog";
import { useState } from "react";
import dynamic from "next/dynamic";
import { BlogPost } from "@prisma/client";

interface BlogFormProps {
    post?: BlogPost;
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export function BlogForm({ post }: BlogFormProps) {
    const isEdit = !!post;
    const action = isEdit ? updatePost.bind(null, post.id) : createPost;
    const [content, setContent] = useState(post?.content || "");

    return (
        <form action={action} className="space-y-6 bg-white p-6 rounded-lg border shadow-sm">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" required defaultValue={post?.title} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" name="slug" required defaultValue={post?.slug} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" name="author" required defaultValue={post?.author} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" required defaultValue={post?.category} />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Image (URL)</Label>
                <Input id="image" name="image" required defaultValue={post?.image} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <textarea
                    id="excerpt"
                    name="excerpt"
                    required
                    defaultValue={post?.excerpt}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown/Text)</Label>
                <div data-color-mode="light" className="border rounded-md overflow-hidden">
                    <MDEditor
                        value={content}
                        onChange={(val) => setContent(val || "")}
                        height={400}
                        preview="edit"
                    />
                </div>
                <input type="hidden" name="content" value={content} />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="published"
                    name="published"
                    className="h-4 w-4"
                    defaultChecked={post?.published ?? true}
                />
                <Label htmlFor="published">Published</Label>
            </div>

            <div className="flex justify-end gap-2">
                <Button type="submit">{isEdit ? "Update Post" : "Create Post"}</Button>
            </div>
        </form>
    );
}
