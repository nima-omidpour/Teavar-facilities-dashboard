"use client";

import {
  Bell,
  ChevronDown,
  ChevronLeft,
  User,
  LogOut,
  Settings,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Container from "@/components/comon/container";
export default function Header({
  toggleMenu,
  isMenuOpen,
}: {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}) {
  const { setTheme } = useTheme();

  return (
    <header className=" top-0 w-full border-b border-border-muted bg-bg-main/80 backdrop-blur-md select-none">
      <div className="w-full">
        <Container className="flex items-center justify-between !my-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden relative w-10 h-10 rounded-xl hover:bg-bg-elevated/50 transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                    isMenuOpen
                      ? "rotate-45 translate-y-[1px]"
                      : "-translate-y-1"
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                    isMenuOpen
                      ? "-rotate-45 -translate-y-[1px]"
                      : "translate-y-1"
                  }`}
                />
              </div>
            </Button>
          </div>

          {/* <div className="relative w-96">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary opacity-70 pointer-events-none" />
        <Input
          type="text"
          placeholder="جستجوی رزروها، مشتریان یا..."
          className="bg-bg-elevated/50 border-none pr-12 py-2.5 rounded-xl text-text-primary placeholder:text-text-secondary/70 text-sm font-medium focus-visible:ring-1 focus-visible:ring-accent-primary"
        />
      </div> */}

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-text-secondary hover:text-text-primary rounded-full"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-bg-card"></span>
              <span className="sr-only">اعلان‌ها</span>
            </Button>

            <div className="h-8 w-px bg-border-muted/50 mx-2"></div>

            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group flex items-center gap-3 p-1.5 rounded-xl cursor-pointer  focus-visible:ring-0 focus-visible:outline-none transition-colors"
                >
                  <div className="relative w-10 h-10 min-w-10 min-h-10 rounded-full overflow-hidden border border-border-muted bg-accent-primary/10 flex items-center justify-center">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
                      alt="مارکوس"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-text-primary">
                    <div className="hidden md:flex flex-col items-start gap-0.5">
                      <span className="text-sm font-bold leading-none">
                        مارکوس
                      </span>
                      <span className="text-[11px] text-text-secondary font-medium">
                        مدیر مجموعه
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-text-secondary transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="w-56 bg-bg-card border-border-muted rounded-2xl shadow-xl p-2"
              >
                <div className="px-3 py-2 border-b border-border-muted/50 mb-1 md:hidden">
                  <p className="font-bold text-text-primary">مارکوس</p>
                  <p className="text-xs text-text-secondary">مدیر مجموعه</p>
                </div>

                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-text-primary cursor-pointer rounded-xl"
                  >
                    <User className="w-4 h-4 text-text-secondary" />
                    <span>پروفایل کاربری</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-text-primary cursor-pointer rounded-xl"
                  >
                    <Settings className="w-4 h-4 text-text-secondary" />
                    <span>تنظیمات</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center gap-3 px-3 py-2.5 text-sm text-text-primary cursor-pointer rounded-xl">
                    <Sun className="w-4 h-4 text-text-secondary dark:hidden" />
                    <Moon className="w-4 h-4 text-text-secondary hidden dark:block" />
                    <span>ظاهر برنامه</span>
                    <ChevronLeft className="w-4 h-4 mr-auto" />
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-bg-card border-border-muted rounded-xl">
                    <DropdownMenuItem
                      onClick={() => setTheme("light")}
                      className="gap-2 cursor-pointer"
                    >
                      <Sun className="w-4 h-4" />
                      <span>روشن</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setTheme("dark")}
                      className="gap-2 cursor-pointer"
                    >
                      <Moon className="w-4 h-4" />
                      <span>تاریک</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setTheme("system")}
                      className="gap-2 cursor-pointer"
                    >
                      <Monitor className="w-4 h-4" />
                      <span>سیستم</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSeparator className="bg-border-muted/50 my-1" />

                <DropdownMenuItem
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 focus:bg-red-500/10 focus:text-red-500 cursor-pointer rounded-xl"
                  onSelect={(e) => {
                    console.log("Logout clicked");
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  <span>خروج از حساب</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Container>
      </div>
    </header>
  );
}
