"use client";

import { X, Leaf, LogOut } from "lucide-react";
import { SidebarLink, navIcons } from "./SidebarLink";
import type { AdminView } from "../../lib/types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: AdminView;
  onNavigate: (view: AdminView) => void;
  pendingLessors?: number;
  unreadNotifications?: number;
}

const navItems: { id: AdminView; label: string }[] = [
  { id: "dashboard", label: "ภาพรวมระบบ" },
  { id: "categories", label: "หมวดหมู่สินค้า" },
  { id: "users", label: "ผู้ใช้งาน" },
  { id: "lessors", label: "ผู้ให้เช่า" },
  { id: "rentals", label: "รายการเช่า" },
  { id: "marketplace", label: "ตลาดสินค้า" },
  { id: "notifications", label: "การแจ้งเตือน" },
  { id: "ai", label: "จัดการ AI" },
];

export function Sidebar({
  isOpen,
  onClose,
  currentView,
  onNavigate,
  pendingLessors = 0,
  unreadNotifications = 0,
}: SidebarProps) {
  // Build nav items with icons and badges
  const itemsWithIconsAndBadges = navItems.map((item) => ({
    ...item,
    icon: navIcons[item.id],
    badge:
      item.id === "lessors"
        ? pendingLessors
        : item.id === "notifications"
          ? unreadNotifications
          : undefined,
  }));

  const handleNavigate = (view: AdminView) => {
    onNavigate(view);
    // Close sidebar on mobile after navigation
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-700 shrink-0">
          <div className="flex items-center gap-3">
            <Leaf className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
            <span className="text-xl font-bold tracking-wide text-slate-900 dark:text-white">
              KasetConnect
            </span>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {itemsWithIconsAndBadges.map((item) => (
            <SidebarLink
              key={item.id}
              item={item}
              isActive={currentView === item.id}
              onClick={handleNavigate}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff"
                alt="Admin"
                className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-600 shrink-0"
              />
              <div className="truncate">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  ผู้ดูแลระบบ
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Super Admin
                </p>
              </div>
            </div>
            <button
              className="text-slate-400 hover:text-red-500 transition-colors p-2 flex items-center gap-2"
              title="Logout"
            >
              <span className="text-xs font-medium hidden lg:inline">ออก</span>
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
