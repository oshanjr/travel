"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createCustomTripRequest(data: {
    customerName: string;
    customerEmail: string;
    guestCount: number;
    durationDays: number;
    destinations: string[];
    vehicleType: string;
    needsAccommodation: boolean;
    activitiesOfInterest?: string;
}) {
    try {
        await prisma.customTripRequest.create({
            data: {
                ...data,
                status: "PENDING",
            },
        });

        // Revalidate admin page so new requests show up
        revalidatePath("/admin/custom-requests");

        return { success: true };
    } catch (error) {
        console.error("Error creating custom trip request:", error);
        return { success: false, error: "Failed to submit request." };
    }
}
