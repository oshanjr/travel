import { getHeroSlides, deleteHeroSlide } from "@/app/actions/hero";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash, Edit, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function HeroPage() {
    const slides = await getHeroSlides();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Hero Slides (Backgrounds)</h1>
                <Button asChild>
                    <Link href="/admin/hero/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Slide
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Title/Subtitle</TableHead>
                            <TableHead>Order</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {slides.map((slide) => (
                            <TableRow key={slide.id}>
                                <TableCell>
                                    <div className="relative h-12 w-20 rounded overflow-hidden bg-gray-100">
                                        <Image src={slide.image} alt="Slide" fill className="object-cover" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{slide.title || "No Title"}</span>
                                        <span className="text-xs text-muted-foreground">{slide.subtitle}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{slide.order}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/admin/hero/${slide.id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <form action={deleteHeroSlide.bind(null, slide.id)}>
                                            <Button variant="ghost" size="icon" className="text-destructive">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {slides.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                    No slides found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
