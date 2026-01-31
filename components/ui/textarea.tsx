import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-xl border border-border-muted bg-bg-main px-4 py-2 text-base ring-offset-background placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-primary/20 focus-visible:border-accent-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-[color,box-shadow]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
