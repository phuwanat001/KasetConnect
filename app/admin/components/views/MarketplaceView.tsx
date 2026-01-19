"use client";

import { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Star,
  Eye,
  Package,
  CheckCircle,
  Clock,
  Wrench,
  X,
  Store,
  ArrowLeft,
  Phone,
  Mail,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import { StatusBadge } from "../ui/StatusBadge";
import type { MarketplaceData, MarketplaceItem } from "../../lib/types";

interface MarketplaceViewProps {
  data: MarketplaceData;
}

type FilterType = "all" | "available" | "rented" | "maintenance";

const filterLabels: Record<FilterType, string> = {
  all: "ทั้งหมด",
  available: "พร้อมให้เช่า",
  rented: "กำลังเช่า",
  maintenance: "ซ่อมบำรุง",
};

interface LessorInfo {
  id: string;
  name: string;
  itemCount: number;
  availableCount: number;
  rentedCount: number;
  totalRating: number;
  reviewCount: number;
  locations: string[];
  items: MarketplaceItem[];
}

export function MarketplaceView({ data }: MarketplaceViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(
    null,
  );
  const [selectedLessor, setSelectedLessor] = useState<string | null>(null);
  const [productFilter, setProductFilter] = useState<FilterType>("all");

  // Build lessor info with aggregated data
  const lessors = useMemo(() => {
    const lessorMap = new Map<string, LessorInfo>();

    data.items.forEach((item) => {
      if (lessorMap.has(item.lessor_id)) {
        const existing = lessorMap.get(item.lessor_id)!;
        existing.itemCount++;
        if (item.status === "available") existing.availableCount++;
        if (item.status === "rented") existing.rentedCount++;
        existing.totalRating += item.rating;
        existing.reviewCount += item.total_reviews;
        if (!existing.locations.includes(item.location)) {
          existing.locations.push(item.location);
        }
        existing.items.push(item);
      } else {
        lessorMap.set(item.lessor_id, {
          id: item.lessor_id,
          name: item.lessor_name,
          itemCount: 1,
          availableCount: item.status === "available" ? 1 : 0,
          rentedCount: item.status === "rented" ? 1 : 0,
          totalRating: item.rating,
          reviewCount: item.total_reviews,
          locations: [item.location],
          items: [item],
        });
      }
    });

    return Array.from(lessorMap.values());
  }, [data.items]);

  // Filter lessors by search term
  const filteredLessors = lessors.filter(
    (lessor) =>
      lessor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lessor.locations.some((loc) =>
        loc.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  // Get selected lessor data
  const currentLessor = selectedLessor
    ? lessors.find((l) => l.id === selectedLessor)
    : null;

  // Filter products for selected lessor
  const filteredProducts = currentLessor
    ? productFilter === "all"
      ? currentLessor.items
      : currentLessor.items.filter((item) => item.status === productFilter)
    : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="w-4 h-4" />;
      case "rented":
        return <Clock className="w-4 h-4" />;
      case "maintenance":
        return <Wrench className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  // Render Shop/Lessor List
  if (!selectedLessor) {
    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg">
                <Store className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ร้านค้าทั้งหมด
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {lessors.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  สินค้าทั้งหมด
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {data.summary.total}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  พร้อมให้เช่า
                </p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {data.summary.available}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  กำลังเช่า
                </p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {data.summary.rented}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาร้านค้า, สถานที่..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          />
        </div>

        {/* Lessor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredLessors.map((lessor) => (
            <div
              key={lessor.id}
              onClick={() => setSelectedLessor(lessor.id)}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-md dark:hover:border-slate-700 transition-all cursor-pointer group"
            >
              {/* Shop Header */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Store className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {lessor.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {lessor.locations.join(", ")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shop Stats */}
              <div className="p-5">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {lessor.itemCount}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      สินค้า
                    </p>
                  </div>
                  <div className="text-center border-x border-slate-100 dark:border-slate-800">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {lessor.availableCount}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      พร้อมให้เช่า
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-lg font-bold text-slate-900 dark:text-white">
                        {(lessor.totalRating / lessor.itemCount).toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {lessor.reviewCount} รีวิว
                    </p>
                  </div>
                </div>

                <button className="w-full py-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg font-medium text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  ดูร้านค้า
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredLessors.length === 0 && (
          <div className="text-center py-12">
            <Store className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">
              ไม่พบร้านค้าที่ค้นหา
            </p>
          </div>
        )}
      </div>
    );
  }

  // Render Shop Detail Page
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => {
          setSelectedLessor(null);
          setProductFilter("all");
        }}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        กลับไปรายการร้านค้า
      </button>

      {/* Shop Header Card */}
      {currentLessor && (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Store className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {currentLessor.name}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-indigo-100">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {currentLessor.locations.join(", ")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {(
                      currentLessor.totalRating / currentLessor.itemCount
                    ).toFixed(1)}{" "}
                    ({currentLessor.reviewCount} รีวิว)
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-center bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
                  <p className="text-2xl font-bold text-white">
                    {currentLessor.itemCount}
                  </p>
                  <p className="text-xs text-indigo-100">สินค้าทั้งหมด</p>
                </div>
                <div className="text-center bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-300">
                    {currentLessor.availableCount}
                  </p>
                  <p className="text-xs text-indigo-100">พร้อมให้เช่า</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shop Contact Info */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <User className="w-4 h-4 text-slate-400" />
              <span>
                ผู้ให้เช่า: <strong>{currentLessor.name}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>
                โทร: <strong>08X-XXX-XXXX</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>
                อีเมล: <strong>contact@example.com</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Product Filter & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {(Object.keys(filterLabels) as FilterType[]).map((key) => (
            <button
              key={key}
              onClick={() => setProductFilter(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                productFilter === key
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {filterLabels[key]}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts
          .filter(
            (item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.category.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-md dark:hover:border-slate-700 transition-all cursor-pointer"
            >
              {/* Image Placeholder */}
              <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                <Package className="w-16 h-16 text-slate-400 dark:text-slate-500" />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2">
                    {item.name}
                  </h3>
                  <StatusBadge status={item.status} />
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    {item.rating} ({item.total_reviews})
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      ราคา/วัน
                    </p>
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      ฿{item.price_per_day.toLocaleString()}
                    </p>
                  </div>
                  <button className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors">
                    <Eye className="w-4 h-4" />
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400">
            ไม่พบสินค้าในหมวดหมู่นี้
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && setSelectedItem(null)}
        >
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                รายละเอียดสินค้า
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center mb-6">
                <Package className="w-20 h-20 text-slate-400 dark:text-slate-500" />
              </div>

              {/* Title & Status */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {selectedItem.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {selectedItem.category}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedItem.status)}
                  <StatusBadge status={selectedItem.status} />
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {selectedItem.description}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ราคาเช่า/วัน
                  </p>
                  <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    ฿{selectedItem.price_per_day.toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ผู้ให้เช่า
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {selectedItem.lessor_name}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    สถานที่
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {selectedItem.location}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    คะแนนรีวิว
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {selectedItem.rating} ({selectedItem.total_reviews} รีวิว)
                  </p>
                </div>
              </div>

              {/* Specifications */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                  ข้อมูลจำเพาะ
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedItem.specifications.brand && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        ยี่ห้อ
                      </span>
                      <span className="text-slate-900 dark:text-white">
                        {selectedItem.specifications.brand}
                      </span>
                    </div>
                  )}
                  {selectedItem.specifications.model && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        รุ่น
                      </span>
                      <span className="text-slate-900 dark:text-white">
                        {selectedItem.specifications.model}
                      </span>
                    </div>
                  )}
                  {selectedItem.specifications.year && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        ปี
                      </span>
                      <span className="text-slate-900 dark:text-white">
                        {selectedItem.specifications.year}
                      </span>
                    </div>
                  )}
                  {selectedItem.specifications.condition && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        สภาพ
                      </span>
                      <span className="text-slate-900 dark:text-white">
                        {selectedItem.specifications.condition}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-slate-50 dark:bg-slate-800 px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors"
              >
                ปิด
              </button>
              <button
                onClick={() => {
                  setSelectedItem(null);
                  toast.success("บันทึกการจัดการสินค้าเรียบร้อยแล้ว");
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm font-medium transition-colors"
              >
                จัดการสินค้า
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
