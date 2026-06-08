import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const metadata = {
    title: "Inquiries | Admin Dashboard",
};

export default async function InquiriesPage() {
    const inquiries = await prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Inquiries</h2>
                <p className="text-muted-foreground">
                    View messages submitted through the contact form.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>
                        A list of all messages received from the public website.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Sender</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Message</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inquiries.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-6 text-slate-500">
                                            No inquiries found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    inquiries.map((inq) => (
                                        <TableRow key={inq.id}>
                                            <TableCell className="whitespace-nowrap text-sm text-slate-500">
                                                {format(inq.createdAt, "MMM d, yyyy")}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{inq.name}</div>
                                                {inq.email && <div className="text-xs text-muted-foreground">{inq.email}</div>}
                                                {inq.phone && <div className="text-xs text-muted-foreground">{inq.phone}</div>}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{inq.type}</Badge>
                                            </TableCell>
                                            <TableCell className="max-w-md">
                                                <p className="text-sm text-slate-700 whitespace-pre-wrap">{inq.message}</p>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
