"use client";

import Image from "next/image";
import { MapPin, LayoutDashboard, Pencil, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ComplexCardProps {
  title: string;
  location: string;
  bookingsToday: number;
  resourcesCount: number;
  status: "active" | "inactive";
  imageUrl: string;
}

export default function ComplexCard({
  title,
  location,
  bookingsToday,
  resourcesCount,
  status,
  imageUrl,
}: ComplexCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-[2rem] border border-border-muted bg-bg-card shadow-xl transition-all hover:shadow-2xl">
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-90" />

        <div className="absolute top-4 right-4">
          <div
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md",
              status === "active"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : "bg-red-500/20 text-red-400 border-red-500/30"
            )}
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                status === "active" ? "bg-emerald-400" : "bg-red-400"
              )}
            />
            {status === "active" ? "فعال" : "غیرفعال"}
          </div>
        </div>

        <div className="absolute bottom-4 right-6 left-6 space-y-1">
          <h3 className="text-xl font-extrabold text-text-primary truncate drop-shadow-md">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 text-text-secondary">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{location}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col justify-between rounded-2xl bg-bg-elevated border border-border-muted/50 p-4 transition-colors hover:bg-bg-elevated/70">
            <span className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">
              رزروهای امروز
            </span>
            <span className="mt-1 text-2xl font-black text-text-primary">
              {bookingsToday}
            </span>
          </div>
          <div className="flex flex-col justify-between rounded-2xl bg-bg-elevated border border-border-muted/50 p-4 transition-colors hover:bg-bg-elevated/70">
            <span className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">
              تعداد منابع
            </span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-black text-text-primary">
                {resourcesCount}
              </span>
              <span className="text-xs text-text-secondary font-medium">
                مجموعه
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button className="w-full h-12 gap-2 bg-[#1C64F2] hover:bg-[#1C64F2]/90 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
            <LayoutDashboard className="w-5 h-5" />
            <span>مشاهده داشبورد</span>
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-11 gap-2 border-border-muted/50 bg-transparent text-text-primary hover:bg-bg-elevated rounded-xl text-sm transition-all active:scale-[0.98]"
            >
              <Pencil className="w-4 h-4 text-text-secondary" />
              <span>ویرایش</span>
            </Button>
            <Button
              variant="outline"
              className="h-11 gap-2 border-border-muted/50 bg-transparent text-text-primary hover:bg-bg-elevated rounded-xl text-sm transition-all active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4 text-text-secondary" />
              <span>افزودن منبع</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
