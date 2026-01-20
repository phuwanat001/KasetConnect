"use client";

import { useState } from "react";
import {
  TrendingUp,
  Eye,
  MessageCircle,
  ShoppingBag,
  MoreHorizontal,
  ArrowUpRight,
  Target,
  BarChart2,
} from "lucide-react";

import type { MarketplaceData } from "../../lib/types";

interface MarketplaceViewProps {
  data: MarketplaceData;
}

export function MarketplaceView({ data }: MarketplaceViewProps) {
  const { listings, summary } = data;

  const stats = [
    {
      label: "สินค้าที่ลงขาย",
      value: summary.totalListed,
      icon: ShoppingBag,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "สินค้าแนะนำ (Featured)",
      value: summary.totalFeatured,
      icon: Target,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "ยอดเข้าชมรวม",
      value: summary.totalViews.toLocaleString(),
      icon: Eye,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "การสอบถาม",
      value: summary.totalInquiries,
      icon: MessageCircle,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
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

      {/* Analytics Chart Placeholder */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-500" />
            สถิติการเข้าชมร้านค้า
          </h3>
          <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm px-3 py-1.5 focus:ring-2 focus:ring-emerald-500">
            <option>7 วันล่าสุด</option>
            <option>30 วันล่าสุด</option>
          </select>
        </div>
        <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
          <div className="text-center text-slate-400">
            <BarChart2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>กราฟแสดงยอดเข้าชมและยอดขาย</p>
          </div>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            จัดการสินค้าในตลาด
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  สินค้า
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  สถานะ
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  ยอดเข้าชม
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  การจอง
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Conv. Rate
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {listings.map((item) => (
                <tr
                  key={item.productId}
                  className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                      />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {item.productName}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {item.isFeatured && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                              FEATURED
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.isListed}
                        readOnly
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-slate-600 dark:text-slate-300">
                    {item.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-slate-600 dark:text-slate-300">
                    {item.bookings}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      {item.conversionRate}%
                      <TrendingUp className="w-3 h-3" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
