import { Compass } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-50/80 backdrop-blur-sm space-y-6">
      <div className="relative">
        {/* Outer glowing ring */}
        <div className="absolute -inset-4 border-2 border-amber-300/40 rounded-full animate-ping [animation-duration:3s]" />
        
        {/* Inner spinning compass */}
        <div className="h-16 w-16 bg-stone-950 rounded-full flex items-center justify-center shadow-xl border border-amber-500/20">
          <Compass className="h-8 w-8 text-amber-500 animate-spin [animation-duration:2.5s]" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-stone-800 font-serif text-xl tracking-wide animate-pulse">
          A&S Pearl Lanka
        </p>
        <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mt-1 animate-pulse [animation-delay:100ms]">
          Preparing your journey...
        </p>
      </div>
    </div>
  );
}
