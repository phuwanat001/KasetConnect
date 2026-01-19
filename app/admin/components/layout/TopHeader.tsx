"use client";

import { Menu, Sun, Moon, Bell, Search } from "lucide-react";
import { useTheme } from "../ThemeProvider";

interface TopHeaderProps {
  onMenuClick: () => void;
}

export function TopHeader({ onMenuClick }: TopHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-slate-900 shadow-sm dark:shadow-none border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-10 shrink-0 transition-colors duration-200">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus:outline-none transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Search Input (hidden on mobile) */}
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหา..."
            className="pl-10 pr-4 py-2 w-48 lg:w-64 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
          title={
            theme === "light"
              ? "เปลี่ยนเป็นโหมดกลางคืน"
              : "เปลี่ยนเป็นโหมดกลางวัน"
          }
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        {/* User Avatar */}
        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-700">
          <img
            src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff"
            alt="Admin"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden lg:inline">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
