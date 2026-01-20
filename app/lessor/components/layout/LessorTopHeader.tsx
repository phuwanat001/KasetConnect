"use client";

import { Bell, Menu, MessageSquare, Plus, Search } from "lucide-react";

interface LessorTopHeaderProps {
  onMenuClick: () => void;
  title: string;
}

export function LessorTopHeader({ onMenuClick, title }: LessorTopHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 w-full px-4 sm:px-6 bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 backdrop-blur-sm supports-backdrop-filter:bg-white/60">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick Add Button */}
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20">
          <Plus className="w-4 h-4" />
          <span>เพิ่มเครื่องจักร</span>
        </button>

        <button className="sm:hidden p-2 text-white bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20">
          <Plus className="w-5 h-5" />
        </button>

        {/* Search - Mobile Hidden */}
        <div className="hidden md:flex items-center px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-transparent focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหา..."
            className="bg-transparent border-none focus:ring-0 text-sm w-48 text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>

        {/* Notifications */}
        <div className="flex items-center gap-1 sm:gap-2 border-l border-slate-200 dark:border-slate-700 pl-3 sm:pl-4">
          <button className="relative p-2 text-slate-500 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>

          <button className="relative p-2 text-slate-500 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* Profile Dropdown */}
          <button className="ml-2 flex items-center gap-2 p-1 pl-2 pr-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900 dark:text-white leading-none">
                สมชาย
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                ร้านค้า
              </p>
            </div>
            <img
              src="https://ui-avatars.com/api/?name=Somchai&background=10b981&color=fff"
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
