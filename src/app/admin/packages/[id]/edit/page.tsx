import { getPackage } from "@/app/actions/packages";
import { PackageForm } from "@/components/admin/package-form";
import { notFound } from "next/navigation";

export default async function EditPackagePage({ params }: { params: { id: string } }) {
    const pkg = await getPackage(params.id);

    if (!pkg) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Package</h1>
            <PackageForm packageData={pkg} />
        </div>
    );
}
