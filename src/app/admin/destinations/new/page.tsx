import { DestinationForm } from "@/components/admin/destination-form";

export default function NewDestinationPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Add New Destination</h1>
            <DestinationForm />
        </div>
    );
}
