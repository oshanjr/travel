"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPosts(publishedOnly = true) {
    return await prisma.blogPost.findMany({
        where: publishedOnly ? { published: true } : {},
        orderBy: { createdAt: 'desc' }
    });
}

export async function getPost(id: string) {
    return await prisma.blogPost.findUnique({
        where: { id }
    });
}

export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string;
    const author = formData.get("author") as string;
    const category = formData.get("category") as string;
    const published = formData.get("published") === "on";

    await prisma.blogPost.create({
        data: {
            title, slug, excerpt, content, image, author, category, published
        }
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    redirect("/admin/blog");
}

export async function updatePost(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string;
    const author = formData.get("author") as string;
    const category = formData.get("category") as string;
    const published = formData.get("published") === "on";

    await prisma.blogPost.update({
        where: { id },
        data: {
            title, slug, excerpt, content, image, author, category, published
        }
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    redirect("/admin/blog");
}

export async function deletePost(id: string) {
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
}
