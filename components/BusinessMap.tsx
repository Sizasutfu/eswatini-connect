"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";

// Order matters: Leaflet base CSS, then the default-icon compatibility CSS.
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import type { Business } from "@/lib/types";

interface Props {
  businesses: Business[];
  /** Called when the user clicks "Open details" — optional */
  className?: string;
}

/* ---------- Tile providers ---------- */
const TILES = {
  light: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
};

/* Eswatini center + default zoom */
const ESWATINI_CENTER: [number, number] = [-26.5225, 31.4659];
const DEFAULT_ZOOM = 8;

/**
 * Fits the map bounds to include every marker whenever the list changes.
 * Must be a child of <MapContainer>.
 */
function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 13);
      return;
    }
    const bounds = L.latLngBounds(points.map(([lat, lng]) => L.latLng(lat, lng)));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
  }, [map, points]);

  return null;
}

export default function BusinessMap({ businesses, className }: Props) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const tile = isDark ? TILES.dark : TILES.light;

  // Stable array of [lat, lng] for FitBounds
  const points = useMemo<[number, number][]>(
    () => businesses.map((b) => [b.lat, b.lng]),
    [businesses]
  );

  // Key forces the TileLayer to remount when the theme flips,
  // which makes the new tile URL take effect immediately.
  const layerKey = isDark ? "dark" : "light";

  return (
    <div
      className={
        "relative w-full rounded-brand-lg overflow-hidden border " +
        "border-brand-line dark:border-night-line " +
        "bg-brand-soft dark:bg-night-elevated " +
        (className ?? "")
      }
      style={{ height: "min(70vh, 620px)", minHeight: 380 }}
    >
      <MapContainer
        center={ESWATINI_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
        className="absolute inset-0 w-full h-full z-0"
        worldCopyJump
      >
        <TileLayer key={layerKey} attribution={tile.attribution} url={tile.url} />

        <FitBounds points={points} />

        {businesses.map((b) => (
          <Marker key={b.id} position={[b.lat, b.lng]}>
            <Popup className="business-map-popup" maxWidth={280} minWidth={220}>
              <div className="p-0.5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-brand-green mb-1">
                  {b.category}
                </p>
                <h3 className="text-sm font-bold text-brand-ink leading-snug mb-1">
                  {b.name}
                </h3>
                <p className="text-xs text-brand-muted mb-2">{b.location}</p>
                <p className="text-xs text-brand-body leading-relaxed mb-3 line-clamp-3">
                  {b.shortDesc}
                </p>
                <Link
                  href={`/business/${b.slug}`}
                  className="inline-block text-xs font-semibold text-brand-green hover:text-brand-greenDark"
                >
                  View details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}