"use client";

import { useState, useEffect } from "react";
import {
  Star,
  Eye,
  X,
  Check,
  Ban,
  ArrowLeft,
  Store,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  Package,
  MessageSquare,
  ShieldCheck,
  Globe,
} from "lucide-react";
import toast from "react-hot-toast";
import { StatusBadge } from "../ui/StatusBadge";
import type { LessorsData, Lessor, MarketplaceItem } from "../../lib/types";
import { getMarketplaceData } from "../../lib/mockData";

interface LessorsViewProps {
  data: LessorsData;
}

type TabType = "overview" | "inventory" | "reviews" | "documents";

// Mock reviews data
const mockReviews = [
  {
    id: "REV001",
    writer_name: "สมชาย ใจดี",
    rating: 5,
    comment: "บริการดีมาก เครื่องจักรสภาพใหม่ แนะนำเลยครับ",
    date: "2025-01-15",
  },
  {
    id: "REV002",
    writer_name: "วิชัย การเกษตร",
    rating: 4,
    comment: "ส่งรถตรงเวลา แต่ราคาค่อนข้างสูงนิดนึง",
    date: "2024-12-20",
  },
  {
    id: "REV003",
    writer_name: "Mana Farm",
    rating: 5,
    comment: "ประทับใจมากครับ มีโอกาสจะใช้บริการอีกแน่นอน",
    date: "2024-11-05",
  },
];

// Mock documents data
const mockDocuments = [
  {
    id: "DOC001",
    name: "ใบทะเบียนพาณิชย์",
    type: "PDF",
    status: "verified",
    date: "2024-01-10",
  },
  {
    id: "DOC002",
    name: "บัตรประชาชนเจ้าของ",
    type: "JPG",
    status: "verified",
    date: "2024-01-10",
  },
  {
    id: "DOC003",
    name: "โฉนดที่ดิน (ร้านค้า)",
    type: "PDF",
    status: "pending",
    date: "2024-01-12",
  },
];

