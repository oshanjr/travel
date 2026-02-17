"use server";

import { PrismaClient } from "@prisma/client";
import { packageSchema, PackageFormValues } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getPackages() {
    try {
        const packages = await prisma.travelPackage.findMany({
            orderBy: { createdAt: "desc" },
        });
        return packages;
    } catch (error) {
        console.error("Failed to fetch packages:", error);
        return [];
    }
}

export async function createPackage(data: PackageFormValues) {
    try {
        // Validate again on server
        const validated = packageSchema.parse({
            ...data,
            // Transformations happen in schema
        });

        // We need to parse the JSON strings back to objects for Prisma if the schema transformation resulted in strings
        // Actually, Prisma expects Json type, which can be any JSON value.
        // However, our Zod schema transforms them to stringified JSON.
        // Let's adjust the logic to handle the specific Prisma input requirements.
        // The Zod schema transforms to stringified JSON, but we might want raw arrays for Prisma if we defined it as Json.
        // Let's refine the Zod schema or the parsing here. 
        // For simplicity in this step, let's assume the Zod schema prepares the data correctly or we adjust here.

        // Correction: the Zod schema returns stringified JSON for imageUrls and availableDates.
        // Prisma `Json` type accepts objects/arrays directly.

        // Let's rely on the input data being mostly correct but we might need to parse the JSON strings if Zod stringified them.
        // Wait, the Zod schema above transforms to `JSON.stringify(...)`. 
        // So `validated.imageUrls` is a string like '["url"]'.
        // Prisma `Json` field requires a JS object/array/primitive, NOT a JSON string (unless it's a string field).
        // In schema.prisma: `imageUrls Json`.
        // So we should parse it back.

        await prisma.travelPackage.create({
            data: {
                title: validated.title,
                slug: validated.slug,
                description: validated.description,
                price: validated.price,
                durationDays: validated.durationDays,
                imageUrls: JSON.parse(validated.imageUrls as string),
                isFeatured: validated.isFeatured,
                availableDates: JSON.parse(validated.availableDates as string),
            },
        });

        revalidatePath("/admin/packages");
        return { success: true };
    } catch (error) {
        console.error("Failed to create package:", error);
        return { success: false, error: "Failed to create package" };
    }
}
