"use client";

import {
  LayoutDashboard,
  Tags,
  Users,
  Tractor,
  FileText,
  Bell,
  Bot,
  Store,
} from "lucide-react";
import type { AdminView } from "../../lib/types";
import type { ReactNode } from "react";

interface NavItemConfig {
  id: AdminView;
  label: string;
  icon: ReactNode;
  badge?: number;
}

interface SidebarLinkProps {
  item: NavItemConfig;
  isActive: boolean;
  onClick: (view: AdminView) => void;
}

export function SidebarLink({ item, isActive, onClick }: SidebarLinkProps) {
  const baseClass =
    "flex items-center justify-between py-2.5 px-4 rounded-lg transition-colors duration-200 group cursor-pointer";

  const activeClass = isActive
    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"
    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white";

  return (
    <button
      onClick={() => onClick(item.id)}
      className={`${baseClass} ${activeClass} w-full text-left`}
    >
      <div className="flex items-center gap-3">
        <span className="w-5">{item.icon}</span>
        <span className="text-sm font-medium">{item.label}</span>
      </div>
      {item.badge !== undefined && item.badge > 0 && (
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {item.badge}
        </span>
      )}
    </button>
  );
}

// Export icon map for use in Sidebar
export const navIcons: Record<AdminView, ReactNode> = {
  dashboard: <LayoutDashboard className="w-5 h-5" />,
  categories: <Tags className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  lessors: <Tractor className="w-5 h-5" />,
  rentals: <FileText className="w-5 h-5" />,
  marketplace: <Store className="w-5 h-5" />,
  notifications: <Bell className="w-5 h-5" />,
  ai: <Bot className="w-5 h-5" />,
};
