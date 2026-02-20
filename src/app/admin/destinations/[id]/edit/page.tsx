import { getDestination } from "@/app/actions/destinations";
import { DestinationForm } from "@/components/admin/destination-form";
import { notFound } from "next/navigation";

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const destination = await getDestination(id);

    if (!destination) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Destination</h1>
            <DestinationForm destination={destination} />
        </div>
    );
}
