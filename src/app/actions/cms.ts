"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateSiteConfig(key: string, value: string) {
    await prisma.siteConfig.update({
        where: { key },
        data: { value }
    });

    revalidatePath("/admin/cms");
    revalidatePath("/"); // Update home page
}
