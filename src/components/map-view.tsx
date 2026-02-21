"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";

interface Coords {
    lat: number;
    lng: number;
}

interface MapPickerProps {
    initialCoords: Coords;
    onCoordsChange: (coords: Coords) => void;
}

// Draggable single-marker map for report form
export function MapPicker({ initialCoords, onCoordsChange }: MapPickerProps) {
    const mapRef = useRef<LeafletMap | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        // Dynamic import to avoid SSR
        import("leaflet").then((L) => {
            // Fix default icons
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            });

            const map = L.map(containerRef.current!, {
                center: [initialCoords.lat, initialCoords.lng],
                zoom: 15,
                zoomControl: true,
            });

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);

            const greenIcon = L.divIcon({
                className: "",
                html: `<div style="
          width:36px;height:36px;
          background:#16a34a;border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          border:3px solid white;
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
          display:flex;align-items:center;justify-content:center;
        "></div>`,
                iconSize: [36, 36],
                iconAnchor: [18, 36],
            });

            const marker = L.marker([initialCoords.lat, initialCoords.lng], {
                draggable: true,
                icon: greenIcon,
            }).addTo(map);

            marker.on("dragend", () => {
                const pos = marker.getLatLng();
                onCoordsChange({ lat: pos.lat, lng: pos.lng });
            });

            mapRef.current = map;
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-64 rounded-xl overflow-hidden border border-border/60 shadow-sm z-0"
        />
    );
}


// ─── Public Map (all reports) ───────────────────────────────────────────────

export interface Report {
    id: string;
    lat: number;
    lng: number;
    status: "pending" | "diproses" | "selesai";
    deskripsi: string;
    foto?: string;
    tanggal: string;
    lokasi?: string;
}

interface PublicMapProps {
    reports: Report[];
    filterStatus?: string;
}

const statusColors: Record<string, string> = {
    pending: "#ef4444",
    diproses: "#f59e0b",
    selesai: "#22c55e",
};

const statusLabels: Record<string, string> = {
    pending: "Pending",
    diproses: "Diproses",
    selesai: "Selesai",
};

export function PublicMap({ reports, filterStatus = "semua" }: PublicMapProps) {
    const mapRef = useRef<LeafletMap | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const filtered = filterStatus === "semua"
        ? reports
        : reports.filter((r) => r.status === filterStatus);

    useEffect(() => {
        if (!containerRef.current) return;

        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }

        import("leaflet").then((L) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            });

            const center = filtered.length > 0
                ? { lat: filtered[0].lat, lng: filtered[0].lng }
                : { lat: -6.2088, lng: 106.8456 };

            const map = L.map(containerRef.current!, {
                center: [center.lat, center.lng],
                zoom: 13,
            });

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);

            filtered.forEach((report) => {
                const color = statusColors[report.status] || "#6b7280";
                const label = statusLabels[report.status] || report.status;

                const icon = L.divIcon({
                    className: "",
                    html: `<div style="
            width:32px;height:32px;
            background:${color};
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            border:3px solid white;
            box-shadow:0 2px 8px rgba(0,0,0,0.35);
          "></div>`,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -36],
                });

                const foto = report.foto
                    ? `<img src="${report.foto}" alt="Foto laporan" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px;" />`
                    : "";

                const badgeColor = {
                    pending: "#fee2e2",
                    diproses: "#fef3c7",
                    selesai: "#dcfce7",
                }[report.status] || "#f3f4f6";

                const badgeText = {
                    pending: "#b91c1c",
                    diproses: "#92400e",
                    selesai: "#15803d",
                }[report.status] || "#374151";

                const popup = `
          <div style="min-width:220px;font-family:system-ui,sans-serif;">
            ${foto}
            <div style="margin-bottom:8px;">
              <span style="
                background:${badgeColor};color:${badgeText};
                padding:2px 10px;border-radius:99px;font-size:11px;font-weight:700;
              ">${label}</span>
            </div>
            <p style="font-size:13px;color:#374151;margin:0 0 6px;line-height:1.5;">
              ${report.deskripsi}
            </p>
            ${report.lokasi ? `<p style="font-size:11px;color:#6b7280;margin:0 0 4px;">📍 ${report.lokasi}</p>` : ""}
            <p style="font-size:11px;color:#9ca3af;margin:0;">📅 ${report.tanggal}</p>
            <p style="font-size:11px;color:#9ca3af;margin-top:2px;">🆔 ${report.id}</p>
          </div>
        `;

                L.marker([report.lat, report.lng], { icon })
                    .addTo(map)
                    .bindPopup(popup, {
                        maxWidth: 260,
                        className: "custom-popup",
                    });
            });

            mapRef.current = map;
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterStatus]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full rounded-xl overflow-hidden z-0"
            style={{ minHeight: "500px" }}
        />
    );
}
