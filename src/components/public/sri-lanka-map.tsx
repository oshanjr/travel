"use client";

import React, { useState, useCallback } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Users, Compass, Mountain, Waves, Camera, ArrowRight } from "lucide-react";
import Link from "next/link";

const geoUrl = "/lk-districts.json";

// Province mapping (GADM NAME_1 → Province)
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

// Province → color
const provinceColors: Record<string, string> = {
  "Western":       "#065f46",
  "Central":       "#047857",
  "Southern":      "#0f766e",
  "Northern":      "#1d4ed8",
  "Eastern":       "#7c3aed",
  "North Western": "#b45309",
  "North Central": "#92400e",
  "Uva":           "#c2410c",
  "Sabaragamuwa":  "#166534",
};

// Display name mapping (GADM key → display name)
const displayNames: Record<string, string> = {
  NuwaraEliya: "Nuwara Eliya",
  Moneragala: "Monaragala",
};
const getDisplayName = (gadmName: string) => displayNames[gadmName] || gadmName;

// District metadata
const districtData: Record<string, {
  tagline: string;
  highlights: string[];
  icon: React.ElementType;
  bestFor: string;
}> = {
  Colombo:       { tagline: "The Vibrant Capital", highlights: ["Urban Culture", "Food Scene", "Colonial Architecture", "Shopping"], icon: Compass, bestFor: "City Break" },
  Gampaha:       { tagline: "Gateway to the West", highlights: ["Negombo Beach", "Fish Market", "Dutch Canal", "Temples"], icon: Waves, bestFor: "Beach & Culture" },
  Kalutara:      { tagline: "Golden Beaches & Temples", highlights: ["Kalutara Beach", "Rubber Plantations", "River Mouth", "Temple"], icon: Waves, bestFor: "Beach Retreat" },
  Kandy:         { tagline: "City of the Sacred Tooth", highlights: ["Temple of Tooth", "Peradeniya Gardens", "Kandy Lake", "Cultural Shows"], icon: Mountain, bestFor: "Cultural Heritage" },
  Matale:        { tagline: "Spice Capital of Sri Lanka", highlights: ["Spice Gardens", "Sigiriya nearby", "Dambulla Cave", "Forests"], icon: Mountain, bestFor: "Nature & Spice" },
  NuwaraEliya:   { tagline: "Little England in the Hills", highlights: ["Tea Estates", "Horton Plains", "Gregory Lake", "Waterfalls"], icon: Mountain, bestFor: "Hill Country" },
  Galle:         { tagline: "The Jewel of the South", highlights: ["Galle Fort", "Beaches", "Whale Watching", "Surfing"], icon: Waves, bestFor: "Heritage & Beach" },
  Matara:        { tagline: "Coastal Charm & Serenity", highlights: ["Mirissa Beach", "Star Fort", "Whales", "Parrot Rock"], icon: Waves, bestFor: "Whale Watching" },
  Hambantota:    { tagline: "Safari & Coastal Wildlife", highlights: ["Yala National Park", "Bundala", "Bird Sanctuary", "Sea Turtles"], icon: Camera, bestFor: "Wildlife Safari" },
  Jaffna:        { tagline: "The Northern Kingdom", highlights: ["Nallur Temple", "Jaffna Fort", "Island Hopping", "Cuisine"], icon: Compass, bestFor: "Cultural Discovery" },
  Kilinochchi:   { tagline: "Resilient Northern Town", highlights: ["Water Tower", "Iranamadu Tank", "Local Markets", "History"], icon: Compass, bestFor: "Off-beat Journey" },
  Mannar:        { tagline: "Island Paradise & Flamingos", highlights: ["Mannar Fort", "Flamingo Lagoons", "Adam's Bridge", "Baobab Tree"], icon: Waves, bestFor: "Birdwatching" },
  Vavuniya:      { tagline: "Northern Gateway", highlights: ["Madhu Church", "Cheddikulam Lake", "Buddhist Temples", "Trade Centre"], icon: Compass, bestFor: "Pilgrimage" },
  Mullaitivu:    { tagline: "Unspoilt Northern Coast", highlights: ["Pristine Beaches", "Lagoons", "Post-War Memorial", "Turtles"], icon: Waves, bestFor: "Secluded Beach" },
  Batticaloa:    { tagline: "Land of Singing Fish", highlights: ["Pasikuda Beach", "Batticaloa Lagoon", "Kallady Bridge", "Singing Fish"], icon: Waves, bestFor: "Pristine Beach" },
  Ampara:        { tagline: "Elephants & Ancient Ruins", highlights: ["Lahugala Elephants", "Panama Beach", "Arugam Bay", "Ruins"], icon: Camera, bestFor: "Surf & Wildlife" },
  Trincomalee:   { tagline: "Natural Harbour & Temples", highlights: ["Pigeon Island", "Marble Beach", "Koneswaram Temple", "Whale Sharks"], icon: Waves, bestFor: "Snorkelling" },
  Kurunegala:    { tagline: "The Rock City", highlights: ["Kurunegala Rock", "Ancient Capitals", "Buddhist Sites", "Markets"], icon: Mountain, bestFor: "History Seeker" },
  Puttalam:      { tagline: "Lagoons & Dutch Sights", highlights: ["Wilpattu National Park", "Mundal Lake", "Dutch Buildings", "Seafood"], icon: Camera, bestFor: "Wildlife" },
  Anuradhapura:  { tagline: "Ancient Capital of Sri Lanka", highlights: ["Sacred Bodhi Tree", "Ruwanwelisaya", "Moonstone", "Citadel"], icon: Mountain, bestFor: "World Heritage" },
  Polonnaruwa:   { tagline: "The Medieval Royal City", highlights: ["Gal Vihara", "Parakrama Samudra", "Audience Hall", "Ancient City"], icon: Mountain, bestFor: "Ancient City" },
  Badulla:       { tagline: "Waterfalls & Tea Country", highlights: ["Dunhinda Falls", "Ella Rock", "Nine Arch Bridge", "Tea Trails"], icon: Mountain, bestFor: "Trekking" },
  Moneragala:    { tagline: "Wild Uva Province", highlights: ["Maligawila Buddha", "Ravana Falls", "Peacock Hills", "Wild Elephants"], icon: Camera, bestFor: "Adventure" },
  Ratnapura:     { tagline: "City of Gems", highlights: ["Gem Mining", "Sinharaja Rainforest", "Bopath Falls", "Adam's Peak"], icon: Mountain, bestFor: "Gem & Rainforest" },
  Kegalle:       { tagline: "Pinnawala Elephant Country", highlights: ["Elephant Orphanage", "Batik Villages", "Rubber Estates", "Waterways"], icon: Camera, bestFor: "Elephant Encounter" },
};

