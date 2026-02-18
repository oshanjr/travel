import { PackageForm } from "@/components/admin/package-form";

export default function NewPackagePage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create New Package</h1>
            <PackageForm />
        </div>
    );
}
