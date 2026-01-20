"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
} from "lucide-react";

import type { ProductsData, Product } from "../../lib/types";

interface ProductsViewProps {
  data: ProductsData;
}

export function ProductsView({ data }: ProductsViewProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredProducts = data.products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาเครื่องจักร..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => toast.success("ฟีเจอร์นี้จะเปิดให้ใช้งานเร็วๆ นี้")}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">เพิ่มเครื่องจักร</span>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden bg-slate-100">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                  <button className="p-1.5 bg-white/90 dark:bg-black/50 backdrop-blur-sm rounded-full text-slate-700 dark:text-white hover:bg-emerald-500 hover:text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                {product.isFeatured && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    แนะนำ
                  </div>
                )}
                <div className="absolute bottom-2 right-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-lg backdrop-blur-sm ${
                      product.status === "active"
                        ? "bg-emerald-500/90 text-white"
                        : product.status === "maintenance"
                          ? "bg-amber-500/90 text-white"
                          : "bg-slate-500/90 text-white"
                    }`}
                  >
                    {product.status === "active"
                      ? "พร้อมเช่า"
                      : product.status === "maintenance"
                        ? "กำลังซ่อม"
                        : "ไม่ว่าง"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className="font-bold text-slate-900 dark:text-white line-clamp-1"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400">ราคาเช่า</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      ฿{product.price.toLocaleString()}{" "}
                      <span className="text-xs font-normal text-slate-500">
                        / {product.priceUnit}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 text-sm">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-xs text-slate-400">
                      ({product.reviewCount})
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                  แก้ไข
                </button>
                <button
                  className={`flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                    product.isListed
                      ? "text-emerald-600 dark:text-emerald-400 hover:bg-white dark:hover:bg-slate-700"
                      : "text-slate-400 hover:bg-white dark:hover:bg-slate-700"
                  }`}
                >
                  {product.isListed ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                  {product.isListed ? "แสดง" : "ซ่อน"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  ชื่อเครื่องจักร
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  สถานะ
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  ราคา
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  เรตติ้ง
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                      />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {product.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {product.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === "active"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : product.status === "maintenance"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                            : "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300"
                      }`}
                    >
                      {product.status === "active"
                        ? "พร้อมเช่า"
                        : product.status === "maintenance"
                          ? "กำลังซ่อม"
                          : "ไม่ว่าง"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    ฿{product.price.toLocaleString()} / {product.priceUnit}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      {product.rating} ({product.reviewCount})
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
