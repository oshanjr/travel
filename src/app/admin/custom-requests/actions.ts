"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function quoteCustomTripRequest(id: string, quotedPrice: string) {
    try {
        await prisma.customTripRequest.update({
            where: { id },
            data: {
                status: "QUOTED",
                quotedPrice: parseFloat(quotedPrice),
            },
        });

        // Add email notification logic here later

        revalidatePath("/admin/custom-requests");

        return { success: true };
    } catch (error) {
        console.error("Error quoting custom trip request:", error);
        return { success: false, error: "Failed to send quote." };
    }
}
