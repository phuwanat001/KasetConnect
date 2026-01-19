"use client";

import { useState, useMemo } from "react";
import {
  CalendarDays,
  Tractor,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  MapPin,
  User,
  Phone,
  ArrowRight,
} from "lucide-react";
import { AdminCalendar, CalendarEvent, EventStatus } from "../ui/AdminCalendar";
import { StatCard } from "../ui/StatCard";
import type { DashboardData } from "../../lib/types";

interface DashboardViewProps {
  data: DashboardData;
  onNavigateToRental: (rentalId: string) => void;
}

// Mock Events Generator
const generateMockEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const today = new Date();
  const statuses: EventStatus[] = ["active", "pending", "returned", "late"];
  const equipment = [
    "Kubota L5018",
    "Drone DJI Agras",
    "Harvester DC-70",
    "Rotary Tiller",
  ];
  const renters = [
    "Somchai Jai-dee",
    "Mana Farm",
    "Somsri Agri",
    "Preecha Rice",
  ];

  // Generate some events for this month
  for (let i = 1; i <= 28; i += 2) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const date = new Date(today.getFullYear(), today.getMonth(), i);

    // Add 1-3 events per day occasionally
    const dailyCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < dailyCount; j++) {
      events.push({
        id: `evt-${i}-${j}`,
        title: equipment[Math.floor(Math.random() * equipment.length)],
        date: date,
        status: status,
        renterName: renters[Math.floor(Math.random() * renters.length)],
      });
    }
  }
  return events;
};

export function DashboardView({
  data,
  onNavigateToRental,
}: DashboardViewProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const events = useMemo(() => generateMockEvents(), []);

  const selectedEvents = events.filter(
    (e) =>
      e.date.getDate() === selectedDate.getDate() &&
      e.date.getMonth() === selectedDate.getMonth() &&
      e.date.getFullYear() === selectedDate.getFullYear(),
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("th-TH", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. KEY STATS (Quick Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="เช่าเดือนนี้"
          value={42}
          icon={<CalendarDays className="w-5 h-5" />}
          iconBgColor="bg-indigo-100"
          iconDarkBgColor="dark:bg-indigo-900/40"
          iconColor="text-indigo-600"
          iconDarkColor="dark:text-indigo-400"
        />
        <StatCard
          title="กำลังเช่า (Active)"
          value={12}
          icon={<Tractor className="w-5 h-5" />}
          iconBgColor="bg-blue-100"
          iconDarkBgColor="dark:bg-blue-900/40"
          iconColor="text-blue-600"
          iconDarkColor="dark:text-blue-400"
        />
        <StatCard
          title="รออนุมัติ"
          value={5}
          icon={<Clock className="w-5 h-5" />}
          iconBgColor="bg-yellow-100"
          iconDarkBgColor="dark:bg-yellow-900/40"
          iconColor="text-yellow-600"
          iconDarkColor="dark:text-yellow-400"
        />
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              พร้อมให้เช่า
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              156
            </h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* 2. CALENDAR (Centerpiece) */}
        <div className="xl:col-span-2">
          <AdminCalendar
            events={events}
            onDateSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
        </div>

        {/* 3. TODAY RENTAL PANEL (Right Side) */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  รายการเช่า
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {formatDate(selectedDate)}
                </p>
              </div>
              <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">
                {selectedEvents.length} รายการ
              </div>
            </div>

            {selectedEvents.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {selectedEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onNavigateToRental("1")}
                    className="group p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                          event.status === "active"
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : event.status === "pending"
                              ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                              : event.status === "returned"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        {event.status}
                      </span>
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 shrink-0">
                        <Tractor className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 transition-colors">
                          {event.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          ID: {event.id}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-700">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{event.renterName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-700">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>08:00 - 16:00</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <CalendarDays className="w-8 h-8 opacity-50" />
                </div>
                <p className="text-slate-900 dark:text-white font-medium">
                  ไม่มีรายการสำหรับวันนี้
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  เลือกวันอื่นจากปฏิทินเพื่อดูรายการ
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
