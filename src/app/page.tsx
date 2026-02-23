import Link from "next/link";
import {
  Camera,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Map,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  Zap,
  Users,
} from "lucide-react";
import { Button } from "@/components/shadcnui/button";
import { Card, CardContent } from "@/components/shadcnui/card";
import { Badge } from "@/components/shadcnui/badge";
import { StatsCard } from "@/components/stats-card";

const steps = [
  {
    step: "01",
    icon: Camera,
    title: "Ambil Foto",
    description:
      "Ambil foto jalan rusak dengan jelas. Upload langsung dari galeri atau kamera ponsel Anda.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    step: "02",
    icon: MapPin,
    title: "Lokasi Otomatis",
    description:
      "Sistem mendeteksi lokasi Anda secara otomatis melalui GPS. Tidak perlu isi alamat manual.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "Diproses Pemerintah",
    description:
      "Laporan diteruskan ke Dinas Pekerjaan Umum terkait untuk segera ditangani.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
];

const features = [
  { icon: Zap, text: "Real-time tracking" },
  { icon: Users, text: "Komunitas aktif" },
  { icon: MapPin, text: "GPS otomatis" },
  { icon: ShieldCheck, text: "Terverifikasi resmi" },
];

const testimonials = [
  {
    name: "Budi Santoso",
    location: "Jakarta Selatan",
    text: "Laporan saya ditangani hanya dalam 3 hari! Platform ini sangat membantu.",
    avatar: "BS",
  },
  {
    name: "Sri Wahyuni",
    location: "Bandung",
    text: "Mudah banget! Foto, lokasi otomatis, langsung terkirim. Luar biasa.",
    avatar: "SW",
  },
  {
    name: "Ahmad Fauzi",
    location: "Surabaya",
    text: "Akhirnya ada platform yang serius menangani masalah infrastruktur publik.",
    avatar: "AF",
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative hero-gradient min-h-[90vh] flex items-center">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="opacity-0 animate-fade-in-up delay-100" style={{ animationFillMode: "forwards" }}>
                <Badge className="bg-primary/10 text-primary border-0 rounded-full px-4 py-1.5 text-sm font-medium">
                  🚀 Platform Baru • Beta Version
                </Badge>
              </div>

              <div className="opacity-0 animate-fade-in-up delay-200" style={{ animationFillMode: "forwards" }}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight">
                  Laporkan{" "}
                  <span className="text-primary relative">
                    Jalan Rusak
                    <span className="absolute inset-x-0 -bottom-1 h-1 bg-primary/30 rounded-full" />
                  </span>
                  <br />
                  di Sekitar Anda
                </h1>
              </div>

              <div className="opacity-0 animate-fade-in-up delay-300" style={{ animationFillMode: "forwards" }}>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Bantu percepat perbaikan infrastruktur dengan laporan{" "}
                  <strong className="text-foreground">real-time</strong>. Setiap
                  laporan Anda akan langsung diteruskan ke instansi pemerintah
                  terkait.
                </p>
              </div>

              <div className="opacity-0 animate-fade-in-up delay-400" style={{ animationFillMode: "forwards" }}>
                <div className="flex flex-wrap gap-3">
                  <Link href="/lapor">
                    <Button
                      size="lg"
                      className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 gap-2 px-6 font-semibold"
                    >
                      Laporkan Sekarang
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/peta">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl border-primary/30 text-primary hover:bg-primary/10 gap-2 px-6 font-semibold"
                    >
                      <Map className="h-4 w-4" />
                      Lihat Peta
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Feature Pills */}
              <div className="opacity-0 animate-fade-in-up delay-500" style={{ animationFillMode: "forwards" }}>
                <div className="flex flex-wrap gap-2">
                  {features.map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-background/80 border border-border/60 rounded-full px-3 py-1.5"
                    >
                      <Icon className="h-3 w-3 text-primary" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Illustration Card */}
            <div className="opacity-0 animate-fade-in delay-300 flex justify-center lg:justify-end" style={{ animationFillMode: "forwards" }}>
              <div className="relative w-full max-w-sm">
                {/* Main Card */}
                <div className="animate-float relative bg-card rounded-2xl shadow-2xl border border-border/60 p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Camera className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Laporan new</div>
                      <div className="text-xs text-muted-foreground">Jl. Sudirman No.45</div>
                    </div>
                    <Badge className="ml-auto bg-amber-100 text-amber-700 border-0 text-xs dark:bg-amber-900/30 dark:text-amber-400">
                      Pending
                    </Badge>
                  </div>

                  <div className="h-px bg-border" />

                  <div className="space-y-2">
                    {[
                      { label: "Deskripsi", value: "Aspal berlubang besar" },
                      { label: "Koordinat", value: "-6.2088, 106.8456" },
                      { label: "Foto", value: "1 foto terlampir" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-medium text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="sm"
                    className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Kirim Laporan
                  </Button>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-emerald-500 text-white text-xs font-bold rounded-xl px-3 py-1.5 shadow-lg animate-pulse-green">
                  ✓ Terkirim!
                </div>
                <div className="absolute -bottom-4 -left-4 bg-card border border-border/60 rounded-xl shadow-lg px-3 py-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-medium">5.280 laporan aktif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <StatsCard
              label="Total Laporan"
              value="5.280"
              description="Sejak platform diluncurkan"
              icon={TrendingUp}
              variant="default"
            />
            <StatsCard
              label="Sedang Diproses"
              value="842"
              description="Dalam penanganan aktif"
              icon={Clock}
              variant="warning"
            />
            <StatsCard
              label="Selesai Ditangani"
              value="4.138"
              description="Berhasil diperbaiki"
              icon={CheckCircle2}
              variant="success"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <Badge className="bg-primary/10 text-primary border-0 rounded-full px-4 py-1 mb-4">
              Mudah & Cepat
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              Cara Kerja JalanSehat
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Hanya 3 langkah mudah untuk melaporkan jalan rusak dan membantu perbaikan infrastruktur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map(({ step, icon: Icon, title, description, color, bg }, index) => (
              <div
                key={step}
                className="opacity-0 animate-fade-in-up"
                style={{ animationFillMode: "forwards", animationDelay: `${index * 150}ms` }}
              >
                <Card className="border border-border/60 shadow-sm rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardContent className="p-7 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl ${bg}`}>
                        <Icon className={`h-6 w-6 ${color}`} />
                      </div>
                      <span className="text-5xl font-black text-muted/30 dark:text-muted-foreground/10 select-none">
                        {step}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2">
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-0 rounded-full px-4 py-1 mb-4">
              Testimoni Pengguna
            </Badge>
            <h2 className="text-3xl font-black text-foreground">
              Apa Kata Mereka?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, location, text, avatar }) => (
              <Card
                key={name}
                className="border border-border/60 shadow-sm rounded-2xl hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &ldquo;{text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                      {avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{name}</div>
                      <div className="text-xs text-muted-foreground">{location}</div>
                    </div>
                    <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-0 text-xs dark:bg-emerald-900/30 dark:text-emerald-400">
                      ✓ Verified
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-6">
          <div className="flex justify-center">
            <AlertCircle className="h-14 w-14 text-white/80" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Ada Jalan Rusak di Sekitar Anda?
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Jangan diam! Laporan Anda bisa menyelamatkan banyak orang dari kecelakaan.
            Bersama kita membangun Indonesia yang lebih baik.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/lapor">
              <Button
                size="lg"
                className="rounded-xl bg-white text-primary hover:bg-white/95 font-bold gap-2 shadow-xl px-8"
              >
                Mulai Lapor Sekarang
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/peta">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-white/30 text-white hover:bg-white/10 gap-2 px-8"
              >
                Lihat Semua Laporan
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
