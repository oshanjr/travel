"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPackage, updatePackage } from "@/app/actions/packages";
import { Package } from "@prisma/client";

interface PackageFormProps {
    packageData?: Package;
}

export function PackageForm({ packageData }: PackageFormProps) {
    const isEdit = !!packageData;
    const action = isEdit ? updatePackage.bind(null, packageData.id) : createPackage;

    // Helper to parse JSON fields safely for display
    const getJsonString = (json: any) => {
        if (!json) return "";
        if (typeof json === "string") return json;
        return JSON.stringify(json);
    };

    const getArrayString = (json: any) => {
        if (Array.isArray(json)) return json.join(", ");
        return "";
    };

    // Note: Prisma JSON types are strict. In DB it's Json. 
    // We assume it's array of strings for images/inclusions.

    return (
        <form action={action} className="space-y-6 bg-white p-6 rounded-lg border shadow-sm">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" required defaultValue={packageData?.title} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" name="slug" required defaultValue={packageData?.slug} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" name="price" type="number" step="0.01" required defaultValue={Number(packageData?.price)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" name="duration" required defaultValue={packageData?.duration} />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" required defaultValue={packageData?.location} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="images">Images (Comma separated URLs)</Label>
                <Input
                    id="images"
                    name="images"
                    defaultValue={getArrayString(packageData?.images)}
                    placeholder="/img1.jpg, /img2.jpg"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="inclusions">Inclusions (Comma separated)</Label>
                <Input
                    id="inclusions"
                    name="inclusions"
                    defaultValue={getArrayString(packageData?.inclusions)}
                    placeholder="Transport, Breakfast"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="itinerary">Itinerary (JSON)</Label>
                <textarea
                    id="itinerary"
                    name="itinerary"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder='[{"day": 1, "title": "Arrival", "description": "..."}]'
                    rows={5}
                    defaultValue={getJsonString(packageData?.itinerary)}
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    className="h-4 w-4"
                    defaultChecked={packageData?.isFeatured}
                />
                <Label htmlFor="isFeatured">Feature this package</Label>
            </div>

            <div className="flex justify-end gap-2">
                <Button type="submit">{isEdit ? "Update Package" : "Create Package"}</Button>
            </div>
        </form>
    );
}
