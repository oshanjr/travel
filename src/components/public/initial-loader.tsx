"use client";

import { useEffect, useState } from "react";
import { Compass } from "lucide-react";

export function InitialLoader() {
  const [show, setShow] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoadedBefore");
    if (hasLoaded) {
      setShow(false);
    } else {
      // Simulate loading time, then fade out
      const timer1 = setTimeout(() => {
        setIsFading(true);
      }, 1500);

      const timer2 = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("hasLoadedBefore", "true");
      }, 2000); // 500ms after fade starts

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, []);

  if (!show) return null;

  return (
    <div 
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-50 space-y-6 transition-opacity duration-500 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="relative">
        <div className="absolute -inset-4 border-2 border-amber-300/40 rounded-full animate-ping [animation-duration:3s]" />
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
