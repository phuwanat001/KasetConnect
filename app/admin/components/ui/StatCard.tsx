import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor?: string;
  iconDarkBgColor?: string;
  iconColor?: string;
  iconDarkColor?: string;
  valueColor?: string;
}

export function StatCard({
  title,
  value,
  icon,
  iconBgColor = "bg-indigo-100",
  iconDarkBgColor = "dark:bg-indigo-900/40",
  iconColor = "text-indigo-600",
  iconDarkColor = "dark:text-indigo-400",
  valueColor = "text-slate-900 dark:text-white",
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 flex items-center justify-between transition-colors duration-200">
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </p>
        <p className={`text-3xl font-bold mt-1 ${valueColor}`}>{value}</p>
      </div>
      <div
        className={`p-3 rounded-full ${iconBgColor} ${iconDarkBgColor} ${iconColor} ${iconDarkColor} transition-colors duration-200`}
      >
        {icon}
      </div>
    </div>
  );
}
