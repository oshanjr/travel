"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getHeroSlides() {
    return await prisma.heroSlide.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function getHeroSlide(id: string) {
    return await prisma.heroSlide.findUnique({
        where: { id }
    });
}

export async function createHeroSlide(formData: FormData) {
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const image = formData.get("image") as string;
    const order = Number(formData.get("order") || 0);

    await prisma.heroSlide.create({
        data: {
            title,
            subtitle,
            image,
            order,
        }
    });

    revalidatePath("/admin/hero");
    revalidatePath("/");
    redirect("/admin/hero");
}

export async function updateHeroSlide(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const image = formData.get("image") as string;
    const order = Number(formData.get("order") || 0);

    await prisma.heroSlide.update({
        where: { id },
        data: {
            title,
            subtitle,
            image,
            order,
        }
    });

    revalidatePath("/admin/hero");
    revalidatePath("/");
    redirect("/admin/hero");
}

export async function deleteHeroSlide(id: string) {
    await prisma.heroSlide.delete({ where: { id } });
    revalidatePath("/admin/hero");
    revalidatePath("/");
}
