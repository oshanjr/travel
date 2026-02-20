"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getUserBookings() {
    const session = await auth();
    console.log("getUserBookings Session:", session?.user?.email);
    if (!session?.user?.email) return [];

    const bookings = await prisma.booking.findMany({
        where: {
            user: {
                email: session.user.email
            }
        },
        include: {
            package: {
                select: {
                    title: true,
                    slug: true,
                    images: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    console.log("getUserBookings Found:", bookings.length);
    return bookings;
}

export async function createBooking(formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }

    const packageId = formData.get("packageId") as string;
    const date = formData.get("date") as string;
    const guests = Number(formData.get("guests"));
    const totalAmount = Number(formData.get("totalAmount"));

    // Find the user id
    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user) {
        throw new Error("User not found");
    }

    const booking = await prisma.booking.create({
        data: {
            userId: user.id,
            packageId: packageId,
            date: new Date(date),
            guests: guests,
            totalAmount: totalAmount,
            status: "CONFIRMED", // Simulating instant confirmation
        }
    });

    redirect(`/bookings/success?id=${booking.id}`);
}

// Admin Actions

export async function getBookings() {
    // In a real app, verify admin role here
    const session = await auth();
    // if (session?.user?.role !== 'ADMIN' && session?.user?.role !== 'SUPER_ADMIN') return [];

    return await prisma.booking.findMany({
        include: {
            user: true,
            package: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
}

export async function updateBookingStatus(id: string, status: any) { // Using any to avoid enum import issues conform to string in component
    // Verify admin
    const session = await auth();
    // if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    //     throw new Error("Unauthorized");
    // }

    await prisma.booking.update({
        where: { id },
        data: { status }
    });

    revalidatePath("/admin/bookings");
}
