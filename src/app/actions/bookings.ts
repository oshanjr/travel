"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { BookingStatus } from "@prisma/client";

export async function getBookings() {
    return await prisma.booking.findMany({
        include: {
            user: { select: { name: true, email: true } },
            package: { select: { title: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
    await prisma.booking.update({
        where: { id },
        data: { status }
    });
    revalidatePath("/admin/bookings");
}
