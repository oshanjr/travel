import { createAdmin, deleteAdmin, getAdmins } from "@/app/actions/admins";
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
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Trash, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function AdminsPage() {
    const session = await auth();

    // Strict Super Admin Check
    if (session?.user?.role !== 'SUPER_ADMIN') {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
                <Shield className="h-16 w-16 text-gray-300" />
                <h2 className="text-xl font-bold">Access Denied</h2>
                <p className="text-muted-foreground">Only Super Admins can manage administrators.</p>
            </div>
        );
    }

    const admins = await getAdmins();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Manage Administrators</h1>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Create Admin Form */}
                <div className="md:col-span-1">
                    <div className="rounded-lg border bg-white p-6 shadow-sm">
                        <h3 className="font-semibold mb-4">Add New Admin</h3>
                        <form action={createAdmin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" placeholder="John Doe" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="admin@travel.lk" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">Create Admin</Button>
                        </form>
                    </div>
                </div>

                {/* Admins List */}
                <div className="md:col-span-2 rounded-md border bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {admins.map((admin) => (
                                <TableRow key={admin.id}>
                                    <TableCell className="font-medium">{admin.name}</TableCell>
                                    <TableCell>{admin.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={admin.role === 'SUPER_ADMIN' ? 'default' : 'secondary'}>
                                            {admin.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {admin.role !== 'SUPER_ADMIN' && admin.id !== session.user.id && (
                                            <form action={deleteAdmin.bind(null, admin.id)}>
                                                <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive/90">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
