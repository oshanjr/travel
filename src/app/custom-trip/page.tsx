import { CustomTripForm } from "./form";

export const metadata = {
    title: "Custom Trip Builder | GoFly",
    description: "Build your dream custom itinerary for Sri Lanka.",
};

export default function CustomTripPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-12 md:py-24">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        Build Your Custom Trip
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Tell us exactly what you want, and we'll craft the perfect Sri Lankan experience just for you.
                    </p>
                </div>
                <CustomTripForm />
            </div>
        </main>
    );
}
