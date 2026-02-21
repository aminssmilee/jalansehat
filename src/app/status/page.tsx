"use client";

import { useState } from "react";
import { Search, CheckCircle2, Clock, AlertCircle, ArrowRight, MapPin, Calendar, Hash } from "lucide-react";
import { Button } from "@/components/shadcnui/button";
import { Input } from "@/components/shadcnui/input";
import { Label } from "@/components/shadcnui/label";
import { Card, CardContent } from "@/components/shadcnui/card";
import { Badge } from "@/components/shadcnui/badge";
import { Separator } from "@/components/shadcnui/separator";

type Status = "pending" | "diproses" | "selesai";

interface ReportData {
    id: string;
    deskripsi: string;
    lokasi: string;
    tanggal: string;
    status: Status;
    foto?: string;
    timeline: { date: string; label: string; desc: string; done: boolean }[];
}

// Demo data
const MOCK_REPORTS: Record<string, ReportData> = {
    "JS-A1B2C3": {
        id: "JS-A1B2C3",
        deskripsi: "Lubang besar di tengah jalan, berbahaya bagi pengendara motor. Kedalaman kurang lebih 30cm.",
        lokasi: "Jl. Sudirman No.12, Jakarta Pusat",
        tanggal: "20 Feb 2025",
        status: "pending",
        foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Pothole_on_road.jpg/640px-Pothole_on_road.jpg",
        timeline: [
            { date: "20 Feb 2025, 09:30", label: "Laporan Diterima", desc: "Laporan Anda berhasil diterima sistem JalanSehat", done: true },
            { date: "20 Feb 2025, 11:00", label: "Verifikasi", desc: "Laporan sedang diverifikasi oleh tim kami", done: false },
            { date: "—", label: "Diteruskan ke PU", desc: "Laporan diteruskan ke Dinas PU setempat", done: false },
            { date: "—", label: "Jadwal Perbaikan", desc: "Tim lapangan dijadwalkan untuk survei", done: false },
            { date: "—", label: "Selesai", desc: "Perbaikan jalan selesai dilaksanakan", done: false },
        ],
    },
    "JS-D4E5F6": {
        id: "JS-D4E5F6",
        deskripsi: "Aspal retak parah sepanjang 10 meter di jalur utama, berpotensi membahayakan pengendara.",
        lokasi: "Jl. Thamrin No.22, Jakarta Pusat",
        tanggal: "18 Feb 2025",
        status: "diproses",
        foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Pothole_on_road.jpg/640px-Pothole_on_road.jpg",
        timeline: [
            { date: "18 Feb 2025, 08:15", label: "Laporan Diterima", desc: "Laporan berhasil diterima sistem JalanSehat", done: true },
            { date: "18 Feb 2025, 13:30", label: "Verifikasi", desc: "Laporan telah diverifikasi oleh tim kami", done: true },
            { date: "19 Feb 2025, 09:00", label: "Diteruskan ke PU", desc: "Laporan diteruskan ke Dinas PU Jakarta Pusat", done: true },
            { date: "20 Feb 2025, 10:00", label: "Jadwal Perbaikan", desc: "Tim lapangan telah dijadwalkan survei hari ini", done: true },
            { date: "—", label: "Selesai", desc: "Perbaikan jalan akan segera dilaksanakan", done: false },
        ],
    },
    "JS-G7H8I9": {
        id: "JS-G7H8I9",
        deskripsi: "Kerusakan parah setelah banjir. Aspal terkelupas sepanjang 25 meter. Sudah diperbaiki.",
        lokasi: "Jl. Gatot Subroto, Jakarta Selatan",
        tanggal: "15 Feb 2025",
        status: "selesai",
        timeline: [
            { date: "15 Feb 2025, 07:00", label: "Laporan Diterima", desc: "Laporan berhasil diterima sistem JalanSehat", done: true },
            { date: "15 Feb 2025, 10:00", label: "Verifikasi", desc: "Laporan telah diverifikasi oleh tim kami", done: true },
            { date: "15 Feb 2025, 14:00", label: "Diteruskan ke PU", desc: "Laporan diteruskan ke Dinas PU Jakarta Selatan", done: true },
            { date: "16 Feb 2025, 08:00", label: "Jadwal Perbaikan", desc: "Tim lapangan telah melakukan survei", done: true },
            { date: "18 Feb 2025, 17:00", label: "Selesai", desc: "Perbaikan jalan telah selesai dilaksanakan ✓", done: true },
        ],
    },
};

