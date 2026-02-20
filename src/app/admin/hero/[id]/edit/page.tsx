import { getHeroSlide } from "@/app/actions/hero";
import { HeroForm } from "@/components/admin/hero-form";
import { notFound } from "next/navigation";

export default async function EditHeroSlidePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const slide = await getHeroSlide(id);

    if (!slide) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Hero Slide</h1>
            <HeroForm slide={slide} />
        </div>
    );
}
