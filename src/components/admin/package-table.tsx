import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TravelPackage } from "@prisma/client";

interface PackageTableProps {
    packages: TravelPackage[];
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
                        <TableHead className="text-right">Duration (Days)</TableHead>
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
                                <TableCell className="text-right">{pkg.durationDays}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
