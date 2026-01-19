"use client";

import { useState } from "react";
import {
  Search,
  FileDown,
  Star,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  Package,
  MessageSquare,
  Clock,
  ThumbsUp,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { StatusBadge } from "../ui/StatusBadge";
import type { User as UserType } from "../../lib/types";

interface UsersViewProps {
  data: UserType[];
}

// Mock rental history data
const mockRentalHistory = [
  {
    id: "RNT001",
    equipment_name: "รถแทรกเตอร์ John Deere 5050D",
    lessor_name: "ฟาร์มสุขใจ",
    start_date: "2025-01-05",
    end_date: "2025-01-10",
    total_price: 12500,
    status: "returned",
  },
  {
    id: "RNT002",
    equipment_name: "เครื่องเกี่ยวข้าว Kubota DC70",
    lessor_name: "เกษตรพัฒนา",
    start_date: "2025-01-15",
    end_date: "2025-01-20",
    total_price: 22500,
    status: "active",
  },
  {
    id: "RNT003",
    equipment_name: "โดรนพ่นยา DJI Agras T40",
    lessor_name: "ไฮเทคฟาร์ม",
    start_date: "2024-12-10",
    end_date: "2024-12-12",
    total_price: 7000,
    status: "returned",
  },
  {
    id: "RNT004",
    equipment_name: "เครื่องสูบน้ำ Honda WB30XT",
    lessor_name: "อุปกรณ์การเกษตร",
    start_date: "2024-11-20",
    end_date: "2024-11-25",
    total_price: 2500,
    status: "returned",
  },
];

// Mock reviews data
const mockReviews = [
  {
    id: "REV001",
    equipment_name: "รถแทรกเตอร์ John Deere 5050D",
    rating: 5,
    comment:
      "เครื่องจักรสภาพดีมาก ใช้งานได้ราบรื่น ผู้ให้เช่าบริการดีเยี่ยม แนะนำเลยครับ",
    date: "2025-01-10",
  },
  {
    id: "REV002",
    equipment_name: "โดรนพ่นยา DJI Agras T40",
    rating: 4,
    comment: "โดรนทำงานได้ดี ครอบคลุมพื้นที่ได้เร็ว ประหยัดเวลามาก",
    date: "2024-12-12",
  },
  {
    id: "REV003",
    equipment_name: "เครื่องสูบน้ำ Honda WB30XT",
    rating: 5,
    comment: "แรงดันดี สูบน้ำได้รวดเร็ว คุ้มค่าราคาเช่า",
    date: "2024-11-25",
  },
];

type TabType = "overview" | "rentals" | "reviews";

export function UsersView({ data }: UsersViewProps) {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const filteredUsers = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

  // User List View
  if (!selectedUser) {
    return (
      <div className="space-y-6">
        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="ค้นหาผู้ใช้งาน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>
          <button
            onClick={() => toast.success("ส่งออก CSV เรียบร้อยแล้ว")}
            className="text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors"
          >
            <FileDown className="w-4 h-4" />
            ส่งออก CSV
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-600 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-3">ข้อมูลผู้ใช้งาน</th>
                  <th className="px-6 py-3">บทบาท</th>
                  <th className="px-6 py-3">สถานะ</th>
                  <th className="px-6 py-3">คะแนนความน่าเชื่อถือ</th>
                  <th className="px-6 py-3 text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold mr-3 text-white">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize text-slate-600 dark:text-slate-400">
                      {user.role === "renter" ? "ผู้เช่า" : "ผู้ให้เช่า"}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {user.trust_score}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setActiveTab("overview");
                        }}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
                      >
                        รายละเอียด
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

  // User Detail View
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        กลับไปรายการผู้ใช้งาน
      </button>

      {/* User Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-3xl font-bold text-white">
              {selectedUser.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-white">
                  {selectedUser.name}
                </h2>
                <StatusBadge status={selectedUser.status} />
              </div>
              <p className="text-indigo-100">
                {selectedUser.role === "renter" ? "ผู้เช่า" : "ผู้ให้เช่า"} •
                ID: {selectedUser.id}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="text-center bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-2xl font-bold text-white">
                    {selectedUser.trust_score}
                  </span>
                </div>
                <p className="text-xs text-indigo-100">คะแนนความน่าเชื่อถือ</p>
              </div>
              <div className="text-center bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
                <p className="text-2xl font-bold text-white">
                  {selectedUser.total_rentals}
                </p>
                <p className="text-xs text-indigo-100">การเช่าทั้งหมด</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 flex flex-wrap gap-6">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Mail className="w-4 h-4 text-slate-400" />
            <span>{selectedUser.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Phone className="w-4 h-4 text-slate-400" />
            <span>{selectedUser.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>สมัคร: {selectedUser.registered_at}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "overview"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <User className="w-4 h-4" />
          ภาพรวม
        </button>
        <button
          onClick={() => setActiveTab("rentals")}
          className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "rentals"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Package className="w-4 h-4" />
          ประวัติการเช่า
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "reviews"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          รีวิวสินค้า
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stats */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              สถิติการใช้งาน
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    การเช่าทั้งหมด
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedUser.total_rentals}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    กำลังเช่า
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  1
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-4 h-4 text-purple-500" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    รีวิวที่เขียน
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  3
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <ThumbsUp className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    ค่าเฉลี่ยรีวิว
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    4.7
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Score Detail */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              คะแนนความน่าเชื่อถือ
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {selectedUser.trust_score}
                </span>
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {selectedUser.trust_score >= 90
                    ? "ดีเยี่ยม"
                    : selectedUser.trust_score >= 70
                      ? "ดี"
                      : selectedUser.trust_score >= 50
                        ? "ปานกลาง"
                        : "ต้องปรับปรุง"}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  ผู้ใช้งานที่มีความน่าเชื่อถือสูง
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">
                    การชำระเงินตรงเวลา
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    100%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">
                    การคืนเครื่องจักรตรงเวลา
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    95%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">
                    ไม่มีประวัติความเสียหาย
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    100%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Damage History */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-slate-400" />
              ประวัติความเสียหาย
            </h3>
            <div className="text-center py-8 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
              <ShieldCheck className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                ไม่พบประวัติความเสียหาย
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                ผู้ใช้งานนี้ไม่เคยมีประวัติทำเครื่องจักรเสียหาย
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "rentals" && (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-600 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-3">เลขที่เช่า</th>
                  <th className="px-6 py-3">เครื่องจักร</th>
                  <th className="px-6 py-3">ผู้ให้เช่า</th>
                  <th className="px-6 py-3">ระยะเวลา</th>
                  <th className="px-6 py-3">ราคารวม</th>
                  <th className="px-6 py-3">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {mockRentalHistory.map((rental) => (
                  <tr
                    key={rental.id}
                    className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                      #{rental.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-slate-400" />
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {rental.equipment_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {rental.lessor_name}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      <div className="text-xs">
                        {rental.start_date}
                        <br />
                        ถึง {rental.end_date}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      ฿{rental.total_price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={rental.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-4">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">
                      {review.equipment_name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {review.date}
                    </p>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {selectedUser.status === "active" ? (
          <button
            onClick={() => toast.success("ระงับผู้ใช้งานเรียบร้อยแล้ว")}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-colors"
          >
            ระงับผู้ใช้งาน
          </button>
        ) : (
          <button
            onClick={() => toast.success("ยกเลิกการระงับเรียบร้อยแล้ว")}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium transition-colors"
          >
            ยกเลิกการระงับ
          </button>
        )}
        <button
          onClick={() => toast.success("ส่งข้อความเรียบร้อยแล้ว")}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors"
        >
          ส่งข้อความ
        </button>
      </div>
    </div>
  );
}
