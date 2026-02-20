import { getPackage } from "@/app/actions/packages";
import { PackageForm } from "@/components/admin/package-form";
import { notFound } from "next/navigation";

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pkg = await getPackage(id);

    if (!pkg) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Package</h1>
            <h1 className="text-2xl font-bold mb-6">Edit Package</h1>
            <PackageForm packageData={{
                ...pkg,
                price: Number(pkg.price),
                // Ensure other Decimal fields are handled if added later
            }} />
        </div>
    );
}
