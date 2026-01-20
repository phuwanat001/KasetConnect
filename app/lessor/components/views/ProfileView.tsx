"use client";

import {
  User,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Building2,
  Camera,
  Save,
  CheckCircle,
  Plus,
} from "lucide-react";
import type { ProfileData } from "../../lib/types";

interface ProfileViewProps {
  data: ProfileData;
}

export function ProfileView({ data }: ProfileViewProps) {
  const { profile } = data;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header / Cover */}
      <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden bg-slate-900 group">
        <img
          src={
            profile.coverImage ||
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200"
          }
          alt="Cover"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/20" />
        <button className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
          <Camera className="w-4 h-4" />
          เปลี่ยนรูปปก
        </button>
      </div>

      <div className="relative px-4 sm:px-6 -mt-20">
        <div className="flex flex-col md:flex-row items-end md:items-center gap-6">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.ownerName}
              className="w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-950 shadow-xl object-cover bg-white"
            />
            <button className="absolute bottom-2 right-2 p-1.5 bg-emerald-500 text-white rounded-lg shadow-lg hover:bg-emerald-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 pb-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4 md:mt-0">
              {profile.businessName}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-slate-500 dark:text-slate-400">
              <User className="w-4 h-4" />
              <span>เจ้าของ: {profile.ownerName}</span>
              <span className="mx-1">•</span>
              <span>
                สมาชิกตั้งแต่ {new Date(profile.memberSince).getFullYear()}
              </span>
            </div>
          </div>
          <div className="flex gap-3 pb-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-emerald-500/20">
              <Save className="w-4 h-4" />
              บันทึกการแก้ไข
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Left Column: Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-500" />
              ข้อมูลทั่วไป
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  ชื่อร้านค้า / ธุรกิจ
                </label>
                <input
                  type="text"
                  defaultValue={profile.businessName}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  คำอธิบายร้านค้า
                </label>
                <textarea
                  defaultValue={profile.description}
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    อีเมล
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      defaultValue={profile.email}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    เบอร์โทรศัพท์
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      defaultValue={profile.phone}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  ที่อยู่
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    defaultValue={`${profile.address} ${profile.district} ${profile.province} ${profile.postalCode}`}
                    rows={2}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">
              พื้นที่ให้บริการ
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.serviceAreas.map((area) => (
                <button
                  key={area.provinceId}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    area.isActive
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400"
                      : "bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
                  }`}
                >
                  {area.provinceName}
                </button>
              ))}
              <button className="px-3 py-1.5 rounded-lg text-sm font-medium border border-dashed border-slate-300 text-slate-500 hover:border-emerald-500 hover:text-emerald-500 transition-colors flex items-center gap-1">
                <Plus className="w-3 h-3" />
                เพิ่มพื้นที่
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Verification & Hours */}
        <div className="space-y-6">
          {/* Verification Status */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              การยืนยันตัวตน
            </h3>

            <div
              className={`p-4 rounded-xl mb-4 ${
                profile.isVerified
                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300"
                  : "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300"
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {profile.isVerified ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
                {profile.isVerified ? "ยืนยันตัวตนแล้ว" : "รอการตรวจสอบ"}
              </div>
              <p className="text-xs opacity-80">
                {profile.isVerified
                  ? "บัญชีของคุณสามารถลงประกาศเช่าได้ตามปกติ"
                  : "กรุณาอัปโหลดเอกสารเพื่อยืนยันตัวตน"}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  เอกสารที่ส่งแล้ว
                </p>
                <ul className="space-y-2">
                  {profile.verificationDocuments.map((doc, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between text-sm p-2 bg-slate-50 dark:bg-slate-800 rounded-lg"
                    >
                      <span className="text-slate-600 dark:text-slate-400">
                        {doc}
                      </span>
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-500" />
              เวลาทำการ
            </h3>
            <div className="space-y-3">
              {profile.operatingHours.map((hour) => (
                <div
                  key={hour.day}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="w-16 font-medium text-slate-700 dark:text-slate-300">
                    {hour.day}
                  </span>
                  {hour.isOpen ? (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {hour.openTime} - {hour.closeTime}
                    </span>
                  ) : (
                    <span className="text-slate-400">ปิดทำการ</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
