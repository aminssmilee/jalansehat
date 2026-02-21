"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Leaf, MapPin, FileText, Search } from "lucide-react";
import { Button } from "@/components/shadcnui/button";
import { Badge } from "@/components/shadcnui/badge";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/" as const, label: "Beranda", icon: Leaf },
    { href: "/lapor" as const, label: "Lapor", icon: FileText },
    { href: "/peta" as const, label: "Peta", icon: MapPin },
    { href: "/status" as const, label: "Cek Status", icon: Search },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 16);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            <header
                className={cn(
                    "sticky top-0 z-50 w-full transition-all duration-300",
                    scrolled
                        ? "glass border-b border-border/60 shadow-sm"
                        : "bg-transparent"
                )}
            >
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 group"
                            aria-label="JalanSehat Home"
                        >
                            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md group-hover:scale-105 transition-transform duration-200">
                                <Leaf className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-bold text-lg tracking-tight text-foreground">
                                    Jalan<span className="text-primary">Sehat</span>
                                </span>
                                <span className="text-[10px] text-muted-foreground font-medium hidden sm:block">
                                    Platform Infrastruktur Publik
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200",
                                        pathname === href
                                            ? "text-primary bg-primary/10"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                    {label}
                                    {pathname === href && (
                                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 bg-primary rounded-full" />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            <ThemeToggleButton />
                            <Link href="/lapor" className="hidden sm:block">
                                <Button
                                    size="sm"
                                    className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 font-medium"
                                >
                                    <FileText className="h-4 w-4 mr-1.5" />
                                    Lapor Sekarang
                                </Button>
                            </Link>

                            {/* Mobile menu toggle */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed inset-x-0 top-16 z-40 md:hidden animate-fade-in-up">
                    <div className="mx-4 mt-1 rounded-2xl glass border border-border/60 shadow-xl p-4 space-y-1">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                    pathname === href
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                                {href === "/lapor" && (
                                    <Badge className="ml-auto bg-primary/10 text-primary text-xs border-0">
                                        Baru
                                    </Badge>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
