import type { Metadata } from "next";
import { FileText, Info, Camera, MapPin, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/shadcnui/badge";
import { Card, CardContent } from "@/components/shadcnui/card";
import { Separator } from "@/components/shadcnui/separator";
import ReportForm from "@/components/report-form";

export const metadata: Metadata = {
    title: "Lapor Jalan Rusak – JalanSehat",
    description:
        "Laporkan jalan rusak di sekitar Anda dengan mudah. Upload foto, deteksi lokasi otomatis, dan kirim laporan langsung ke pemerintah.",
};

const tips = [
    { icon: Camera, text: "Ambil foto dari jarak yang menunjukkan keseluruhan kerusakan" },
    { icon: MapPin, text: "Pastikan GPS aktif untuk deteksi lokasi akurat" },
    { icon: ShieldCheck, text: "Deskripsi detail mempercepat verifikasi laporan" },
];

export default function LaporPage() {
    return (
        <div className="min-h-screen bg-muted/30 py-10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Header */}
                <div className="mb-8 space-y-2">
                    <div className="flex items-center gap-2">
                        <Badge className="bg-primary/10 text-primary border-0 rounded-full px-3 py-1 text-xs">
                            Platform JalanSehat
                        </Badge>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-foreground flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10">
                            <FileText className="h-7 w-7 text-primary" />
                        </div>
                        Lapor Jalan Rusak
                    </h1>
                    <p className="text-muted-foreground max-w-xl">
                        Lengkapi formulir di bawah ini. Laporan Anda akan langsung diteruskan ke Dinas PU setempat.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form (left 2/3) */}
                    <div className="lg:col-span-2">
                        <ReportForm />
                    </div>

                    {/* Sidebar (right 1/3) */}
                    <div className="space-y-5">
                        {/* Tips Card */}
                        <Card className="border border-border/60 shadow-sm rounded-2xl">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2">
                                    <Info className="h-5 w-5 text-primary" />
                                    <h2 className="text-base font-bold text-foreground">Tips Laporan Baik</h2>
                                </div>
                                <Separator />
                                <ul className="space-y-3">
                                    {tips.map(({ icon: Icon, text }, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                            <div className="p-1.5 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
                                                <Icon className="h-3.5 w-3.5 text-primary" />
                                            </div>
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Status Info */}
                        <Card className="border border-border/60 shadow-sm rounded-2xl bg-primary/5">
                            <CardContent className="p-6 space-y-3">
                                <h2 className="text-base font-bold text-foreground">Status Laporan</h2>
                                <div className="space-y-2">
                                    {[
                                        { label: "Pending", desc: "Laporan diterima, menunggu verifikasi", color: "bg-red-500" },
                                        { label: "Diproses", desc: "Laporan diverifikasi, dalam tindakan", color: "bg-amber-500" },
                                        { label: "Selesai", desc: "Perbaikan telah dilaksanakan", color: "bg-emerald-500" },
                                    ].map(({ label, desc, color }) => (
                                        <div key={label} className="flex items-start gap-2.5 text-sm">
                                            <div className={`h-2.5 w-2.5 rounded-full ${color} flex-shrink-0 mt-1.5`} />
                                            <div>
                                                <span className="font-semibold text-foreground">{label}</span>
                                                <span className="text-muted-foreground"> – {desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Privacy */}
                        <Card className="border border-border/60 shadow-sm rounded-2xl">
                            <CardContent className="p-5 text-xs text-muted-foreground leading-relaxed space-y-1">
                                <p className="font-semibold text-foreground text-sm">🔒 Privasi Anda Terlindungi</p>
                                <p>Nama dan nomor HP bersifat opsional. Data hanya digunakan untuk keperluan tindak lanjut laporan.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
