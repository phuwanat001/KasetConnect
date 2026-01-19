"use client";

import { useState } from "react";
import { CheckCircle, Send, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import type { NotificationsData, Notification } from "../../lib/types";

interface NotificationsViewProps {
  data: NotificationsData;
}

interface NotificationForm {
  title: string;
  message: string;
  target: "all" | "renters" | "lessors";
  channels: {
    in_app: boolean;
    email: boolean;
  };
}

const initialForm: NotificationForm = {
  title: "",
  message: "",
  target: "all",
  channels: {
    in_app: true,
    email: false,
  },
};

const targetLabels: Record<string, string> = {
  all: "ผู้ใช้ทั้งหมด",
  renters: "ผู้เช่า",
  lessors: "ผู้ให้เช่า",
};

export function NotificationsView({ data }: NotificationsViewProps) {
  const [notifications, setNotifications] = useState<Notification[]>(
    data.items,
  );
  const [form, setForm] = useState<NotificationForm>(initialForm);
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    if (!form.title || !form.message) {
      toast.error("กรุณากรอกหัวข้อและข้อความ");
      return;
    }

    if (!form.channels.in_app && !form.channels.email) {
      toast.error("กรุณาเลือกช่องทางการส่งอย่างน้อย 1 ช่องทาง");
      return;
    }

    setIsSending(true);

    // Simulate sending
    setTimeout(() => {
      const newNotification: Notification = {
        id: `NTF${String(notifications.length + 1).padStart(3, "0")}`,
        title: form.title,
        message: form.message,
        target: form.target,
        target_label: targetLabels[form.target],
        channels: [
          ...(form.channels.in_app ? ["in_app" as const] : []),
          ...(form.channels.email ? ["email" as const] : []),
        ],
        date: new Date().toISOString().split("T")[0],
        status: "sent",
        sent_count: Math.floor(Math.random() * 500) + 100,
      };

      setNotifications([newNotification, ...notifications]);
      setForm(initialForm);
      setIsSending(false);
      toast.success("ส่งการแจ้งเตือนเรียบร้อยแล้ว");
    }, 1000);
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.success("ลบการแจ้งเตือนเรียบร้อยแล้ว");
  };

  const handleResend = (notification: Notification) => {
    toast.success(`ส่ง "${notification.title}" ซ้ำเรียบร้อยแล้ว`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Create Notification Form */}
      <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 h-fit transition-colors">
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
          สร้างการแจ้งเตือน
        </h3>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              หัวข้อ
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="เช่น แจ้งปิดปรับปรุงระบบ"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              ข้อความ
            </label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="พิมพ์ข้อความ..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              กลุ่มเป้าหมาย
            </label>
            <select
              value={form.target}
              onChange={(e) =>
                setForm({
                  ...form,
                  target: e.target.value as NotificationForm["target"],
                })
              }
              className="w-full border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors"
            >
              <option value="all">ผู้ใช้ทั้งหมด</option>
              <option value="lessors">ผู้ให้เช่าเท่านั้น</option>
              <option value="renters">ผู้เช่าเท่านั้น</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              ช่องทางการส่ง
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.channels.in_app}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      channels: { ...form.channels, in_app: e.target.checked },
                    })
                  }
                  className="text-indigo-600 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                />
                ในแอป
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.channels.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      channels: { ...form.channels, email: e.target.checked },
                    })
                  }
                  className="text-indigo-600 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                />
                อีเมล
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSend}
            disabled={isSending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                กำลังส่ง...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                ส่งการแจ้งเตือน
              </>
            )}
          </button>
        </form>
      </div>

      {/* Notification History */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 rounded-t-xl">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            ประวัติการแจ้งเตือน ({notifications.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-600 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-3">หัวข้อ</th>
                <th className="px-6 py-3">เป้าหมาย</th>
                <th className="px-6 py-3">วันที่ส่ง</th>
                <th className="px-6 py-3">สถานะ</th>
                <th className="px-6 py-3 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notif) => (
                <tr
                  key={notif.id}
                  className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 dark:text-white">
                      {notif.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                      {notif.message}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded">
                      {notif.target_label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">
                    {notif.date}
                  </td>
                  <td className="px-6 py-4 text-green-600 dark:text-green-400 text-sm">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      ส่งแล้ว ({notif.sent_count})
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleResend(notif)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-xs font-medium transition-colors"
                    >
                      ส่งซ้ำ
                    </button>
                    <button
                      onClick={() => handleDelete(notif.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 inline" />
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
