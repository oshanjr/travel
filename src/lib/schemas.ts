import { z } from "zod";

export const packageSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase, numbers, and hyphens only"),
    description: z.string().min(1, "Description is required"),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    durationDays: z.coerce.number().int().min(1, "Duration must be at least 1 day"),
    imageUrls: z.string().min(1, "At least one image URL is required").transform(val => JSON.stringify([val])), // Simplified for now: single URL input, stored as JSON array string
    isFeatured: z.boolean().default(false),
    availableDates: z.string().optional().transform(val => JSON.stringify(val ? [val] : [])), // Simplified: one date or empty
});

export type PackageFormValues = z.infer<typeof packageSchema>;
