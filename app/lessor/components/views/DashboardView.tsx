"use client";

import {
  Package,
  TrendingUp,
  CreditCard,
  Calendar,
  MoreHorizontal,
  ArrowUpRight,
  Clock,
} from "lucide-react";

import type { DashboardData } from "../../lib/types";

interface DashboardViewProps {
  data: DashboardData;
}

export function DashboardView({ data }: DashboardViewProps) {
  const { stats, recentBookings, topProducts } = data;

  const statCards = [
    {
      label: "รายได้เดือนนี้",
      value: `฿${stats.monthlyRevenue.toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      icon: CreditCard,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "การจองรออนุมัติ",
      value: stats.pendingBookings,
      change: "ต้องดำเนินการ",
      trend: "neutral",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "เครื่องจักรทั้งหมด",
      value: stats.totalProducts,
      change: "+2 รายการ",
      trend: "up",
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "กำลังเช่าอยู่",
      value: stats.activeRentals,
      change: "ใช้งานอยู่",
      trend: "neutral",
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            สวัสดี, คุณสมชาย 👋
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            ภาพรวมธุรกิจและการเช่าเครื่องจักรของคุณวันนี้
          </p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
            <option>7 วันล่าสุด</option>
            <option>เดือนนี้</option>
            <option>3 เดือนล่าสุด</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div
                  className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.trend === "up"
                      ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                      : "text-slate-600 bg-slate-100 dark:bg-slate-800"
                  }`}
                >
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              การจองล่าสุด
            </h3>
            <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
              ดูทั้งหมด
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-3 pl-2">รายการเช่า</th>
                  <th className="pb-3">ผู้เช่า</th>
                  <th className="pb-3">วันที่ใช้</th>
                  <th className="pb-3">ราคา</th>
                  <th className="pb-3">สถานะ</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.productImage}
                          alt={booking.productName}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                        />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white text-sm">
                            {booking.productName}
                          </p>
                          <p className="text-xs text-slate-500">
                            #{booking.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-slate-600 dark:text-slate-300">
                      {booking.customerName}
                    </td>
                    <td className="py-4 text-sm text-slate-600 dark:text-slate-300">
                      {new Date(booking.startDate).toLocaleDateString("th-TH", {
                        day: "numeric",
                        month: "short",
                      })}
                      {" - "}
                      {new Date(booking.endDate).toLocaleDateString("th-TH", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="py-4 text-sm font-medium text-slate-900 dark:text-white">
                      ฿{booking.totalPrice.toLocaleString()}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === "pending"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                            : booking.status === "confirmed"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              : booking.status === "in_progress"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                        }`}
                      >
                        {booking.status === "pending"
                          ? "รออนุมัติ"
                          : booking.status === "confirmed"
                            ? "ยืนยันแล้ว"
                            : booking.status === "in_progress"
                              ? "กำลังใช้งาน"
                              : "สำเร็จ"}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-2">
                      <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              เครื่องจักรยอดนิยม
            </h3>
            <button className="text-xs font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-400">
              เดือนนี้
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-sm text-slate-500">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    เช่า {product.totalRentals} ครั้ง • {product.rating} ⭐
                  </p>
                </div>
                <div className="text-right">
                  <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            ดูรายงานฉบับเต็ม
          </button>
        </div>
      </div>
    </div>
  );
}
