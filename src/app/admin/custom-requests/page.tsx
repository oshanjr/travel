import { prisma } from "@/lib/db";
import { QuoteDialog } from "./quote-dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata = {
    title: "Custom Trip Requests | Admin Dashboard",
};

export default async function CustomRequestsPage() {
    const requests = await prisma.customTripRequest.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Custom Trip Requests</h2>
                <p className="text-muted-foreground">
                    Manage and quote custom itineraries requested by customers.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Requests</CardTitle>
                    <CardDescription>
                        A list of all custom trip requests. Status indicates whether a quote has been sent.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requests.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-6 text-slate-500">
                                            No custom requests found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    requests.map((req) => (
                                        <TableRow key={req.id}>
                                            <TableCell className="whitespace-nowrap text-sm">
                                                {format(req.createdAt, "MMM d, yyyy")}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{req.customerName}</div>
                                                <div className="text-xs text-muted-foreground">{req.customerEmail}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    {req.guestCount} Guests, {req.durationDays} Days
                                                </div>
                                                <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                    {(req.destinations as string[]).join(", ")}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        req.status === "PENDING"
                                                            ? "destructive"
                                                            : req.status === "QUOTED"
                                                                ? "default"
                                                                : "outline" // ACCEPTED
                                                    }
                                                    className={
                                                        req.status === "PENDING"
                                                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200"
                                                            : req.status === "QUOTED"
                                                                ? "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200"
                                                                : "bg-green-100 text-green-800 hover:bg-green-200 border-green-200"
                                                    }
                                                >
                                                    {req.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <QuoteDialog request={req} />
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
