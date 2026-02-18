"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function getUserBookings() {
    const session = await auth();
    if (!session?.user?.email) return [];

    return await prisma.booking.findMany({
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
}
