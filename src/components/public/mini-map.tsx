"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Link from "next/link";

const geoUrl = "/lk-districts.json";

const districtProvince: Record<string, string> = {
  Colombo: "Western", Gampaha: "Western", Kalutara: "Western",
  Kandy: "Central", Matale: "Central", NuwaraEliya: "Central",
  Galle: "Southern", Matara: "Southern", Hambantota: "Southern",
  Jaffna: "Northern", Kilinochchi: "Northern", Mannar: "Northern",
  Vavuniya: "Northern", Mullaitivu: "Northern",
  Batticaloa: "Eastern", Ampara: "Eastern", Trincomalee: "Eastern",
  Kurunegala: "North Western", Puttalam: "North Western",
  Anuradhapura: "North Central", Polonnaruwa: "North Central",
  Badulla: "Uva", Moneragala: "Uva",
  Ratnapura: "Sabaragamuwa", Kegalle: "Sabaragamuwa",
};

const provinceColors: Record<string, string> = {
  "Western": "#D4AF37", "Central": "#B8860B", "Southern": "#C5B358",
  "Northern": "#E6C280", "Eastern": "#F3E5AB", "North Western": "#C5A059",
  "North Central": "#DAA520", "Uva": "#F5DEB3", "Sabaragamuwa": "#E8D8A6",
};

export function MiniMap() {
  return (
    <Link href="/explore" className="block group">
      <div className="relative rounded-3xl overflow-hidden bg-stone-900/40 border border-white/10 shadow-2xl hover:shadow-amber-500/10 hover:border-amber-400/30 transition-all duration-500 p-4">
        <div className="w-full max-w-[280px] mx-auto">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 6800, center: [80.7, 7.6] }}
            width={300}
            height={460}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => {
                  const province = districtProvince[geo.properties.NAME_1] ?? "Western";
                  const color = provinceColors[province] ?? "#D4AF37";
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={color}
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none", transition: "all 0.3s" },
                        hover: { outline: "none", fill: "#fbbf24", cursor: "pointer" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/5 transition-colors rounded-3xl flex items-end justify-center pb-4">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-white/0 group-hover:text-white/80 transition-colors bg-stone-950/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
            Click to Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}
