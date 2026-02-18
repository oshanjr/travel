"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

export async function getPackages() {
    return await prisma.package.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function getPackage(id: string) {
    return await prisma.package.findUnique({
        where: { id }
    });
}

export async function getPackageBySlug(slug: string) {
    return await prisma.package.findUnique({
        where: { slug }
    });
}

export async function createPackage(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const price = formData.get("price") as string;
    const duration = formData.get("duration") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string; // Not in schema explicitly? 
    // Wait, schema: title, slug, price, discountPrice, duration, location, images, itinerary, inclusions, isFeatured.
    // Missing description in schema? Spec said "Package: id, title, slug...". 
    // Wait, Spec V2 "Package: ... images(JSON), itinerary(JSON), inclusions(JSON), isFeatured".
    // It didn't list 'description'. But 'itinerary' usually covers detail. 
    // Let's assume we stick to schema. If needed, I'll add description to schema later.
    // Converting FormData to correct types

    const images = (formData.get("images") as string).split(',').map(s => s.trim()).filter(Boolean);
    const inclusions = (formData.get("inclusions") as string).split(',').map(s => s.trim()).filter(Boolean);

    // Itinerary is complex JSON. For now, expecting valid JSON string or empty array.
    let itinerary = [];
    try {
        itinerary = JSON.parse(formData.get("itinerary") as string || "[]");
    } catch (e) {
        console.error("Invalid itinerary JSON", e);
    }

    await prisma.package.create({
        data: {
            title,
            slug,
            price: new Prisma.Decimal(price),
            duration,
            location,
            images: images as Prisma.InputJsonValue,
            inclusions: inclusions as Prisma.InputJsonValue,
            itinerary: itinerary as Prisma.InputJsonValue,
            isFeatured: formData.get("isFeatured") === "on",
        }
    });

    revalidatePath("/admin/packages");
    redirect("/admin/packages");
}

export async function deletePackage(id: string) {
    await prisma.package.delete({ where: { id } });
    revalidatePath("/admin/packages");
}

export async function updatePackage(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const price = formData.get("price") as string;
    const duration = formData.get("duration") as string;
    const location = formData.get("location") as string;

    const images = (formData.get("images") as string).split(',').map(s => s.trim()).filter(Boolean);
    const inclusions = (formData.get("inclusions") as string).split(',').map(s => s.trim()).filter(Boolean);

    let itinerary = [];
    try {
        itinerary = JSON.parse(formData.get("itinerary") as string || "[]");
    } catch (e) {
        console.error("Invalid itinerary JSON", e);
    }

    await prisma.package.update({
        where: { id },
        data: {
            title,
            slug,
            price: new Prisma.Decimal(price),
            duration,
            location,
            images: images as Prisma.InputJsonValue,
            inclusions: inclusions as Prisma.InputJsonValue,
            itinerary: itinerary as Prisma.InputJsonValue,
            isFeatured: formData.get("isFeatured") === "on",
        }
    });

    revalidatePath("/admin/packages");
    redirect("/admin/packages");
}
