import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = {
    title: "Subscribers | Admin Dashboard",
};

export default async function SubscribersPage() {
    const subscribers = await prisma.subscriber.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Newsletter Subscribers</h2>
                <p className="text-muted-foreground">
                    View and manage users who have subscribed to the newsletter.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Subscribers</CardTitle>
                    <CardDescription>
                        A list of all email addresses subscribed to your newsletter.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Email Address</TableHead>
                                    <TableHead>Subscribed On</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subscribers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={2} className="text-center py-6 text-slate-500">
                                            No subscribers found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    subscribers.map((sub) => (
                                        <TableRow key={sub.id}>
                                            <TableCell className="font-medium">
                                                {sub.email}
                                            </TableCell>
                                            <TableCell className="text-sm text-slate-500">
                                                {format(sub.createdAt, "MMM d, yyyy")}
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
