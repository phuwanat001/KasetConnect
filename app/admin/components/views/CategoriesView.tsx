"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Tractor,
  Plane,
  Wheat,
  Droplet,
  Truck,
  Package,
  X,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";
import { StatusBadge } from "../ui/StatusBadge";
import type { Category } from "../../lib/types";
import type { ReactNode } from "react";

interface CategoriesViewProps {
  data: Category[];
}

// Map category icon strings to Lucide icons
const iconMap: Record<string, ReactNode> = {
  "fa-tractor": <Tractor className="w-4 h-4" />,
  "fa-helicopter": <Plane className="w-4 h-4" />,
  "fa-wheat-awn": <Wheat className="w-4 h-4" />,
  "fa-droplet": <Droplet className="w-4 h-4" />,
  "fa-truck-monster": <Truck className="w-4 h-4" />,
};

function getCategoryIcon(iconName: string): ReactNode {
  return iconMap[iconName] || <Package className="w-4 h-4" />;
}

interface CategoryForm {
  name: string;
  name_en: string;
  icon: string;
  status: "active" | "inactive";
}

const initialForm: CategoryForm = {
  name: "",
  name_en: "",
  icon: "fa-tractor",
  status: "active",
};

export function CategoriesView({ data }: CategoriesViewProps) {
  const [categories, setCategories] = useState<Category[]>(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryForm>(initialForm);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const openAddModal = () => {
    setForm(initialForm);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setForm({
      name: category.name,
      name_en: category.name_en,
      icon: category.icon,
      status: category.status,
    });
    setEditingId(category.id);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.name_en) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (editingId) {
      // Update existing
      setCategories(
        categories.map((cat) =>
          cat.id === editingId ? { ...cat, ...form } : cat,
        ),
      );
      toast.success("อัพเดทหมวดหมู่เรียบร้อยแล้ว");
    } else {
      // Add new
      const newCategory: Category = {
        id: `CAT${String(categories.length + 1).padStart(3, "0")}`,
        ...form,
        equipment_count: 0,
        created_at: new Date().toISOString().split("T")[0],
      };
      setCategories([...categories, newCategory]);
      toast.success("เพิ่มหมวดหมู่ใหม่เรียบร้อยแล้ว");
    }

    setIsModalOpen(false);
    setForm(initialForm);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    setDeleteConfirmId(null);
    toast.success("ลบหมวดหมู่เรียบร้อยแล้ว");
  };

  const toggleStatus = (id: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id
          ? { ...cat, status: cat.status === "active" ? "inactive" : "active" }
          : cat,
      ),
    );
    toast.success("เปลี่ยนสถานะเรียบร้อยแล้ว");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            หมวดหมู่เครื่องจักร
          </h3>
          <button
            onClick={openAddModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            เพิ่มหมวดหมู่
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-600 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3">รหัส</th>
                <th className="px-6 py-3">ชื่อหมวดหมู่</th>
                <th className="px-6 py-3">จำนวนเครื่องจักร</th>
                <th className="px-6 py-3">สถานะ</th>
                <th className="px-6 py-3">วันที่สร้าง</th>
                <th className="px-6 py-3 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    {cat.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 dark:text-slate-400">
                        {getCategoryIcon(cat.icon)}
                      </span>
                      <span className="text-slate-900 dark:text-white">
                        {cat.name}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500 text-xs">
                        ({cat.name_en})
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                    {cat.equipment_count}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleStatus(cat.id)}>
                      <StatusBadge status={cat.status} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                    {cat.created_at}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-1 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(cat.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-800 w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingId ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่ใหม่"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  ชื่อหมวดหมู่ (ไทย)
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  placeholder="เช่น รถแทรกเตอร์"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  ชื่อหมวดหมู่ (อังกฤษ)
                </label>
                <input
                  type="text"
                  value={form.name_en}
                  onChange={(e) =>
                    setForm({ ...form, name_en: e.target.value })
                  }
                  className="w-full border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Tractors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  ไอคอน
                </label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="fa-tractor">รถแทรกเตอร์</option>
                  <option value="fa-helicopter">โดรน/อากาศยาน</option>
                  <option value="fa-wheat-awn">เครื่องเกี่ยวข้าว</option>
                  <option value="fa-droplet">ระบบน้ำ</option>
                  <option value="fa-truck-monster">รถบรรทุก</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  สถานะ
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as "active" | "inactive",
                    })
                  }
                  className="w-full border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="active">ใช้งาน</option>
                  <option value="inactive">ไม่ใช้งาน</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 bg-slate-50 dark:bg-slate-800">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingId ? "บันทึก" : "เพิ่ม"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-800 w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              ยืนยันการลบ
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              คุณแน่ใจหรือไม่ที่จะลบหมวดหมู่นี้?
              การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-colors"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
