"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Star,
  User,
} from "lucide-react";

import type { RentalsData, Rental } from "../../lib/types";

interface RentalsViewProps {
  data: RentalsData;
  onViewBooking?: (id: string) => void;
}

export function RentalsView({ data, onViewBooking }: RentalsViewProps) {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  const activeRentals = data.rentals.filter(
    (r) => r.status === "active" || r.status === "disputed",
  );

  const historyRentals = data.rentals.filter(
    (r) => r.status === "completed" || r.status === "cancelled",
  );

  const displayedRentals =
    activeTab === "active" ? activeRentals : historyRentals;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-900/50 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "active"
              ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          กำลังดำเนินการ ({activeRentals.length})
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "history"
              ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          ประวัติการเช่า ({historyRentals.length})
        </button>
      </div>

      {/* Rentals List */}
      <div className="space-y-4">
        {displayedRentals.length > 0 ? (
          displayedRentals.map((rental) => (
            <div
              key={rental.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Info */}
                <div className="flex items-start gap-4 lg:w-1/3">
                  <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                    <img
                      src={rental.productImage}
                      alt={rental.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-slate-500">
                        #{rental.id}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          rental.status === "active"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            : rental.status === "completed"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                              : rental.status === "cancelled"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                        }`}
                      >
                        {rental.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      {rental.productName}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(rental.startDate).toLocaleDateString(
                          "th-TH",
                          {
                            day: "numeric",
                            month: "short",
                          },
                        )}
                        {" - "}
                        {new Date(rental.endDate).toLocaleDateString("th-TH", {
                          day: "numeric",
                          month: "short",
                          year: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="flex flex-col justify-center lg:w-1/3 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-6">
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-3">
                    ผู้เช่า
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {rental.customerName}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {rental.customerPhone}
                        </span>
                        <button className="text-emerald-600 hover:text-emerald-700">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment & Actions */}
                <div className="flex flex-col justify-between items-end lg:w-1/3 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-6">
                  <div className="w-full text-right">
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                      ยอดชำระสุทธิ
                    </p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      ฿{rental.totalPrice.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      สถานะการจ่าย:{" "}
                      <span
                        className={
                          rental.paymentStatus === "paid"
                            ? "text-emerald-600 font-medium"
                            : rental.paymentStatus === "partial"
                              ? "text-amber-600 font-medium"
                              : "text-red-600 font-medium"
                        }
                      >
                        {rental.paymentStatus === "paid"
                          ? "จ่ายครบแล้ว"
                          : rental.paymentStatus === "partial"
                            ? "มัดจำแล้ว"
                            : "รอดำเนินการ"}
                      </span>
                    </p>
                  </div>

                  <div className="w-full mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => onViewBooking?.(rental.bookingId)}
                      className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      ดูรายละเอียด
                    </button>
                    {rental.status === "active" && (
                      <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
                        แจ้งคืนเครื่อง
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Review Section if Completed */}
              {rental.review && (
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 -mx-6 -mb-6 px-6 py-4 rounded-b-2xl">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-amber-400">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < (rental.rating || 0) ? "fill-amber-400" : "text-slate-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        รีวิวจากลูกค้า
                      </p>
                      <p className="text-sm text-slate-500 italic">
                        "{rental.review}"
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Clock className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">
              ไม่มีข้อมูลการเช่า
            </h3>
            <p className="text-slate-500">ยังไม่มีรายการเช่าในหมวดหมู่นี้</p>
          </div>
        )}
      </div>
    </div>
  );
}
