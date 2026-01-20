"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  FileText,
} from "lucide-react";

import type { BookingsData, Booking, BookingStatus } from "../../lib/types";

interface BookingCalendarViewProps {
  data: BookingsData;
  onViewBooking?: (id: string) => void;
}

export function BookingCalendarView({
  data,
  onViewBooking,
}: BookingCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Calendar Logic
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getBookingsForDay = (day: number) => {
    const dateStr = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    )
      .toISOString()
      .split("T")[0];

    return data.bookings.filter((booking) => {
      return booking.startDate <= dateStr && booking.endDate >= dateStr;
    });
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "pending_payment":
        return "bg-amber-100 text-amber-800 border-amber-500 dark:bg-amber-900/30 dark:text-amber-300";
      case "payment_verification":
        return "bg-blue-100 text-blue-800 border-blue-500 dark:bg-blue-900/30 dark:text-blue-300";
      case "confirmed":
        return "bg-emerald-100 text-emerald-800 border-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "in_progress":
        return "bg-purple-100 text-purple-800 border-purple-500 dark:bg-purple-900/30 dark:text-purple-300";
      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-800 border-red-500 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-slate-100 text-slate-600 border-slate-400 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  const getStatusLabel = (status: BookingStatus) => {
    switch (status) {
      case "pending_payment":
        return "รอชำระเงิน";
      case "payment_verification":
        return "รอตรวจสอบ";
      case "confirmed":
        return "ยืนยันแล้ว";
      case "in_progress":
        return "กำลังใช้งาน";
      case "completed":
        return "เสร็จสิ้น";
      case "cancelled":
        return "ยกเลิก";
      case "rejected":
        return "ปฏิเสธ";
      default:
        return status;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-10rem)]">
      {/* Calendar Section */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
        {/* Calendar Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {currentDate.toLocaleDateString("th-TH", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="flex gap-1">
              <button
                onClick={prevMonth}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="text-sm font-medium text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            วันนี้
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((day, i) => (
            <div
              key={day}
              className={`py-3 text-center text-sm font-medium ${
                i === 0 || i === 6
                  ? "text-red-500 dark:text-red-400"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 auto-rows-fr overflow-y-auto">
          {/* Empty cells for previous month */}
          {[...Array(firstDay)].map((_, i) => (
            <div
              key={`empty-${i}`}
              className="border-b border-r border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/20"
            />
          ))}

          {/* Days */}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const dayBookings = getBookingsForDay(day);
            const isCurrentDay = isToday(day);

            return (
              <div
                key={day}
                className={`min-h-[100px] border-b border-r border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors p-2 relative group flex flex-col ${
                  isCurrentDay ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                }`}
                onClick={() => {
                  // setSelectedDay(day)...
                }}
              >
                <span
                  className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1 ${
                    isCurrentDay
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {day}
                </span>

                <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                  {dayBookings.map((booking) => (
                    <button
                      key={booking.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBooking(booking);
                      }}
                      className={`text-xs px-1.5 py-1 rounded truncate text-left border-l-2 transition-all hover:brightness-95 w-full ${getStatusColor(booking.status)}`}
                    >
                      {booking.status === "pending_payment" && "⏳ "}
                      {booking.status === "payment_verification" && "📝 "}
                      {booking.customerName}
                    </button>
                  ))}
                  {dayBookings.length === 0 && (
                    <div className="flex-1" /> /* Spacer */
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar / Details Panel */}
      <div className="w-full lg:w-80 flex flex-col gap-6">
        {/* Selected Booking Details */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 flex flex-col h-full">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-emerald-500" />
            รายละเอียดการจอง
          </h3>

          {selectedBooking ? (
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
              {/* Product Info */}
              <div className="flex gap-3">
                <img
                  src={selectedBooking.productImage}
                  alt={selectedBooking.productName}
                  className="w-16 h-16 rounded-lg object-cover bg-slate-100"
                />
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">
                    #{selectedBooking.id}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white leading-tight">
                    {selectedBooking.productName}
                  </h4>
                  <div className="mt-2 text-xs font-medium">
                    <span
                      className={`px-2 py-0.5 rounded-md border ${getStatusColor(selectedBooking.status)}`}
                    >
                      {getStatusLabel(selectedBooking.status)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 py-3 border-t border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {selectedBooking.customerName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {selectedBooking.customerPhone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-900 dark:text-white">
                      {new Date(selectedBooking.startDate).toLocaleDateString(
                        "th-TH",
                        { dateStyle: "long" },
                      )}
                      {" - "}
                    </p>
                    <p className="text-sm text-slate-900 dark:text-white">
                      {new Date(selectedBooking.endDate).toLocaleDateString(
                        "th-TH",
                        { dateStyle: "long" },
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-slate-500 text-sm">ราคารวม</span>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  ฿{selectedBooking.totalPrice.toLocaleString()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-4 flex flex-col gap-2">
                <button
                  onClick={() => onViewBooking?.(selectedBooking.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors shadow-lg shadow-slate-900/10"
                >
                  <FileText className="w-4 h-4" />
                  ดูรายละเอียด & จัดการ
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <CalendarIcon className="w-12 h-12 mb-3 opacity-20" />
              <p className="text-sm">
                เลือกรายการจองในปฏิทิน
                <br />
                เพื่อดูรายละเอียด
              </p>
            </div>
          )}
        </div>

        {/* Quick Legend */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
          <h4 className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
            สถานะ
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-slate-600 dark:text-slate-400">
                รอชำระเงิน
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-slate-600 dark:text-slate-400">
                รอตรวจสอบสลิป
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600 dark:text-slate-400">
                ยืนยันแล้ว
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              <span className="text-slate-600 dark:text-slate-400">
                กำลังดำเนินการ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
