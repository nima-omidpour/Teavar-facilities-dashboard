"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <button
        className="p-2 bg-card border border-border-muted rounded-md text-text-primary"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Toggle Theme
      </button>
    </div>
  );
}
