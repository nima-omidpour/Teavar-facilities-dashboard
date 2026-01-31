"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface EmptyComplexCardProps {
  className?: string;
}

export default function EmptyComplexCard({ className }: EmptyComplexCardProps) {
  return (
    <Link
      href="/complexes/add"
      className={cn(
        "group flex h-full min-h-[400px] cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-border-muted bg-bg-card/30 p-8 transition-all hover:border-accent-primary/50 hover:bg-bg-card/50 hover:shadow-xl",
        className,
      )}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bg-elevated text-text-secondary transition-all group-hover:bg-accent-primary/10 group-hover:text-accent-primary">
        <Plus className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
      </div>

      <div className="mt-6 text-center space-y-2">
        <h3 className="text-xl font-bold text-text-primary transition-colors group-hover:text-accent-primary">
          افزودن مجموعه جدید
        </h3>
        <p className="max-w-[240px] text-sm text-text-secondary leading-relaxed">
          با ثبت نام مجموعه ورزشی جدید، کسب و کار خود را گسترش دهید.
        </p>
      </div>
    </Link>
  );
}
