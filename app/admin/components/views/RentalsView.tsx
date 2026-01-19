"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Eye,
  Check,
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  Calendar,
  CreditCard,
  User,
  Clock,
  MapPin,
  Download,
  Receipt,
  Truck,
  Phone,
  Mail,
  ChevronRight,
  ShieldCheck,
  Banknote,
  Search,
  Filter,
  FileCheck,
} from "lucide-react";
import toast from "react-hot-toast";

// --- Types ---
export type RentalStatus = "pending" | "active" | "returned" | "damaged";

export interface Rental {
  id: string;
  status: RentalStatus;
  equipment_name: string;
  renter_name: string;
  lessor_name: string;
  start_date: string;
  end_date: string;
  total_price: number;
  deposit: number;
  damage_note?: string;
}

export interface RentalsData {
  items: Rental[];
}

// --- Internal Components ---

const StatusBadge = ({ status }: { status: RentalStatus }) => {
  const styles: Record<RentalStatus, string> = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700",
    active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-700",
    returned:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-700",
    damaged:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-700",
  };

  const labels: Record<RentalStatus, string> = {
    pending: "รอดำเนินการ",
    active: "กำลังเช่า",
    returned: "คืนแล้ว",
    damaged: "แจ้งปัญหา",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm ${className}`}
  >
    {children}
  </div>
);

const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
    <Icon className="w-4 h-4 text-indigo-500" />
    {title}
  </h3>
);

interface RentalsViewProps {
  data: RentalsData;
  initialRentalId?: string | null;
}

type FilterType = "all" | "pending" | "active" | "returned" | "damaged";

const filterLabels: Record<FilterType, string> = {
  all: "ทั้งหมด",
  pending: "รอดำเนินการ",
  active: "กำลังเช่า",
  returned: "คืนแล้ว",
  damaged: "แจ้งปัญหา",
};

export function RentalsView({ data, initialRentalId }: RentalsViewProps) {
  const [rentals, setRentals] = useState<Rental[]>(data.items);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  // Auto-select rental if initialRentalId is provided
  useState(() => {
    if (initialRentalId) {
      const found = rentals.find((r) => r.id === initialRentalId);
      if (found) {
        setSelectedRental(found);
      }
    }
  });

  // --- Logic ---
  const filteredItems =
    activeFilter === "all"
      ? rentals
      : rentals.filter((item) => item.status === activeFilter);

  const handleStatusChange = (id: string, newStatus: Rental["status"]) => {
    setRentals(
      rentals.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    );
    if (selectedRental?.id === id) {
      setSelectedRental({ ...selectedRental, status: newStatus });
    }
    toast.success("อัปเดตสถานะเรียบร้อยแล้ว");
    setActionMenu(null);
  };

  // --- Sub-Views ---

  // 1. DETAIL VIEW
  if (selectedRental) {
    const mockDetails = {
      bookingDate: "15 ต.ค. 2024, 10:30",
      returnDate:
        selectedRental.status === "returned" ? "25 ต.ค. 2024, 16:00" : "-",
      damageFee: selectedRental.status === "damaged" ? 5000 : 0,
      damagePaid: true,
    };

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6 pb-10">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedRental(null)}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Rental #{selectedRental.id}
                </h1>
                <StatusBadge status={selectedRental.status} />
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                <Clock className="w-3.5 h-3.5" /> จองเมื่อ{" "}
                {mockDetails.bookingDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Actions Toolbar */}
            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> ใบเสร็จ
            </button>

            {selectedRental.status === "pending" && (
              <button
                onClick={() => handleStatusChange(selectedRental.id, "active")}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
              >
                <Check className="w-4 h-4" /> อนุมัติการเช่า
              </button>
            )}
            {selectedRental.status === "active" && (
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleStatusChange(selectedRental.id, "damaged")
                  }
                  className="px-4 py-2 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" /> แจ้งปัญหา
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(selectedRental.id, "returned")
                  }
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" /> รับคืนสินค้า
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 1. SECTION: PRODUCT & PARTIES DETAIL (Top Priority) */}
        <Card className="p-6">
          <SectionHeader
            icon={Truck}
            title="รายละเอียดเครื่องจักรและคู่สัญญา"
          />
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Equipment Image & Basic Info */}
            <div className="shrink-0">
              <div className="w-full md:w-48 h-32 md:h-full bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1532509176465-3885d58f338d?auto=format&fit=crop&q=80&w=400"
                  alt="Equipment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Middle: Equipment Specs & Lessor */}
            <div className="flex-1 space-y-4 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 pb-4 md:pb-0 md:pr-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {selectedRental.equipment_name}
                  <span className="text-xs font-normal px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full border border-slate-200 dark:border-slate-700">
                    #{selectedRental.id}
                  </span>
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Serial Number: KB-2024-8899 • Model: Kubota L5018
                </p>
              </div>

              <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-indigo-600 font-bold">
                  {selectedRental.lessor_name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">
                    ผู้ปล่อยเช่า (Lessor)
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {selectedRental.lessor_name}
                  </p>
                </div>
                <div className="ml-auto flex gap-2">
                  <button className="p-2 hover:bg-white dark:hover:bg-slate-600 rounded-full transition-colors text-slate-400 hover:text-indigo-600">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-white dark:hover:bg-slate-600 rounded-full transition-colors text-slate-400 hover:text-indigo-600">
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Renter Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-500" />
                  ผู้เช่า (Renter)
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
                    {selectedRental.renter_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {selectedRental.renter_name}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <ShieldCheck className="w-3 h-3" /> ยืนยันตัวตนแล้ว
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-500 mb-0.5">เบอร์โทรศัพท์</p>
                  <p className="font-medium text-slate-700 dark:text-slate-300">
                    081-234-5678
                  </p>
                </div>
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-500 mb-0.5">อีเมล</p>
                  <p className="font-medium text-slate-700 dark:text-slate-300 truncate">
                    somchai@email.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN: 2. PROCESS RENTAL (Timeline) & 4. DAMAGE */}
          <div className="lg:col-span-2 space-y-6">
            {/* 2. Timeline Card */}
            <Card className="p-6">
              <SectionHeader
                icon={Calendar}
                title="Timeline การเช่า (Process)"
              />
              <div className="relative pl-2 space-y-8 before:absolute before:inset-0 before:ml-2 before:w-0.5 before:-translate-x-1/2 before:bg-slate-200 dark:before:bg-slate-800 before:h-full">
                {/* Step 1 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-500 z-10 shadow-sm"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        ทำรายการจอง
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5">
                        ผ่าน Mobile Application
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      {mockDetails.bookingDate}
                    </span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative pl-8">
                  <div
                    className={`absolute left-0 top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 z-10 shadow-sm ${selectedRental.status !== "pending" ? "border-green-500 bg-green-500" : "border-slate-300"}`}
                  ></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p
                        className={`font-semibold ${selectedRental.status !== "pending" ? "text-slate-900 dark:text-white" : "text-slate-400"}`}
                      >
                        วันเริ่มเช่า (รับรถ)
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5">
                        รับรถที่ศูนย์ขอนแก่น
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      {selectedRental.start_date}
                    </span>
                  </div>
                </div>

                {/* Step 3: End Date */}
                <div className="relative pl-8">
                  <div
                    className={`absolute left-0 top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 z-10 shadow-sm ${["returned", "damaged"].includes(selectedRental.status) ? "border-blue-500 bg-blue-500" : "border-slate-300"}`}
                  ></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p
                        className={`font-semibold ${["returned", "damaged"].includes(selectedRental.status) ? "text-slate-900 dark:text-white" : "text-slate-400"}`}
                      >
                        วันสิ้นสุดการเช่า
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5">
                        กำหนดส่งคืน
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      {selectedRental.end_date}
                    </span>
                  </div>
                </div>

                {/* Step 4: Actual Return (Conditional) */}
                {selectedRental.status === "returned" && (
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-green-500 z-10 shadow-sm"></div>
                    <div className="flex justify-between items-start p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/20">
                      <div>
                        <p className="font-bold text-green-900 dark:text-green-400 flex items-center gap-2">
                          <Check className="w-4 h-4" /> คืนสำเร็จ
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-500 mt-0.5">
                          ตรวจสอบสภาพเรียบร้อย
                        </p>
                      </div>
                      <span className="text-xs font-mono text-green-700 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                        {mockDetails.returnDate}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* 4. Damage Report (Conditional) */}
            {selectedRental.status === "damaged" && (
              <Card className="p-6 border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/5">
                <SectionHeader icon={AlertTriangle} title="รายงานความเสียหาย" />
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-red-100 dark:border-red-900/30">
                      <p className="text-sm font-medium text-red-900 dark:text-red-400 mb-1">
                        รายละเอียดความเสียหาย
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {selectedRental.damage_note ||
                          "รอยขีดข่วนขนาดใหญ่ที่กันชนหน้าซ้าย และไฟหน้าแตกเสียหายจากการชนวัสดุแข็งระหว่างการใช้งาน"}
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-48 bg-white dark:bg-slate-900 rounded-lg border border-red-100 dark:border-red-900/30 p-4 flex flex-col items-center justify-center text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                      ค่าปรับประเมิน
                    </p>
                    <p className="text-2xl font-bold text-red-600 my-1">
                      ฿{mockDetails.damageFee.toLocaleString()}
                    </p>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> ชำระแล้ว
                    </span>
                  </div>
                </div>

                {mockDetails.damagePaid && (
                  <div className="mt-6 pt-6 border-t border-red-200 dark:border-red-900/30 flex items-start gap-4">
                    <div
                      className="w-20 h-28 bg-white dark:bg-slate-900 rounded-lg border border-red-200 dark:border-red-900/30 overflow-hidden cursor-pointer hover:shadow-md transition-all relative group"
                      onClick={() => toast("View Damage Slip", { icon: "🔍" })}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200"
                        alt="Damage Payment Slip"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center transition-all">
                        <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 drop-shadow-md" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-green-600" />
                        หลักฐานการชำระค่าเสียหาย
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        โอนผ่าน KBANK x-9988
                      </p>
                      <p className="text-xs text-slate-400">
                        25 ต.ค. 2024, 14:30
                      </p>
                      <button
                        onClick={() =>
                          toast("View Damage Slip", { icon: "🔍" })
                        }
                        className="text-xs text-indigo-600 font-medium hover:underline mt-2 flex items-center gap-1"
                      >
                        คลิกดูรูปภาพ
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* RIGHT COLUMN: 3. TOTAL & SLIPS */}
          <div className="lg:col-span-1 space-y-6">
            {/* Financial Summary */}
            <Card className="p-6 sticky top-6">
              <SectionHeader icon={CreditCard} title="สรุปยอดชำระ (Total)" />
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">
                    ค่าเช่า ({selectedRental.total_price / 5} x 5 วัน)
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    ฿{selectedRental.total_price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">
                    ค่ามัดจำ{" "}
                    <span className="text-xs text-indigo-500">
                      (คืนเมื่อจบ)
                    </span>
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    ฿{selectedRental.deposit.toLocaleString()}
                  </span>
                </div>
                {selectedRental.status === "damaged" && (
                  <div className="flex justify-between items-center text-sm text-red-600">
                    <span>หักค่าเสียหาย</span>
                    <span className="font-medium">
                      -฿{mockDetails.damageFee.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    ยอดสุทธิ
                  </span>
                  <span className="text-xl font-bold text-indigo-600">
                    ฿
                    {(
                      selectedRental.total_price + selectedRental.deposit
                    ).toLocaleString()}
                  </span>
                </div>

                {/* Payment Proof Thumbnail */}
                <div className="pt-4 mt-2">
                  <p className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" /> หลักฐานการโอน (Slips)
                  </p>
                  <div
                    onClick={() =>
                      toast("View Slip Fullscreen", { icon: "🔍" })
                    }
                    className="group relative h-32 w-full rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400"
                      alt="slip"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <Eye className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-center text-slate-500">
                    ชำระเมื่อ 15 ต.ค., 10:35
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // 2. LIST VIEW
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
        {(Object.keys(filterLabels) as FilterType[]).map((key) => {
          const count =
            key === "all"
              ? rentals.length
              : rentals.filter((r) => r.status === key).length;
          return (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === key
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {filterLabels[key]}
              <span
                className={`ml-2 text-xs opacity-80 px-1.5 py-0.5 rounded-md ${activeFilter === key ? "bg-indigo-500" : "bg-slate-100 dark:bg-slate-800"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold">
              <tr>
                <th className="px-6 py-4">เครื่องจักร / รายการ</th>
                <th className="px-6 py-4">คู่สัญญา</th>
                <th className="px-6 py-4">ช่วงเวลา</th>
                <th className="px-6 py-4">ยอดรวม</th>
                <th className="px-6 py-4">สถานะ</th>
                <th className="px-6 py-4 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredItems.map((rental) => (
                <tr
                  key={rental.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedRental(rental)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {rental.equipment_name}
                        </p>
                        <p className="text-xs font-mono text-slate-500">
                          #{rental.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div
                          className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300"
                          title={rental.renter_name}
                        >
                          {rental.renter_name.charAt(0)}
                        </div>
                        <div
                          className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-medium text-indigo-600 dark:text-indigo-300"
                          title={rental.lessor_name}
                        >
                          {rental.lessor_name.charAt(0)}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-900 dark:text-white">
                          {rental.renter_name}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          From {rental.lessor_name}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col text-xs">
                      <span className="text-slate-900 dark:text-white font-medium">
                        {rental.start_date}
                      </span>
                      <span className="text-slate-500">
                        ถึง {rental.end_date}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900 dark:text-white">
                      ฿{rental.total_price.toLocaleString()}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={rental.status} />
                  </td>

                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActionMenu(
                          actionMenu === rental.id ? null : rental.id,
                        );
                      }}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {/* Compact Dropdown */}
                    {actionMenu === rental.id && (
                      <div className="absolute right-10 top-8 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 z-50 py-1 animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-2 py-1.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider pl-2">
                            Actions
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRental(rental);
                            setActionMenu(null);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4 text-slate-400" />{" "}
                          ดูรายละเอียด
                        </button>
                        {rental.status === "pending" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(rental.id, "active");
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" /> อนุมัติ
                          </button>
                        )}
                        {rental.status === "active" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(rental.id, "returned");
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 flex items-center gap-2"
                          >
                            <RefreshCw className="w-4 h-4" /> รับคืน
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            แสดง 1-{filteredItems.length} จาก {rentals.length} รายการ
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-xs font-medium text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
              ก่อนหน้า
            </button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-xs font-medium text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800">
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
