"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, Search, User, LayoutGrid } from "lucide-react";

const navItems = [
  { href: "/", label: "หน้าแรก", icon: Home },
  { href: "/marketplace", label: "ตลาด", icon: Store },
  { href: "/search", label: "ค้นหา", icon: Search },
  { href: "/categories", label: "หมวดหมู่", icon: LayoutGrid },
  { href: "/profile", label: "โปรไฟล์", icon: User },
];

export function BottomNavBar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[60px] py-1.5 px-2 rounded-xl transition-all ${
                isActive
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-emerald-100 dark:bg-emerald-900/50 scale-110"
                    : ""
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              </div>
              <span
                className={`text-[10px] mt-0.5 font-medium ${
                  isActive ? "text-emerald-600 dark:text-emerald-400" : ""
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
