"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Calendar, Building } from "lucide-react";
import { usePathname } from "next/navigation";
import { Route } from "@/types/owner/routes";

const ROUTES: Route[] = [
  {
    name: "داشبورد",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "مجموعه ها",
    href: "/complexes",
    icon: <Building className="w-5 h-5" />,
  },
  {
    name: "رزو ها",
    href: "/reservations",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    name: "تاریخ ها",
    href: "/calender",
    icon: <Calendar className="w-5 h-5" />,
  },
];

export default function SideBar({
  isMenuOpen,
  toggleMenu,
}: {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}) {
  const pathname = usePathname();

  return (
    <div
      className={`w-64 h-screen z-50 border-e border-border-muted bg-bg-main md:flex md:flex-col md:relative fixed right-0 transition-transform duration-300 ease-in-out ${
        isMenuOpen ? "translate-x-0 " : "translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex flex-col items-center mt-10">
        <Link href="/dashboard" className="flex flex-row gap-2">
          <Image
            className="rounded-full object-contain"
            src="/logo.svg"
            alt="logo"
            width={54}
            height={54}
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">داشبورد</h1>
            <p className="text-sm text-muted-foreground">مدیریت مجموعه</p>
          </div>
        </Link>

        <nav className="mt-10 w-full">
          <ul className="flex flex-col items-center gap-4">
            {ROUTES.map((route) => {
              const isActive = pathname === route.href;

              return (
                <li
                  onClick={() => toggleMenu()}
                  key={route.href}
                  className="w-[90%]"
                >
                  <Link
                    href={route.href}
                    className={`
                      p-3 rounded-xl flex justify-start items-center gap-3
                      transition-colors hover:bg-bg-card/50 font-medium
                      ${
                        isActive
                          ? "bg-bg-card shadow-sm text-accent-primary"
                          : "text-text-secondary hover:text-text-primary"
                      }
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {route.icon}
                    <span>{route.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
