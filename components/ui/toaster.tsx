"use client";

import { Toaster as Sonner } from "sonner";
import { useTheme } from "next-themes";

export function Toaster() {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as "light" | "dark"}
      position="top-center"
      dir="rtl"
      richColors
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-bg-card group-[.toaster]:text-text-primary group-[.toaster]:border-border-muted group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-text-secondary",
          actionButton:
            "group-[.toast]:bg-accent-primary group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-bg-elevated group-[.toast]:text-text-secondary",
          error: "group-[.toast]:bg-red-500 group-[.toast]:text-white",
          success: "group-[.toast]:bg-accent-success group-[.toast]:text-white",
          warning: "group-[.toast]:bg-yellow-500 group-[.toast]:text-white",
          info: "group-[.toast]:bg-accent-primary group-[.toast]:text-white",
        },
      }}
    />
  );
}
