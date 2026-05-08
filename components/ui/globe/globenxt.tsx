"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const World = dynamic(() => import("./globe").then((m) => m.World), {
  ssr: false,
});

export function GlobeNxt({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const isDark = (resolvedTheme ?? "light") === "dark";

  const globeConfig = {
    pointSize: 0.9,
    globeColor: isDark ? "#0a0b1f" : "#eef2ff",
    showAtmosphere: true,
    atmosphereColor: isDark ? "#a30098" : "#6366f1",
    atmosphereAltitude: 0.22,
    emissive: isDark ? "#11052a" : "#dbeafe",
    emissiveIntensity: isDark ? 0.45 : 0.22,
    shininess: 1.4,
    polygonColor: isDark
      ? "rgba(196, 181, 253, 0.55)"
      : "rgba(67, 56, 202, 0.45)",
    ambientLight: isDark ? "#c4b5fd" : "#ffffff",
    directionalLeftLight: isDark ? "#f472b6" : "#c7d2fe",
    directionalTopLight: isDark ? "#60a5fa" : "#ffffff",
    pointLight: "#a30098",
    arcTime: 2400,
    arcLength: 0.62,
    arcStroke: 0.55,
    rings: 2,
    maxRings: 3,
    hexPolygonResolution: 3,
    hexPolygonMargin: 0.58,
    labelColor: isDark ? "rgba(241, 245, 249, 0.95)" : "rgba(15, 23, 42, 0.85)",
    labelSize: 0.42,
    labelAltitude: 0.02,
    showLabels: true,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.35,
  };

  // Brand-aligned arc palette
  const colors = ["#a30098", "#60a5fa", "#f472b6", "#22d3ee", "#a78bfa"];

  const locations = {
    amsterdam: { name: "Amsterdam", lat: 52.3676, lng: 4.9041 },
    dubai: { name: "Dubai", lat: 25.2048, lng: 55.2708 },
    hongKong: { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
    london: { name: "London", lat: 51.5072, lng: -0.1276 },
    losAngeles: { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
    newYork: { name: "New York", lat: 40.7128, lng: -74.006 },
    paris: { name: "Paris", lat: 48.8566, lng: 2.3522 },
    shanghai: { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
    singapore: { name: "Singapore", lat: 1.3521, lng: 103.8198 },
    sydney: { name: "Sydney", lat: -33.8688, lng: 151.2093 },
    tokyo: { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  } as const;

  const routePairs = [
    ["london", "dubai", 0.18],
    ["dubai", "singapore", 0.22],
    ["singapore", "hongKong", 0.14],
    ["hongKong", "tokyo", 0.16],
    ["tokyo", "sydney", 0.2],
    ["amsterdam", "newYork", 0.25],
    ["newYork", "losAngeles", 0.14],
    ["losAngeles", "tokyo", 0.32],
    ["paris", "shanghai", 0.28],
    ["shanghai", "singapore", 0.16],
    ["london", "newYork", 0.22],
    ["hongKong", "london", 0.36],
  ] as const;

  const sampleArcs = routePairs.map(([startKey, endKey, arcAlt], index) => {
    const start = locations[startKey];
    const end = locations[endKey];

    return {
      order: index + 1,
      startName: start.name,
      startLat: start.lat,
      startLng: start.lng,
      endName: end.name,
      endLat: end.lat,
      endLng: end.lng,
      arcAlt,
      color: colors[index % colors.length],
    };
  });

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      {/* Soft radial halo behind the globe */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-1/2 aspect-square w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-3xl"
          style={{
            background: isDark
              ? "radial-gradient(circle at center, rgba(163,0,152,0.32) 0%, rgba(99,102,241,0.18) 38%, transparent 70%)"
              : "radial-gradient(circle at center, rgba(163,0,152,0.18) 0%, rgba(99,102,241,0.12) 38%, transparent 70%)",
          }}
        />
      </div>

      {/* Decorative concentric orbital rings (purely cosmetic) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeOut" },
            rotate: { duration: 60, ease: "linear", repeat: Infinity },
          }}
          className={cn(
            "aspect-square w-[92%] rounded-full border",
            isDark ? "border-white/[0.06]" : "border-foreground/[0.07]",
          )}
        />
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: -360 }}
          transition={{
            opacity: { duration: 1.4, delay: 0.1, ease: "easeOut" },
            rotate: { duration: 90, ease: "linear", repeat: Infinity },
          }}
          className={cn(
            "absolute aspect-square w-[104%] rounded-full border border-dashed",
            isDark ? "border-white/[0.04]" : "border-foreground/[0.05]",
          )}
        />
      </div>

      {/* Globe canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-20 h-full w-full"
      >
        <World data={sampleArcs} globeConfig={globeConfig} />
      </motion.div>

      {/* Bottom fade-out so the globe blends into the surrounding section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-24 select-none bg-gradient-to-b from-transparent to-background"
      />
    </div>
  );
}
