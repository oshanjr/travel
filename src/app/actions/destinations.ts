"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getDestinations() {
    return await prisma.destination.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function getDestination(id: string) {
    return await prisma.destination.findUnique({
        where: { id }
    });
}

export async function createDestination(formData: FormData) {
    const name = formData.get("name") as string;
    const image = formData.get("image") as string;
    const tourCount = formData.get("tourCount") as string;
    const order = Number(formData.get("order") || 0);

    await prisma.destination.create({
        data: {
            name,
            image,
            tourCount,
            order,
        }
    });

    revalidatePath("/admin/destinations");
    revalidatePath("/"); // Update home page carousel
    redirect("/admin/destinations");
}

export async function updateDestination(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const image = formData.get("image") as string;
    const tourCount = formData.get("tourCount") as string;
    const order = Number(formData.get("order") || 0);

    await prisma.destination.update({
        where: { id },
        data: {
            name,
            image,
            tourCount,
            order,
        }
    });

    revalidatePath("/admin/destinations");
    revalidatePath("/"); // Update home page carousel
    redirect("/admin/destinations");
}

export async function deleteDestination(id: string) {
    await prisma.destination.delete({ where: { id } });
    revalidatePath("/admin/destinations");
    revalidatePath("/");
}
