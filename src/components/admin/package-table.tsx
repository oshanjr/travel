import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Package } from "@prisma/client";

interface PackageTableProps {
    packages: Package[];
}

export function PackageTable({ packages }: PackageTableProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {packages.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No packages found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        packages.map((pkg) => (
                            <TableRow key={pkg.id}>
                                <TableCell className="font-medium">{pkg.title}</TableCell>
                                <TableCell>{pkg.slug}</TableCell>
                                <TableCell className="text-right">${Number(pkg.price).toFixed(2)}</TableCell>
                                <TableCell className="text-right">{pkg.duration}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
