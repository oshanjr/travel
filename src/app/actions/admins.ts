"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

export async function getAdmins() {
    return await prisma.user.findMany({
        where: {
            role: { in: ['ADMIN', 'SUPER_ADMIN'] }
        },
        orderBy: { createdAt: 'desc' }
    });
}

export async function createAdmin(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        throw new Error("Email and password required");
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: 'ADMIN',
        }
    });

    revalidatePath("/admin/admins");
}

export async function deleteAdmin(id: string) {
    // Prevent deleting Super Admin or self (simple check)
    // For now just delete
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/admins");
}
