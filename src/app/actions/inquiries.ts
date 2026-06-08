"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitInquiry(data: { name: string; email: string; message: string }) {
    try {
        await prisma.inquiry.create({
            data: {
                name: data.name,
                email: data.email,
                message: data.message,
                type: "GENERAL"
            }
        });
        revalidatePath("/admin/inquiries");
        return { success: true };
    } catch (error) {
        console.error("Error submitting inquiry:", error);
        return { success: false, error: "Failed to submit inquiry" };
    }
}
