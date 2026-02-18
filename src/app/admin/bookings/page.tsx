import { getBookings, updateBookingStatus } from "@/app/actions/bookings";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

export default async function BookingsPage() {
    const bookings = await getBookings();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Booking ID</TableHead>
                            <TableHead>Package</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell className="font-mono text-xs">{booking.id.slice(-8)}</TableCell>
                                <TableCell className="font-medium">{booking.package.title}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-sm">{booking.user.name || "Guest"}</span>
                                        <span className="text-xs text-muted-foreground">{booking.user.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs">
                                    {new Date(booking.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>${Number(booking.totalAmount)}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        booking.status === 'CONFIRMED' ? 'default' :
                                            booking.status === 'COMPLETED' ? 'secondary' :
                                                booking.status === 'CANCELLED' ? 'destructive' : 'outline'
                                    }>
                                        {booking.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {booking.status === 'PENDING' && (
                                        <div className="flex justify-end gap-2">
                                            <form action={updateBookingStatus.bind(null, booking.id, 'CONFIRMED')}>
                                                <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-green-600 border-green-200 hover:bg-green-50">
                                                    <CheckCircle className="h-4 w-4" />
                                                </Button>
                                            </form>
                                            <form action={updateBookingStatus.bind(null, booking.id, 'CANCELLED')}>
                                                <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50">
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {bookings.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                    No bookings yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
