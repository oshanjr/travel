import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { updateSiteConfig } from "@/app/actions/cms";

async function getConfigs() {
    return await prisma.siteConfig.findMany({
        orderBy: { key: 'asc' }
    });
}

export default async function CMSPage() {
    const configs = await getConfigs();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Content Management System</h1>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Key</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead className="w-[100px] text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {configs.map((config) => (
                            <TableRow key={config.id}>
                                <TableCell className="font-mono text-xs font-medium">{config.key}</TableCell>
                                <TableCell className="text-xs text-muted-foreground">{config.type}</TableCell>
                                <TableCell className="max-w-md truncate" title={config.value}>
                                    {config.value}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4 mr-2" /> Edit
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit {config.key}</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to the content here. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form action={async (formData) => {
                                                "use server";
                                                const value = formData.get("value") as string;
                                                await updateSiteConfig(config.key, value);
                                            }}>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="value" className="text-right">
                                                            Value
                                                        </Label>
                                                        <Input
                                                            id="value"
                                                            name="value"
                                                            defaultValue={config.value}
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button type="submit">Save changes</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
