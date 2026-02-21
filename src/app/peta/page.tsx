"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Map as MapIcon, Filter, RefreshCw, TrendingUp } from "lucide-react";
import { Badge } from "@/components/shadcnui/badge";
import { Button } from "@/components/shadcnui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcnui/tabs";
import { Skeleton } from "@/components/shadcnui/skeleton";
import type { Report } from "@/components/map-view";

const PublicMap = dynamic(
    () => import("@/components/map-view").then((m) => m.PublicMap),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full">
                <Skeleton className="w-full h-full rounded-xl" />
            </div>
        ),
    }
);

// Demo data
const MOCK_REPORTS: Report[] = [
    {
        id: "JS-A1B2C3",
        lat: -6.2088,
        lng: 106.8456,
        status: "pending",
        deskripsi: "Lubang besar di tengah jalan, berbahaya bagi pengendara motor",
        foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Pothole_on_road.jpg/640px-Pothole_on_road.jpg",
        tanggal: "20 Feb 2025",
        lokasi: "Jl. Sudirman, Jakarta Pusat",
    },
    {
        id: "JS-D4E5F6",
        lat: -6.2138,
        lng: 106.8498,
        status: "diproses",
        deskripsi: "Aspal retak parah sepanjang 10 meter, berpotensi membahayakan",
        foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Pothole_on_road.jpg/640px-Pothole_on_road.jpg",
        tanggal: "18 Feb 2025",
        lokasi: "Jl. Thamrin, Jakarta Pusat",
    },
    {
        id: "JS-G7H8I9",
        lat: -6.2050,
        lng: 106.8520,
        status: "selesai",
        deskripsi: "Kerusakan parah setelah banjir, sudah diperbaiki tim PU",
        tanggal: "15 Feb 2025",
        lokasi: "Jl. Gatot Subroto, Jakarta Selatan",
    },
    {
        id: "JS-J1K2L3",
        lat: -6.1870,
        lng: 106.8370,
        status: "pending",
        deskripsi: "Jalan berlubang di persimpangan, sudah ada 2 korban",
        tanggal: "19 Feb 2025",
        lokasi: "Jl. Kemayoran, Jakarta Pusat",
    },
    {
        id: "JS-M4N5O6",
        lat: -6.2188,
        lng: 106.8570,
        status: "diproses",
        deskripsi: "Permukaan jalan tidak rata dan licin saat hujan",
        tanggal: "17 Feb 2025",
        lokasi: "Jl. Kuningan, Jakarta Selatan",
    },
    {
        id: "JS-P7Q8R9",
        lat: -6.1950,
        lng: 106.8600,
        status: "selesai",
        deskripsi: "Drainase tersumbat menyebabkan genangan yang merusak jalan",
        tanggal: "10 Feb 2025",
        lokasi: "Jl. MT Haryono, Jakarta Timur",
    },
];

const statusCounts = {
    semua: MOCK_REPORTS.length,
    pending: MOCK_REPORTS.filter((r) => r.status === "pending").length,
    diproses: MOCK_REPORTS.filter((r) => r.status === "diproses").length,
    selesai: MOCK_REPORTS.filter((r) => r.status === "selesai").length,
};

const tabConfig = [
    { value: "semua", label: "Semua", count: statusCounts.semua, color: "text-foreground" },
    { value: "pending", label: "🔴 Pending", count: statusCounts.pending, color: "text-red-500" },
    { value: "diproses", label: "🟡 Diproses", count: statusCounts.diproses, color: "text-amber-500" },
    { value: "selesai", label: "🟢 Selesai", count: statusCounts.selesai, color: "text-emerald-500" },
];

export default function PetaPage() {
    const [activeTab, setActiveTab] = useState("semua");

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            {/* Top Bar */}
            <div className="bg-background border-b border-border px-4 sm:px-6 py-3 flex flex-wrap items-center gap-3 z-10">
                {/* Title */}
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                        <MapIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-foreground leading-none">Peta Laporan Publik</h1>
                        <p className="text-xs text-muted-foreground leading-none mt-0.5">Real-time • Indonesia</p>
                    </div>
                </div>

                <div className="h-5 w-px bg-border hidden sm:block" />

                {/* Filter Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="h-8 rounded-xl bg-muted/50 p-1 gap-0.5">
                        {tabConfig.map(({ value, label, count }) => (
                            <TabsTrigger
                                key={value}
                                value={value}
                                className="text-xs rounded-lg px-3 h-6 data-[state=active]:bg-background data-[state=active]:shadow-sm font-medium"
                            >
                                {label}
                                <Badge className="ml-1.5 h-4 px-1 text-[10px] bg-muted/80 text-muted-foreground border-0 rounded-full font-bold">
                                    {count}
                                </Badge>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <div className="flex items-center gap-2 ml-auto">
                    {/* Stats pills */}
                    <div className="hidden lg:flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <TrendingUp className="h-3.5 w-3.5 text-primary" />
                            <span>{MOCK_REPORTS.length} total laporan</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 rounded-xl border-border/60 px-2.5 text-xs gap-1.5"
                            onClick={() => window.location.reload()}
                        >
                            <RefreshCw className="h-3 w-3" />
                            Refresh
                        </Button>
                        <a href="/lapor">
                            <Button
                                size="sm"
                                className="h-7 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-3 text-xs gap-1.5 shadow-md shadow-primary/20"
                            >
                                <Filter className="h-3 w-3" />
                                Lapor
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                <div className="glass border border-border/60 rounded-2xl shadow-lg px-5 py-2.5 flex items-center gap-5 text-xs">
                    {[
                        { color: "bg-red-500", label: "Pending" },
                        { color: "bg-amber-500", label: "Diproses" },
                        { color: "bg-emerald-500", label: "Selesai" },
                    ].map(({ color, label }) => (
                        <div key={label} className="flex items-center gap-2">
                            <div className={`h-3 w-3 rounded-full ${color}`} />
                            <span className="text-foreground font-medium">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Map */}
            <div className="flex-1 relative">
                <PublicMap reports={MOCK_REPORTS} filterStatus={activeTab} />
            </div>
        </div>
    );
}
