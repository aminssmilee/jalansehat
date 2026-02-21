import { Card, CardContent } from "@/components/shadcnui/card";
import { Badge } from "@/components/shadcnui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    label: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
    variant?: "default" | "warning" | "success" | "destructive";
    className?: string;
}

const variantStyles = {
    default: "bg-primary/10 text-primary",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    destructive: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const badgeVariantStyles = {
    default: "bg-primary/10 text-primary border-0",
    warning: "bg-amber-100 text-amber-700 border-0 dark:bg-amber-900/30 dark:text-amber-400",
    success: "bg-emerald-100 text-emerald-700 border-0 dark:bg-emerald-900/30 dark:text-emerald-400",
    destructive: "bg-red-100 text-red-700 border-0 dark:bg-red-900/30 dark:text-red-400",
};

export function StatsCard({
    label,
    value,
    description,
    icon: Icon,
    variant = "default",
    className,
}: StatsCardProps) {
    return (
        <Card
            className={cn(
                "border border-border/60 shadow-sm rounded-2xl hover:shadow-md transition-all duration-200 hover:-translate-y-0.5",
                className
            )}
        >
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-2.5 rounded-xl", variantStyles[variant])}>
                        <Icon className="h-5 w-5" />
                    </div>
                    <Badge className={cn("text-xs rounded-lg font-medium", badgeVariantStyles[variant])}>
                        Live
                    </Badge>
                </div>
                <div className="text-3xl font-bold text-foreground">{value}</div>
                <div className="text-sm font-medium text-foreground mt-1">{label}</div>
                {description && (
                    <div className="text-xs text-muted-foreground mt-1">{description}</div>
                )}
            </CardContent>
        </Card>
    );
}
