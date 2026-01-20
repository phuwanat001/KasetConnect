"use client";

import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingBag,
  Calendar,
  Clock,
  ArrowRight,
  MoreHorizontal,
} from "lucide-react";

import type { DashboardData, LessorView } from "../../lib/types";

interface DashboardViewProps {
  data: DashboardData;
  onViewBooking?: (id: string) => void;
  onNavigate?: (view: LessorView) => void;
}

export function DashboardView({
  data,
  onViewBooking,
  onNavigate,
}: DashboardViewProps) {
  const { stats, recentBookings, topProducts } = data;

  const statCards = [
    {
      label: "รายได้เดือนนี้",
      value: `฿${stats.monthlyRevenue.toLocaleString()}`,
      trend: "+12.5%",
      subLabel: "เทียบกับเดือนที่แล้ว",
      trendUp: true,
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "การจองรออนุมัติ",
      value: stats.pendingBookings,
      trend: "4 รายการ",
      subLabel: "ที่ต้องดำเนินการ",
      trendUp: true,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "สินค้าทั้งหมด",
      value: stats.totalProducts,
      trend: "+2",
      subLabel: "เพิ่มขึ้นจากเดือนก่อน",
      trendUp: true,
      icon: ShoppingBag,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "กำลังถูกเช่า",
      value: stats.activeRentals,
      trend: "85%",
      subLabel: "อัตราการปล่อยเช่า",
      trendUp: true,
      icon: Calendar,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {stat.trend && (
                  <span
                    className={`flex items-center text-xs font-medium ${
                      stat.trendUp
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.trendUp ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {stat.trend}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <p className="text-xs text-slate-400 mt-1">{stat.subLabel}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              การจองล่าสุด
            </h3>
            <button
              onClick={() => onNavigate?.("calendar")}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
            >
              ดูทั้งหมด <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 font-medium">
                <tr>
                  <th className="py-3 px-6">รายการเช่า</th>
                  <th className="py-3 px-6">ผู้เช่า</th>
                  <th className="py-3 px-6">วันที่ใช้</th>
                  <th className="py-3 px-6">ราคา</th>
                  <th className="py-3 px-6">สถานะ</th>
                  <th className="py-3 px-6 text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    onClick={() => onViewBooking?.(booking.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.productImage}
                          alt={booking.productName}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                        />
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">
                            {booking.productName}
                          </div>
                          <div className="text-xs text-slate-500">
                            #{booking.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {booking.customerName}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {new Date(booking.startDate).toLocaleDateString("th-TH", {
                        day: "numeric",
                        month: "short",
                      })}{" "}
                      -{" "}
                      {new Date(booking.endDate).toLocaleDateString("th-TH", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      ฿{booking.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {booking.status === "pending_payment" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                          รอชำระมัดจำ
                        </span>
                      ) : booking.status === "payment_verification" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          รอตรวจสอบ
                        </span>
                      ) : booking.status === "confirmed" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                          ยืนยันแล้ว
                        </span>
                      ) : booking.status === "in_progress" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                          กำลังใช้งาน
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                          {booking.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors">
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
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">
            สินค้าทำเงินสูงสุด
          </h3>
          <div className="space-y-6">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-500">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 dark:text-white text-sm">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                    <span>เช่า {product.totalRentals} ครั้ง</span>
                    <span>•</span>
                    <span className="text-amber-500 flex items-center">
                      {product.rating} ★
                    </span>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-emerald-600 text-sm">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => onNavigate?.("products")}
              className="w-full py-2.5 text-sm font-medium text-slate-600 hover:text-emerald-600 border border-slate-200 hover:border-emerald-200 rounded-xl transition-colors"
            >
              ดูรายงานฉบับเต็ม
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
