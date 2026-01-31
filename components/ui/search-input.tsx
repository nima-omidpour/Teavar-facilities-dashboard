"use client";

import { Search, Loader2, X } from "lucide-react";
import { Input } from "./input";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  isLoading?: boolean;
  containerClassName?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    { onClear, isLoading, className, containerClassName, value, ...props },
    ref
  ) => {
    const showClear = value && value.toString().length > 0 && onClear;

    return (
      <div className={cn("relative w-full bg-bg-card", containerClassName)}>
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <Input
          type="search"
          placeholder="جستجو..."
          className={cn("pr-10 ", className)}
          ref={ref}
          value={value}
          {...props}
        />

        {isLoading && (
          <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
        )}

        {showClear && !isLoading && (
          <button
            type="button"
            onClick={onClear}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="پاک کردن"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
