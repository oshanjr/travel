import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { revalidatePath } from "next/cache";

async function getConfigs() {
    return await prisma.siteConfig.findMany({
        orderBy: { key: 'asc' }
    });
}

async function updateConfig(formData: FormData) {
    "use server";
    const key = formData.get("key") as string;
    const value = formData.get("value") as string;

    await prisma.siteConfig.update({
        where: { key },
        data: { value }
    });

    revalidatePath("/admin/site-config");
    revalidatePath("/"); // Update home page
}

export default async function SiteConfigPage() {
    const configs = await getConfigs();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Site Configuration</h1>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Key</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead className="w-[100px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {configs.map((config) => (
                            <TableRow key={config.id}>
                                <TableCell className="font-medium font-mono text-xs">{config.key}</TableCell>
                                <TableCell className="text-xs text-muted-foreground">{config.type}</TableCell>
                                <TableCell>
                                    <form action={updateConfig} className="flex gap-2 items-center">
                                        <input type="hidden" name="key" value={config.key} />
                                        <Input
                                            name="value"
                                            defaultValue={config.value}
                                            className="h-8 max-w-lg"
                                        />
                                        <Button size="sm" type="submit">Save</Button>
                                    </form>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
