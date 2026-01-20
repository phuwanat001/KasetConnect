"use client";

import {
  LayoutDashboard,
  CalendarDays,
  Package,
  Store,
  History,
  UserCircle,
  LogOut,
  X,
  Leaf,
} from "lucide-react";

import type { LessorView } from "../../lib/types";

interface LessorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: LessorView;
  onNavigate: (view: LessorView) => void;
  pendingBookings?: number;
}

const navItems: { id: LessorView; label: string; icon: any }[] = [
  { id: "dashboard", label: "ภาพรวม", icon: LayoutDashboard },
  { id: "calendar", label: "ปฏิทินการจอง", icon: CalendarDays },
  { id: "products", label: "จัดการเครื่องจักร", icon: Package },
  { id: "marketplace", label: "ตลาดเช่า", icon: Store },
  { id: "rentals", label: "ประวัติการเช่า", icon: History },
  { id: "profile", label: "ข้อมูลร้านค้า", icon: UserCircle },
];

export function LessorSidebar({
  isOpen,
  onClose,
  currentView,
  onNavigate,
  pendingBookings = 0,
}: LessorSidebarProps) {
  const handleNavigate = (view: LessorView) => {
    onNavigate(view);
    if (window.innerWidth < 768) {
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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
            <div className="p-1.5 rounded-lg bg-linear-to-br from-emerald-500 to-teal-500">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span>
              Kaset<span className="text-emerald-500">Lessor</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
            เมนูหลัก
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.id === "calendar" && pendingBookings > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {pendingBookings}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">ออกจากระบบ</span>
          </button>
        </div>
      </aside>
    </>
  );
}
