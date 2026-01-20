"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  FileText,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Receipt,
  MapPin,
} from "lucide-react";

import type { Booking, BookingStatus } from "../../lib/types";

interface RentalDetailViewProps {
  booking: Booking;
  onBack: () => void;
  onUpdateStatus: (id: string, newStatus: BookingStatus) => void;
}

export function RentalDetailView({
  booking,
  onBack,
  onUpdateStatus,
}: RentalDetailViewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSlipModal, setShowSlipModal] = useState(false);

  const handleAction = (status: BookingStatus) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onUpdateStatus(booking.id, status);
      setIsSubmitting(false);
      setShowSlipModal(false);
    }, 1000);
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "pending_payment":
        return {
          color: "bg-amber-100 text-amber-700 border-amber-200",
          icon: Clock,
          label: "รอชำระเงินมัดจำ",
        };
      case "payment_verification":
        return {
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: FileText,
          label: "รอตรวจสอบสลิป",
        };
      case "confirmed":
        return {
          color: "bg-emerald-100 text-emerald-700 border-emerald-200",
          icon: CheckCircle,
          label: "ยืนยันแล้ว",
        };
      case "in_progress":
        return {
          color: "bg-purple-100 text-purple-700 border-purple-200",
          icon: Calendar,
          label: "กำลังใช้งาน",
        };
      case "completed":
        return {
          color: "bg-slate-100 text-slate-700 border-slate-200",
          icon: CheckCircle,
          label: "เสร็จสิ้น",
        };
      case "cancelled":
        return {
          color: "bg-red-50 text-red-700 border-red-100",
          icon: XCircle,
          label: "ยกเลิกแล้ว",
        };
      case "rejected":
        return {
          color: "bg-red-50 text-red-700 border-red-100",
          icon: XCircle,
          label: "ปฏิเสธการจอง",
        };
      default:
        return { color: "bg-slate-100", icon: Clock, label: status };
    }
  };

  const statusInfo = getStatusBadge(booking.status);
  const StatusIcon = statusInfo.icon;

  const durationDays =
    Math.ceil(
      (new Date(booking.endDate).getTime() -
        new Date(booking.startDate).getTime()) /
        (1000 * 60 * 60 * 24),
    ) + 1;

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-300" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            รายละเอียดการเช่า #{booking.id}
          </h1>
          <p className="text-sm text-slate-500">
            สร้างเมื่อ{" "}
            {new Date(booking.createdAt).toLocaleString("th-TH", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </p>
        </div>
        <div
          className={`ml-auto px-4 py-1.5 rounded-full border flex items-center gap-2 text-sm font-semibold ${statusInfo.color}`}
        >
          <StatusIcon className="w-4 h-4" />
          {statusInfo.label}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Product Info */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-500" />
              ข้อมูลการเช่า
            </h3>
            <div className="flex gap-4 mb-6">
              <img
                src={booking.productImage}
                alt={booking.productName}
                className="w-24 h-24 rounded-xl object-cover bg-slate-100"
              />
              <div className="flex-1">
                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                  {booking.productName}
                </h4>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 mt-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span>
                      {new Date(booking.startDate).toLocaleDateString("th-TH")}{" "}
                      - {new Date(booking.endDate).toLocaleDateString("th-TH")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>{durationDays} วัน</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  ค่าเช่ารายวัน
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  RunTime Calculation...
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  จำนวนวันเช่า
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {durationDays} วัน
                </span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-slate-900 dark:text-white">
                  ราคารวมทั้งสิ้น
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  ฿{booking.totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium pt-2 border-t border-dashed border-slate-300 dark:border-slate-600">
                <span className="text-slate-600 dark:text-slate-300">
                  มัดจำที่ต้องชำระ (30%)
                </span>
                <span className="text-slate-900 dark:text-white">
                  ฿
                  {(
                    booking.depositAmount || booking.totalPrice * 0.3
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-500" />
                ข้อมูลผู้เช่า
              </h3>
              {booking.notes && (
                <div className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-lg font-medium border border-amber-100 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  มีหมายเหตุ
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  {booking.customerName}
                </p>
                <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {booking.customerPhone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> ไม่ระบุที่อยู่
                  </span>
                </div>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors border border-emerald-100">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors border border-blue-100">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>

            {booking.notes && (
              <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm text-slate-600 dark:text-slate-300 italic">
                "{booking.notes}"
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Payment & Verification */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm sticky top-24">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-500" />
              การชำระเงินมัดจำ
            </h3>

            {booking.status === "payment_verification" ? (
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-blue-700 dark:text-blue-300">
                        รอการตรวจสอบ
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        ผู้เช่าแจ้งโอนเงินมาแล้ว กรุณาตรวจสอบสลิปก่อนอนุมัติ
                      </p>
                    </div>
                  </div>
                </div>

                {booking.paymentEvidence && (
                  <div
                    className="relative aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 cursor-pointer group"
                    onClick={() => setShowSlipModal(true)}
                  >
                    <img
                      src={booking.paymentEvidence}
                      alt="Slip"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium flex items-center gap-1">
                        <Receipt className="w-3 h-3" />
                        ดูรูปเต็ม
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => handleAction("confirmed")}
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        ยืนยันยอดเงินถูกต้อง
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleAction("rejected")}
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-red-600 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    หลักฐานไม่ถูกต้อง
                  </button>
                </div>
              </div>
            ) : booking.status === "confirmed" ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-emerald-600 text-lg">
                    ชำระมัดจำแล้ว
                  </p>
                  <p className="text-sm text-slate-500">
                    ตรวจสอบเรียบร้อยเมื่อ{" "}
                    {new Date().toLocaleDateString("th-TH")}
                  </p>
                </div>
                <button className="text-sm text-emerald-600 underline">
                  ดูหลักฐานการโอน
                </button>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                <Clock className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">ยังไม่มีการแจ้งชำระเงิน</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slip Modal */}
      {showSlipModal && booking.paymentEvidence && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowSlipModal(false)}
        >
          <div
            className="relative max-w-lg w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-500" />
                หลักฐานการโอน
              </h3>
              <button
                onClick={() => setShowSlipModal(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <XCircle className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            <div className="p-0 bg-slate-100 dark:bg-black flex items-center justify-center">
              <img
                src={booking.paymentEvidence}
                alt="Slip Full"
                className="max-h-[60vh] object-contain"
              />
            </div>
            <div className="p-4 flex gap-3">
              <button
                onClick={() => handleAction("confirmed")}
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-colors"
              >
                ถูกต้อง (อนุมัติ)
              </button>
              <button className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
