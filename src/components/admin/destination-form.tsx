"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createDestination, updateDestination } from "@/app/actions/destinations";
import { Destination } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

interface DestinationFormProps {
    destination?: Destination;
}

export function DestinationForm({ destination }: DestinationFormProps) {
    const isEdit = !!destination;
    const action = isEdit ? updateDestination.bind(null, destination.id) : createDestination;
    const [preview, setPreview] = useState(destination?.image || "");

    return (
        <form action={action} className="space-y-6 bg-white p-6 rounded-lg border shadow-sm max-w-xl">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required defaultValue={destination?.name} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                    id="image"
                    name="image"
                    required
                    defaultValue={destination?.image}
                    onChange={(e) => setPreview(e.target.value)}
                />
                {preview && (
                    <div className="relative h-48 w-full rounded-md overflow-hidden border mt-2">
                        <Image src={preview} alt="Preview" fill className="object-cover" />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="tourCount">Tour Count Label</Label>
                    <Input id="tourCount" name="tourCount" required defaultValue={destination?.tourCount} placeholder="e.g. 25 Tours" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="order">Order</Label>
                    <Input id="order" name="order" type="number" required defaultValue={destination?.order || 0} />
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button type="submit">{isEdit ? "Update Destination" : "Create Destination"}</Button>
            </div>
        </form>
    );
}
