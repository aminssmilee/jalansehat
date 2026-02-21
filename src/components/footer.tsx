import Link from "next/link";
import { Leaf, MapPin, FileText, Search, Twitter, Github, Globe } from "lucide-react";
import { Badge } from "@/components/shadcnui/badge";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-card mt-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md">
                                <Leaf className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="font-bold text-xl text-foreground">
                                Jalan<span className="text-primary">Sehat</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                            Platform pelaporan jalan rusak publik berbasis real-time. Bersama
                            membangun infrastruktur yang lebih baik untuk Indonesia.
                        </p>
                        <div className="flex items-center gap-2 mt-4">
                            <Badge className="bg-primary/10 text-primary border-0 text-xs rounded-lg">
                                🇮🇩 Made in Indonesia
                            </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-5">
                            {[Twitter, Github, Globe].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="p-2 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary transition-all"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Platform</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/lapor" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                    <FileText className="h-3.5 w-3.5" />
                                    Lapor Jalan Rusak
                                </Link>
                            </li>
                            <li>
                                <Link href="/peta" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                    <MapPin className="h-3.5 w-3.5" />
                                    Peta Laporan
                                </Link>
                            </li>
                            <li>
                                <Link href="/status" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                    <Search className="h-3.5 w-3.5" />
                                    Cek Status
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Informasi</h3>
                        <ul className="space-y-3">
                            {["Tentang Kami", "Kebijakan Privasi", "Syarat & Ketentuan", "Panduan Pengguna", "Hubungi Kami"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} JalanSehat. Hak Cipta Dilindungi.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Dibangun untuk kepentingan publik Indonesia 🚀
                    </p>
                </div>
            </div>
        </footer>
    );
}