export function LessorsView({ data }: LessorsViewProps) {
  const [lessors, setLessors] = useState<Lessor[]>(data.items);
  const [summary, setSummary] = useState(data.summary);
  const [selectedLessor, setSelectedLessor] = useState<Lessor | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>(
    [],
  );
  const [actionModal, setActionModal] = useState<{
    type: "suspend" | "unsuspend" | null;
    lessorId: string | null;
  }>({
    type: null,
    lessorId: null,
  });

  // Load marketplace Items when a lessor is selected
  useEffect(() => {
    if (selectedLessor) {
      const allItems = getMarketplaceData().items;
      const lessorItems = allItems.filter(
        (item) => item.lessor_id === selectedLessor.id,
      );
      setMarketplaceItems(lessorItems);
    }
  }, [selectedLessor]);

  const updateSummary = (items: Lessor[]) => {
    setSummary({
      pending: items.filter((l) => l.status === "pending").length,
      active: items.filter((l) => l.status === "approved").length,
      suspended: items.filter((l) => l.status === "suspended").length,
    });
  };

  const handleApprove = (id: string) => {
    const updatedLessors = lessors.map((l) =>
      l.id === id
        ? {
            ...l,
            status: "approved" as const,
            verified_at: new Date().toISOString().split("T")[0],
          }
        : l,
    );
    setLessors(updatedLessors);
    updateSummary(updatedLessors);
    if (selectedLessor && selectedLessor.id === id) {
      setSelectedLessor({
        ...selectedLessor,
        status: "approved",
        verified_at: new Date().toISOString().split("T")[0],
      });
    }
    toast.success("อนุมัติผู้ให้เช่าเรียบร้อยแล้ว");
  };

  const handleReject = (id: string) => {
    const updatedLessors = lessors.filter((l) => l.id !== id);
    setLessors(updatedLessors);
    updateSummary(updatedLessors);
    if (selectedLessor && selectedLessor.id === id) {
      setSelectedLessor(null);
    }
    toast.success("ปฏิเสธคำขอผู้ให้เช่าแล้ว");
  };

  const handleSuspend = (id: string) => {
    const updatedLessors = lessors.map((l) =>
      l.id === id
        ? {
            ...l,
            status: "suspended" as const,
            suspended_at: new Date().toISOString().split("T")[0],
          }
        : l,
    );
    setLessors(updatedLessors);
    updateSummary(updatedLessors);
    if (selectedLessor && selectedLessor.id === id) {
      setSelectedLessor({
        ...selectedLessor,
        status: "suspended",
        suspended_at: new Date().toISOString().split("T")[0],
      });
    }
    setActionModal({ type: null, lessorId: null });
    toast.success("ระงับผู้ให้เช่าเรียบร้อยแล้ว");
  };

  const handleUnsuspend = (id: string) => {
    const updatedLessors = lessors.map((l) =>
      l.id === id
        ? {
            ...l,
            status: "approved" as const,
            suspended_at: undefined,
            suspended_reason: undefined,
          }
        : l,
    );
    setLessors(updatedLessors);
    updateSummary(updatedLessors);
    if (selectedLessor && selectedLessor.id === id) {
      setSelectedLessor({
        ...selectedLessor,
        status: "approved",
        suspended_at: undefined,
      });
    }
    setActionModal({ type: null, lessorId: null });
    toast.success("ยกเลิกการระงับเรียบร้อยแล้ว");
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-slate-300 dark:text-slate-600"
            }`}
          />
        ))}
      </div>
    );
  };

  // -------------------------
  // LIST VIEW
  // -------------------------
  if (!selectedLessor) {
    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm dark:shadow-none border-l-4 border-yellow-400 transition-colors">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">
              รอการอนุมัติ
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {summary.pending}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm dark:shadow-none border-l-4 border-green-500 transition-colors">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">
              ผู้ให้เช่าที่ใช้งานอยู่
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {summary.active}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm dark:shadow-none border-l-4 border-red-500 transition-colors">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">
              ถูกระงับการใช้งาน
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {summary.suspended}
            </p>
          </div>
        </div>

        {/* Lessors Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-600 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3">ชื่อธุรกิจ</th>
                <th className="px-6 py-3">จำนวนเครื่องจักร</th>
                <th className="px-6 py-3">เรตติ้ง</th>
                <th className="px-6 py-3">สถานะ</th>
                <th className="px-6 py-3 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {lessors.map((lessor) => (
                <tr
                  key={lessor.id}
                  className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 dark:text-white">
                      {lessor.business_name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      ติดต่อ: {lessor.contact_person}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                    {lessor.equipment_count}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-slate-700 dark:text-slate-300">
                        {lessor.rating.toFixed(1)} / 5.0
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={lessor.status} />
                  </td>
                  <td className="px-6 py-4 text-right space-x-1">
                    {lessor.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleApprove(lessor.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          อนุมัติ
                        </button>
                        <button
                          onClick={() => handleReject(lessor.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1"
                        >
                          <X className="w-3 h-3" />
                          ปฏิเสธ
                        </button>
                      </>
                    ) : lessor.status === "suspended" ? (
                      <button
                        onClick={() =>
                          setActionModal({
                            type: "unsuspend",
                            lessorId: lessor.id,
                          })
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      >
                        ยกเลิกระงับ
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setSelectedLessor(lessor);
                            setActiveTab("overview");
                          }}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-xs border border-indigo-300 dark:border-indigo-600 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          ดู
                        </button>
                        <button
                          onClick={() =>
                            setActionModal({
                              type: "suspend",
                              lessorId: lessor.id,
                            })
                          }
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-xs border border-red-300 dark:border-red-600 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Ban className="w-3 h-3" />
                          ระงับ
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Suspend/Unsuspend Confirmation Modal (List View) */}
        {actionModal.type && actionModal.lessorId && (
          <div className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-800 w-full max-w-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {actionModal.type === "suspend"
                  ? "ยืนยันการระงับ"
                  : "ยืนยันยกเลิกการระงับ"}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {actionModal.type === "suspend"
                  ? "คุณแน่ใจหรือไม่ที่จะระงับผู้ให้เช่านี้?"
                  : "คุณแน่ใจหรือไม่ที่จะยกเลิกการระงับผู้ให้เช่านี้?"}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setActionModal({ type: null, lessorId: null })}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() =>
                    actionModal.type === "suspend"
                      ? handleSuspend(actionModal.lessorId!)
                      : handleUnsuspend(actionModal.lessorId!)
                  }
                  className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
                    actionModal.type === "suspend"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {actionModal.type === "suspend" ? "ระงับ" : "ยกเลิกระงับ"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------
  // DETAIL VIEW (Full Page)
  // -------------------------
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Back Button */}
      <button
        onClick={() => setSelectedLessor(null)}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        กลับไปรายการผู้ให้เช่า
      </button>

      {/* Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              <Store className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-white">
                  {selectedLessor.business_name}
                </h2>
                <StatusBadge status={selectedLessor.status} />
              </div>
              <p className="text-indigo-100 flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4" />
                Bangkok, Thailand (Mock)
              </p>
            </div>
            <div className="flex gap-3">
              <div className="text-center bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-2xl font-bold text-white">
                    {selectedLessor.rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-xs text-indigo-100">คะแนนร้านค้า</p>
              </div>
              <div className="text-center bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
                <p className="text-2xl font-bold text-white">
                  {marketplaceItems.length}
                </p>
                <p className="text-xs text-indigo-100">สินค้าทั้งหมด</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 px-6 bg-slate-50 dark:bg-slate-800/50">
          {[
            {
              id: "overview",
              label: "ภาพรวม",
              icon: <Store className="w-4 h-4" />,
            },
            {
              id: "inventory",
              label: "สินค้าในคลัง",
              icon: <Package className="w-4 h-4" />,
            },
            {
              id: "reviews",
              label: "รีวิวร้านค้า",
              icon: <MessageSquare className="w-4 h-4" />,
            },
            {
              id: "documents",
              label: "เอกสาร",
              icon: <FileText className="w-4 h-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 rounded-t-lg"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-t-lg"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Store className="w-5 h-5 text-indigo-600" />
                ข้อมูลการติดต่อ
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full">
                    <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      ผู้ติดต่อ
                    </p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {selectedLessor.contact_person}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      เบอร์โทรศัพท์
                    </p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {selectedLessor.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      อีเมล
                    </p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {selectedLessor.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full">
                    <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      วันที่สมัคร
                    </p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {selectedLessor.applied_at || "1 ม.ค. 2024"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                สถานะการยืนยันตัวตน
              </h3>
              <div className="space-y-4">
                <div className="p-4 border border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-700 dark:text-green-400">
                      ยืนยันตัวตนแล้ว
                    </span>
                  </div>
                  <p className="text-sm text-green-800 dark:text-green-300">
                    ร้านค้านี้ผ่านการตรวจสอบเอกสารและยืนยันตัวตนเรียบร้อยแล้วเมื่อ{" "}
                    {selectedLessor.verified_at || "15 ม.ค. 2024"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      100%
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      อัตราการตอบกลับ
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {selectedLessor.total_rentals}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      เช่าสำเร็จ (ครั้ง)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-600" />
                รายการสินค้า ({marketplaceItems.length})
              </span>
            </h3>
            {marketplaceItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketplaceItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white dark:bg-slate-800 group"
                  >
                    <div className="h-32 bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <Package className="w-10 h-10 text-slate-300 dark:text-slate-500" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                          {item.name}
                        </h4>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                        {item.category}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">
                          ฿{item.price_per_day.toLocaleString()}/วัน
                        </span>
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          {item.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                ไม่มีรายการสินค้า
              </div>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 p-5"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                      <span className="font-bold text-xs text-slate-600 dark:text-slate-300">
                        {review.writer_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {review.writer_name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  {renderStars(review.rating)}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm pl-10">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "documents" && (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-300">
                  ระบบตรวจสอบยืนยันตัวตน (KYC Verification)
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  กรุณาตรวจสอบข้อมูลเอกสารเทียบกับข้อมูลที่ผู้ใช้งานกรอก
                  หากถูกต้องให้กดอนุมัติ
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Document Images */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      รูปถ่ายบัตรประชาชน (Front)
                    </h4>
                  </div>
                  <div className="p-6 bg-slate-100 dark:bg-slate-950 flex items-center justify-center min-h-[250px]">
                    {/* Placeholder for ID Card Image */}
                    <div className="relative w-full max-w-md aspect-[1.586/1] bg-slate-300 dark:bg-slate-800 rounded-lg shadow-inner flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                      <div className="absolute inset-4 border-2 border-dashed border-slate-400 dark:border-slate-600 rounded flex items-center justify-center">
                        <span className="text-sm">รูปถ่ายหน้าบัตรประชาชน</span>
                      </div>
                      {/* Simulation of an image content */}
                      <div className="w-20 h-20 bg-slate-400/50 rounded-full mb-2 z-10"></div>
                      <div className="w-3/4 h-4 bg-slate-400/50 rounded z-10 mb-2"></div>
                      <div className="w-1/2 h-4 bg-slate-400/50 rounded z-10"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      รูปถ่ายคู่กับบัตร (Selfie with ID)
                    </h4>
                  </div>
                  <div className="p-6 bg-slate-100 dark:bg-slate-950 flex items-center justify-center min-h-[300px]">
                    {/* Placeholder for Selfie Image */}
                    <div className="relative w-full max-w-xs aspect-[3/4] bg-slate-300 dark:bg-slate-800 rounded-lg shadow-inner flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                      <div className="absolute inset-4 border-2 border-dashed border-slate-400 dark:border-slate-600 rounded flex items-center justify-center">
                        <span className="text-sm">รูปถ่าย Selfie</span>
                      </div>
                      <div className="w-24 h-24 bg-slate-400/50 rounded-full mb-4 z-10"></div>
                      <div className="w-32 h-20 bg-slate-400/50 rounded z-10 transform -rotate-3 border-2 border-white/20"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Data Comparison */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 h-fit sticky top-6">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    ข้อมูลสำหรับตรวจสอบ (Verification Data)
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    เปรียบเทียบข้อมูลที่ผู้ใช้งานระบุกับเอกสารแนบ
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  {/* Name Comparison */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      ชื่อ-นามสกุล (ตามบัตรประชาชน)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={selectedLessor.contact_person} // Assuming this matches ID name for mock
                        className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-4 py-2 text-slate-900 dark:text-white font-medium focus:ring-0"
                      />
                      <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                        <Check className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Phone Comparison */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      เบอร์โทรศัพท์
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={selectedLessor.phone}
                        className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-4 py-2 text-slate-900 dark:text-white font-medium focus:ring-0"
                      />
                      <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                        <Check className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Partial ID Comparison */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      เลขบัตรประชาชน (บางส่วน)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value="1-2345-XXXXX-89-0" // Mock partial ID
                        className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-4 py-2 text-slate-900 dark:text-white font-medium focus:ring-0 tracking-wider"
                      />
                      <div className="flex items-center justify-center w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      * แสดงเฉพาะตัวแรกและตัวท้ายเพื่อความปลอดภัย
                    </p>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800 my-6"></div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                        <ShieldCheck className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-900 dark:text-white text-sm">
                          คำแนะนำจากระบบ AI
                        </h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          ใบหน้าในรูปถ่าย Selfie ตรงกับรูปในบัตรประชาชน 98.5%
                          (High Confidence)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Bar (Only for Detail View) */}
      <div className="sticky bottom-4 z-20 flex justify-end gap-3">
        {selectedLessor.status === "approved" ? (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 flex gap-3">
            <button
              onClick={() =>
                setActionModal({ type: "suspend", lessorId: selectedLessor.id })
              }
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium shadow-sm transition-transform active:scale-95 flex items-center gap-2"
            >
              <Ban className="w-4 h-4" />
              ระงับบัญชี
            </button>
          </div>
        ) : selectedLessor.status === "pending" ? (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 flex gap-3">
            <button
              onClick={() => handleReject(selectedLessor.id)}
              className="px-6 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              ปฏิเสธ
            </button>
            <button
              onClick={() => handleApprove(selectedLessor.id)}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium shadow-sm transition-transform active:scale-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              อนุมัติ
            </button>
          </div>
        ) : (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 flex gap-3">
            <button
              onClick={() => handleUnsuspend(selectedLessor.id)}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium shadow-sm transition-transform active:scale-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              ยกเลิกการระงับ
            </button>
          </div>
        )}
      </div>

      {/* Suspend/Unsuspend Config (Detail View - same modal state reused) */}
      {actionModal.type && actionModal.lessorId && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-800 w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {actionModal.type === "suspend"
                ? "ยืนยันการระงับ"
                : "ยืนยันยกเลิกการระงับ"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {actionModal.type === "suspend"
                ? "คุณแน่ใจหรือไม่ที่จะระงับผู้ให้เช่านี้?"
                : "คุณแน่ใจหรือไม่ที่จะยกเลิกการระงับผู้ให้เช่านี้?"}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActionModal({ type: null, lessorId: null })}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={() =>
                  actionModal.type === "suspend"
                    ? handleSuspend(actionModal.lessorId!)
                    : handleUnsuspend(actionModal.lessorId!)
                }
                className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
                  actionModal.type === "suspend"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {actionModal.type === "suspend" ? "ระงับ" : "ยกเลิกระงับ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
