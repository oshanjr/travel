"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createHeroSlide, updateHeroSlide } from "@/app/actions/hero";
import { HeroSlide } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

interface HeroFormProps {
    slide?: HeroSlide;
}

export function HeroForm({ slide }: HeroFormProps) {
    const isEdit = !!slide;
    const action = isEdit ? updateHeroSlide.bind(null, slide.id) : createHeroSlide;
    const [preview, setPreview] = useState(slide?.image || "");

    return (
        <form action={action} className="space-y-6 bg-white p-6 rounded-lg border shadow-sm max-w-xl">
            <div className="space-y-2">
                <Label htmlFor="image">Image URL (High Quality)</Label>
                <Input
                    id="image"
                    name="image"
                    required
                    defaultValue={slide?.image}
                    onChange={(e) => setPreview(e.target.value)}
                />
                {preview && (
                    <div className="relative h-48 w-full rounded-md overflow-hidden border mt-2">
                        <Image src={preview} alt="Preview" fill className="object-cover" />
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="title">Title (Optional)</Label>
                <Input id="title" name="title" defaultValue={slide?.title || ""} placeholder="e.g. Explore Sri Lanka" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle (Optional)</Label>
                <Input id="subtitle" name="subtitle" defaultValue={slide?.subtitle || ""} placeholder="e.g. The Pearl of the Indian Ocean" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="order">Order (Sort 0-99)</Label>
                <Input id="order" name="order" type="number" required defaultValue={slide?.order || 0} />
            </div>

            <div className="flex justify-end gap-2">
                <Button type="submit">{isEdit ? "Update Slide" : "Create Slide"}</Button>
            </div>
        </form>
    );
}