export function SriLankaDistrictMap() {
  const [hoveredDistrict, setHoveredDistrict] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const selectedData = selectedDistrict ? districtData[selectedDistrict] : null;
  const SelectedIcon = selectedData?.icon ?? Compass;

  const stats = [
    { label: "Area", value: "65,610 km²", icon: Compass },
    { label: "Districts", value: "25", icon: MapPin },
    { label: "Population", value: "22M", icon: Users },
  ];

  return (
    <div
      className="relative w-full min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 flex flex-col overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />

      {/* ── Header ── */}
      <div className="relative z-10 text-center pt-24 md:pt-28 pb-2 px-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
          <span className="text-[0.55rem]">✦</span> Interactive Map
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-serif mb-2">
          Explore Sri Lanka
        </h1>
        <p className="text-emerald-200/60 text-sm max-w-md mx-auto">
          Click any district to discover its highlights and travel packages.
        </p>
      </div>

      {/* Stats */}
      <div className="relative z-10 flex flex-wrap justify-center gap-2 py-4 px-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1.5">
              <Icon className="h-3 w-3 text-amber-400" />
              <span className="text-white/90 text-[11px] font-medium">{s.value}</span>
              <span className="text-white/40 text-[11px]">{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* ── Map ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-2 sm:px-4 py-4 min-h-0">
        <div className="w-full max-w-lg mx-auto" style={{ aspectRatio: "3/4" }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 8000, center: [80.7, 7.85] }}
            className="w-full h-full"
            width={400}
            height={530}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => {
                  const gadmName: string = geo.properties.NAME_1;
                  const province = districtProvince[gadmName] ?? "Western";
                  const baseColor = provinceColors[province] ?? "#065f46";
                  const isHovered = hoveredDistrict === gadmName;
                  const isSelected = selectedDistrict === gadmName;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredDistrict(gadmName)}
                      onMouseLeave={() => setHoveredDistrict("")}
                      onClick={() => setSelectedDistrict(gadmName)}
                      fill={isSelected ? "#f59e0b" : isHovered ? "#fbbf24" : baseColor}
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth={0.6}
                      style={{
                        default: { outline: "none", transition: "all 0.25s ease" },
                        hover:   { outline: "none", cursor: "pointer", filter: "brightness(1.25)", strokeWidth: 1 },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>

      {/* Legend */}
      <div className="relative z-10 flex flex-wrap justify-center gap-x-4 gap-y-1 px-4 pb-6">
        {Object.entries(provinceColors).map(([prov, color]) => (
          <div key={prov} className="flex items-center gap-1.5 text-[10px] text-white/50">
            <div className="h-2 w-2 rounded-sm shrink-0" style={{ backgroundColor: color }} />
            {prov}
          </div>
        ))}
      </div>

      {/* ── Hover Tooltip (desktop only) ── */}
      <AnimatePresence>
        {hoveredDistrict && !selectedDistrict && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, scale: 0.85, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 6 }}
            transition={{ duration: 0.12 }}
            className="fixed z-[60] pointer-events-none hidden md:block"
            style={{ left: mousePos.x + 16, top: mousePos.y - 56 }}
          >
            <div className="bg-emerald-950/95 backdrop-blur-xl border border-white/15 text-white px-4 py-2.5 rounded-xl shadow-2xl">
              <p className="font-bold text-sm font-serif">{getDisplayName(hoveredDistrict)}</p>
              <p className="text-[10px] text-amber-400/90 font-medium">
                {districtData[hoveredDistrict]?.tagline ?? ""}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Detail Overlay ── */}
      <AnimatePresence>
        {selectedDistrict && selectedData && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
            style={{
              background: "rgba(6, 30, 20, 0.6)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            onClick={() => setSelectedDistrict(null)}
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/40 text-[10px] uppercase tracking-widest mb-4 shrink-0"
            >
              Tap anywhere to close
            </motion.p>

            <div
              className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero Card */}
              <motion.div
                initial={{ opacity: 0, rotateY: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 90, scale: 0.7 }}
                transition={{ duration: 0.55, type: "spring", stiffness: 100 }}
                className="col-span-2 md:col-span-1 md:row-span-2 bg-white/12 backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-white/10 border border-amber-400/30 flex items-center justify-center mb-4">
                    <SelectedIcon className="h-6 w-6 text-amber-400" />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mb-1">
                    {selectedData.bestFor}
                  </p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-serif mb-1">
                    {getDisplayName(selectedDistrict)}
                  </h2>
                  <p className="text-emerald-200/70 text-sm">{selectedData.tagline}</p>
                </div>
                <Link
                  href={`/packages?destination=${getDisplayName(selectedDistrict).toLowerCase()}`}
                  onClick={() => setSelectedDistrict(null)}
                  className="mt-5 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-semibold rounded-full px-5 py-2.5 text-sm transition-colors shadow-lg w-fit"
                >
                  View Packages <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* Highlight cards */}
              {selectedData.highlights.map((highlight, i) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, rotateY: 90, scale: 0.6 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: -90, scale: 0.6 }}
                  transition={{ duration: 0.5, delay: 0.08 * (i + 1), type: "spring", stiffness: 110 }}
                  className="bg-white/8 backdrop-blur-xl border border-white/12 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xl hover:bg-white/14 hover:border-amber-400/30 transition-all cursor-default"
                >
                  <div className="h-7 w-7 rounded-lg bg-amber-500/15 border border-amber-400/25 flex items-center justify-center mb-2">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                  </div>
                  <p className="text-white font-semibold font-serif text-sm sm:text-base">{highlight}</p>
                  <p className="text-white/30 text-[9px] uppercase tracking-wider mt-1">Must Visit</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ delay: 0.4 }}
              onClick={() => setSelectedDistrict(null)}
              className="mt-5 h-10 w-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all flex items-center justify-center shrink-0"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
