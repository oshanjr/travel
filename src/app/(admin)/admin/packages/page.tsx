import { getPackages } from "@/app/actions/packages";
import { AddPackageDialog } from "@/components/admin/add-package-dialog";
import { PackageTable } from "@/components/admin/package-table";

export default async function PackagesPage() {
    const packages = await getPackages();

    return (
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-lg md:text-2xl">Packages</h1>
                <AddPackageDialog />
            </div>
            <PackageTable packages={packages} />
        </div>
    );
}
