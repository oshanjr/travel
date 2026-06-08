"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function subscribeNewsletter(email: string) {
    if (!email || !email.includes("@")) {
        return { success: false, error: "Invalid email address" };
    }

    try {
        await prisma.subscriber.create({
            data: { email }
        });
        revalidatePath("/admin/subscribers");
        return { success: true };
    } catch (error: any) {
        if (error.code === 'P2002') {
            return { success: false, error: "You are already subscribed!" };
        }
        console.error("Error subscribing:", error);
        return { success: false, error: "Failed to subscribe" };
    }
}
