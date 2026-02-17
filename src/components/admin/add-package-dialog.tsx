"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PackageForm } from "./package-form";
import { useState } from "react";
import { Plus } from "lucide-react";

export function AddPackageDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Package
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Package</DialogTitle>
                    <DialogDescription>
                        Create a new travel package here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <PackageForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