const statusConfig: Record<Status, { label: string; color: string; bg: string; icon: React.ElementType; badge: string }> = {
    pending: {
        label: "Pending",
        color: "text-red-600 dark:text-red-400",
        bg: "bg-red-50 dark:bg-red-900/20",
        icon: AlertCircle,
        badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
    diproses: {
        label: "Sedang Diproses",
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-900/20",
        icon: Clock,
        badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    },
    selesai: {
        label: "Selesai",
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-900/20",
        icon: CheckCircle2,
        badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
};

export default function StatusPage() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<ReportData | null>(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        const id = query.trim().toUpperCase();
        if (!id) return;
        setLoading(true);
        setNotFound(false);
        setResult(null);
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 800));
        const found = MOCK_REPORTS[id];
        if (found) {
            setResult(found);
        } else {
            setNotFound(true);
        }
        setLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch();
    };

    const cfg = result ? statusConfig[result.status] : null;
    const StatusIcon = cfg?.icon;

    return (
        <div className="min-h-screen bg-muted/30 py-10">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-10 space-y-3">
                    <Badge className="bg-primary/10 text-primary border-0 rounded-full px-4 py-1">
                        Lacak Laporan Anda
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-black text-foreground">
                        Cek Status Laporan
                    </h1>
                    <p className="text-muted-foreground">
                        Masukkan ID laporan yang Anda dapatkan saat mengirim laporan.
                    </p>
                </div>

                {/* Search Box */}
                <Card className="border border-border/60 shadow-sm rounded-2xl mb-6">
                    <CardContent className="p-6">
                        <Label htmlFor="report-id" className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                            <Hash className="h-4 w-4 text-primary" />
                            ID Laporan
                        </Label>
                        <div className="flex gap-3">
                            <Input
                                id="report-id"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Contoh: JS-A1B2C3"
                                className="rounded-xl border-border/60 focus:border-primary h-11 font-mono tracking-widest uppercase"
                            />
                            <Button
                                onClick={handleSearch}
                                className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-5 gap-2 shadow-md shadow-primary/20 font-semibold flex-shrink-0"
                                disabled={loading || !query.trim()}
                            >
                                {loading ? (
                                    <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                ) : (
                                    <Search className="h-4 w-4" />
                                )}
                                Cari
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            Coba: <button onClick={() => setQuery("JS-A1B2C3")} className="text-primary hover:underline font-mono">JS-A1B2C3</button>
                            {" · "}
                            <button onClick={() => setQuery("JS-D4E5F6")} className="text-primary hover:underline font-mono">JS-D4E5F6</button>
                            {" · "}
                            <button onClick={() => setQuery("JS-G7H8I9")} className="text-primary hover:underline font-mono">JS-G7H8I9</button>
                        </p>
                    </CardContent>
                </Card>

                {/* Not Found */}
                {notFound && (
                    <Card className="border border-border/60 shadow-sm rounded-2xl animate-fade-in-up">
                        <CardContent className="p-10 text-center space-y-3">
                            <div className="flex justify-center">
                                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                                    <Search className="h-8 w-8 text-muted-foreground" />
                                </div>
                            </div>
                            <h2 className="text-lg font-bold text-foreground">Laporan tidak ditemukan</h2>
                            <p className="text-sm text-muted-foreground">
                                ID &ldquo;{query}&rdquo; tidak terdapat dalam sistem kami. Periksa kembali ID laporan Anda.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Result */}
                {result && cfg && StatusIcon && (
                    <div className="space-y-5 animate-fade-in-up">
                        {/* Status Card */}
                        <Card className="border border-border/60 shadow-sm rounded-2xl overflow-hidden">
                            <div className={`px-6 py-4 ${cfg.bg} border-b border-border/30`}>
                                <div className="flex items-center justify-between flex-wrap gap-3">
                                    <div className="flex items-center gap-3">
                                        <StatusIcon className={`h-6 w-6 ${cfg.color}`} />
                                        <div>
                                            <p className="text-xs text-muted-foreground font-medium">Status Laporan</p>
                                            <p className={`text-lg font-black ${cfg.color}`}>{cfg.label}</p>
                                        </div>
                                    </div>
                                    <Badge className={`${cfg.badge} border-0 text-sm font-bold px-4 py-1.5 rounded-full`}>
                                        {cfg.label}
                                    </Badge>
                                </div>
                            </div>

                            <CardContent className="p-6 space-y-5">
                                {/* Photo */}
                                {result.foto && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={result.foto}
                                        alt="Foto laporan"
                                        className="w-full h-48 object-cover rounded-xl border border-border/60"
                                    />
                                )}

                                {/* Info Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                            <Hash className="h-3 w-3" /> ID Laporan
                                        </p>
                                        <p className="font-mono font-bold text-foreground">{result.id}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                            <Calendar className="h-3 w-3" /> Tanggal Lapor
                                        </p>
                                        <p className="font-medium text-foreground">{result.tanggal}</p>
                                    </div>
                                    <div className="space-y-1 sm:col-span-2">
                                        <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                            <MapPin className="h-3 w-3" /> Lokasi
                                        </p>
                                        <p className="font-medium text-foreground">{result.lokasi}</p>
                                    </div>
                                </div>

                                <Separator />

                                {/* Description */}
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground font-medium">Deskripsi</p>
                                    <p className="text-sm text-foreground leading-relaxed">{result.deskripsi}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timeline */}
                        <Card className="border border-border/60 shadow-sm rounded-2xl">
                            <CardContent className="p-6 space-y-1">
                                <h2 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 text-primary" />
                                    Timeline Progress
                                </h2>
                                <div className="relative">
                                    <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border" />
                                    <div className="space-y-6">
                                        {result.timeline.map((item, i) => (
                                            <div key={i} className="relative flex gap-5 pl-10">
                                                {/* Dot */}
                                                <div
                                                    className={`absolute left-2 top-1 h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                            ${item.done
                                                            ? "bg-primary border-primary"
                                                            : "bg-background border-border"
                                                        }`}
                                                >
                                                    {item.done && (
                                                        <CheckCircle2 className="h-3 w-3 text-white" />
                                                    )}
                                                </div>
                                                {/* Content */}
                                                <div className={`pb-1 ${!item.done ? "opacity-40" : ""}`}>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className={`text-sm font-bold ${item.done ? "text-foreground" : "text-muted-foreground"}`}>
                                                            {item.label}
                                                        </span>
                                                        {item.done && (
                                                            <Badge className="bg-primary/10 text-primary border-0 text-xs rounded-full px-2">✓ Done</Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                                                    <p className="text-xs text-muted-foreground mt-1 font-mono">{item.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
