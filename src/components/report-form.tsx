"use client";

import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import {
    Upload,
    MapPin,
    X,
    Loader2,
    Camera,
    User,
    Phone,
    MessageSquare,
    Navigation,
    CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/shadcnui/button";
import { Input } from "@/components/shadcnui/input";
import { Textarea } from "@/components/shadcnui/textarea";
import { Label } from "@/components/shadcnui/label";
import { Card, CardContent } from "@/components/shadcnui/card";
import { Badge } from "@/components/shadcnui/badge";
import { Skeleton } from "@/components/shadcnui/skeleton";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Lazy load map to avoid SSR issues  
const MapPicker = dynamic(() => import("@/components/map-view").then(m => m.MapPicker), {
    ssr: false,
    loading: () => (
        <div className="w-full h-64 rounded-xl overflow-hidden">
            <Skeleton className="w-full h-full" />
        </div>
    ),
});

interface FormData {
    nama: string;
    noHp: string;
    deskripsi: string;
}

interface Coordinates {
    lat: number;
    lng: number;
}

export default function ReportForm() {
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [coords, setCoords] = useState<Coordinates | null>(null);
    const [gettingLocation, setGettingLocation] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reportId, setReportId] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) {
            toast.error("Ukuran foto maksimal 10MB");
            return;
        }
        setPhoto(file);
        const reader = new FileReader();
        reader.onload = () => setPhotoPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const removePhoto = () => {
        setPhoto(null);
        setPhotoPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const getLocation = useCallback(() => {
        if (!navigator.geolocation) {
            toast.error("Browser Anda tidak mendukung geolokasi");
            return;
        }
        setGettingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                setGettingLocation(false);
                toast.success("Lokasi berhasil dideteksi!");
            },
            (err) => {
                setGettingLocation(false);
                toast.error("Gagal mendapatkan lokasi: " + err.message);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }, []);

    const onSubmit = async (data: FormData) => {
        if (!photo) {
            toast.error("Foto wajib diunggah");
            return;
        }
        if (!coords) {
            toast.error("Lokasi belum ditentukan. Klik 'Gunakan Lokasi Saya'");
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("nama", data.nama);
            formData.append("noHp", data.noHp);
            formData.append("deskripsi", data.deskripsi);
            formData.append("foto", photo);
            formData.append("latitude", coords.lat.toString());
            formData.append("longitude", coords.lng.toString());

            // Simulate API call – replace with real endpoint
            // await axios.post("/api/laporan", formData);
            await new Promise((r) => setTimeout(r, 2000));
            const id = "JS-" + Math.random().toString(36).substring(2, 8).toUpperCase();
            setReportId(id);
            setSubmitted(true);
            toast.success("Laporan berhasil dikirim! ID: " + id);
            reset();
            setPhoto(null);
            setPhotoPreview(null);
            setCoords(null);
        } catch {
            toast.error("Gagal mengirim laporan. Coba lagi.");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <Card className="border border-border/60 shadow-sm rounded-2xl animate-scale-in">
                <CardContent className="p-10 text-center space-y-5">
                    <div className="flex justify-center">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-green">
                            <CheckCircle2 className="h-10 w-10 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-black text-foreground">Laporan Terkirim!</h2>
                    <p className="text-muted-foreground">
                        Laporan Anda telah berhasil dikirim dan akan segera diproses oleh tim terkait.
                    </p>
                    <div className="bg-primary/5 border border-primary/20 rounded-xl px-6 py-4">
                        <p className="text-sm text-muted-foreground mb-1">ID Laporan Anda</p>
                        <p className="text-2xl font-black text-primary tracking-widest">{reportId}</p>
                        <p className="text-xs text-muted-foreground mt-1">Simpan ID ini untuk cek status</p>
                    </div>
                    <div className="flex gap-3 justify-center pt-2">
                        <Button
                            onClick={() => setSubmitted(false)}
                            className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            Lapor Lagi
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-xl"
                            onClick={() => window.location.href = "/status"}
                        >
                            Cek Status
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Card className="border border-border/60 shadow-sm rounded-2xl">
                <CardContent className="p-6 sm:p-8 space-y-7">

                    {/* Photo Upload */}
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <Camera className="h-4 w-4 text-primary" />
                            Foto Jalan Rusak <span className="text-destructive">*</span>
                        </Label>
                        {photoPreview ? (
                            <div className="relative rounded-xl overflow-hidden border border-border/60 group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={photoPreview}
                                    alt="Preview"
                                    className="w-full max-h-64 object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={removePhoto}
                                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                                <Badge className="absolute bottom-3 left-3 bg-black/60 text-white border-0 text-xs backdrop-blur-sm">
                                    {photo?.name}
                                </Badge>
                            </div>
                        ) : (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="relative border-2 border-dashed border-primary/30 rounded-xl p-10 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all group"
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                        <Upload className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">Klik untuk upload foto</p>
                                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WEBP • Maks 10MB</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoChange}
                        />
                        {!photo && (
                            <p className="text-xs text-muted-foreground">Foto yang jelas akan mempercepat verifikasi laporan.</p>
                        )}
                    </div>

                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="nama" className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" />
                                Nama <span className="text-xs text-muted-foreground font-normal">(opsional)</span>
                            </Label>
                            <Input
                                id="nama"
                                placeholder="Nama lengkap Anda"
                                className="rounded-xl border-border/60 focus:border-primary focus:ring-primary/20 h-11"
                                {...register("nama")}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="noHp" className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                Nomor HP <span className="text-xs text-muted-foreground font-normal">(opsional)</span>
                            </Label>
                            <Input
                                id="noHp"
                                type="tel"
                                placeholder="08xx-xxxx-xxxx"
                                className="rounded-xl border-border/60 focus:border-primary focus:ring-primary/20 h-11"
                                {...register("noHp")}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="deskripsi" className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            Deskripsi <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="deskripsi"
                            placeholder="Deskripsikan kondisi jalan rusak secara detail. Contoh: Terdapat lubang besar dengan kedalaman sekitar 30cm di jalur kiri jalan..."
                            rows={4}
                            className={cn(
                                "rounded-xl border-border/60 focus:border-primary focus:ring-primary/20 resize-none",
                                errors.deskripsi && "border-destructive focus:border-destructive"
                            )}
                            {...register("deskripsi", {
                                required: "Deskripsi wajib diisi",
                                minLength: { value: 10, message: "Minimal 10 karakter" },
                            })}
                        />
                        {errors.deskripsi && (
                            <p className="text-xs text-destructive flex items-center gap-1">
                                <X className="h-3 w-3" />
                                {errors.deskripsi.message}
                            </p>
                        )}
                    </div>

                    {/* Location */}
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            Lokasi <span className="text-destructive">*</span>
                        </Label>

                        <Button
                            type="button"
                            variant="outline"
                            className={cn(
                                "rounded-xl border-primary/30 gap-2 hover:bg-primary/5 w-full sm:w-auto",
                                coords && "border-primary text-primary bg-primary/5"
                            )}
                            onClick={getLocation}
                            disabled={gettingLocation}
                        >
                            {gettingLocation ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Mendeteksi lokasi...
                                </>
                            ) : coords ? (
                                <>
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                    Lokasi terdeteksi
                                </>
                            ) : (
                                <>
                                    <Navigation className="h-4 w-4" />
                                    Gunakan Lokasi Saya
                                </>
                            )}
                        </Button>

                        {coords && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-xl px-4 py-2.5">
                                <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                <span>
                                    Latitude: <strong className="text-foreground">{coords.lat.toFixed(6)}</strong>{" "}
                                    &nbsp;Longitude: <strong className="text-foreground">{coords.lng.toFixed(6)}</strong>
                                </span>
                                <Badge className="ml-auto bg-primary/10 text-primary border-0 text-xs">GPS</Badge>
                            </div>
                        )}

                        {/* Map Preview */}
                        {coords && (
                            <div className="mt-2">
                                <MapPicker
                                    initialCoords={coords}
                                    onCoordsChange={setCoords}
                                />
                                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                    <Navigation className="h-3 w-3" />
                                    Seret marker untuk menyesuaikan lokasi
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-semibold gap-2"
                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Mengirim laporan...
                                </>
                            ) : (
                                <>
                                    <Upload className="h-5 w-5" />
                                    Kirim Laporan
                                </>
                            )}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center mt-3">
                            Dengan mengirim laporan, Anda menyetujui{" "}
                            <a href="#" className="text-primary hover:underline">Kebijakan Privasi</a> kami.
                        </p>
                    </div>

                </CardContent>
            </Card>
        </form>
    );
}
