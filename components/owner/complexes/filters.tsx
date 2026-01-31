"use client";

import { SearchInput } from "@/components/ui/search-input";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { AddAction } from "@/components/ui/addAction";
import Link from "next/link";

interface FiltersProps {
  onSearch?: (query: string) => void;
  onStatusChange?: (status: string) => void;
  onAdd?: () => void;
  totalCount?: number;
  debounceMs?: number;
}

interface statusOptions {
  value: string;
  label: string;
}

export default function Filters({
  onSearch,
  onStatusChange,
  onAdd,
  totalCount = 0,
  debounceMs = 500,
}: FiltersProps) {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<statusOptions>();

  const statusOptions = [
    { value: "all", label: "همه" },
    { value: "active", label: "فعال" },
    { value: "inactive", label: "غیر فعال" },
  ];

  useEffect(() => {
    if (!onSearch) return;
    setIsLoading(true);
    const timer = setTimeout(() => {
      onSearch(search);
      setIsLoading(false);
    }, debounceMs);

    return () => {
      clearTimeout(timer);
      setIsLoading(false);
    };
  }, [search, debounceMs, onSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setSearch(e.target.value);
  };

  const handleStatusChange = (value: string) => {
    const selectedStatus = statusOptions.find(
      (option) => option.value === value,
    );
    if (selectedStatus) {
      setStatus(selectedStatus);
      onStatusChange?.(value);
    }
  };

  const handleClear = () => {
    setSearch("");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <SearchInput
        value={search}
        onChange={handleSearch}
        isLoading={isLoading}
        onClear={handleClear}
        containerClassName="w-full lg:max-w-md"
      />

      <div className="flex flex-wrap items-center gap-3 min-h-10">
        <div className="flex items-center gap-2 border border-border-muted rounded-xl px-4 h-10 bg-bg-card whitespace-nowrap">
          <span className="text-sm text-text-secondary font-medium">
            تعداد مجموعه ها
          </span>
          <span className="bg-accent-primary/20 text-accent-primary text-xs font-bold rounded-lg px-2.5 py-1">
            {totalCount}
          </span>
        </div>

        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 !bg-bg-card border-border-muted h-10 px-4 rounded-xl hover:bg-bg-elevated/50 group"
            >
              <span className="text-sm text-text-primary font-medium">
                {status?.label ? `وضعیت: ${status.label}` : "فیلتر وضعیت"}
              </span>
              <ChevronDown className="w-4 h-4 text-text-secondary group-data-[state=open]:rotate-180 transition-transform duration-200" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 bg-bg-card border-border-muted rounded-xl shadow-xl p-1">
            <DropdownMenuRadioGroup
              value={status?.value}
              onValueChange={handleStatusChange}
            >
              {statusOptions.map((option) => (
                <DropdownMenuRadioItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer rounded-lg text-sm m-1"
                >
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/complexes/add">
          <AddAction label="افزودن مجموعه" />
        </Link>
      </div>
    </div>
  );
}
