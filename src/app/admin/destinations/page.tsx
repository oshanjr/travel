import { getDestinations, deleteDestination } from "@/app/actions/destinations";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash, Edit } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function DestinationsPage() {
    const destinations = await getDestinations();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Destinations</h1>
                <Button asChild>
                    <Link href="/admin/destinations/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Destination
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Tour Count</TableHead>
                            <TableHead>Order</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {destinations.map((dest) => (
                            <TableRow key={dest.id}>
                                <TableCell>
                                    <div className="relative h-12 w-20 rounded overflow-hidden">
                                        <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{dest.name}</TableCell>
                                <TableCell>{dest.tourCount}</TableCell>
                                <TableCell>{dest.order}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/admin/destinations/${dest.id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <form action={deleteDestination.bind(null, dest.id)}>
                                            <Button variant="ghost" size="icon" className="text-destructive">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {destinations.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No destinations found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
