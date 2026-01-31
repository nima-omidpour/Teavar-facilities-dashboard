"use client";
import { cn } from "@/lib/utils";

export default function BackDrop({
  onClick,
  show,
  zIndex = "z-40",
}: {
  onClick: () => void;
  show: boolean;
  zIndex?: string;
}) {
  return (
    show && (
      <div
        className={cn(
          "fixed inset-0 bg-black/40 md:hidden backdrop-blur-sm transition-opacity ",
          zIndex
        )}
        onClick={onClick}
      />
    )
  );
}
