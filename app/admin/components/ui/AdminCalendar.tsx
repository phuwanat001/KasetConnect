"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Calendar as CalendarIcon,
} from "lucide-react";

export type EventStatus = "pending" | "active" | "returned" | "late";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date; // simple date object
  status: EventStatus;
  renterName: string;
}

interface AdminCalendarProps {
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export function AdminCalendar({
  events,
  onDateSelect,
  selectedDate,
}: AdminCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calendar Logic
  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const days = Array.from(
    { length: daysInMonth(currentDate) },
    (_, i) => i + 1,
  );
  const startDay = startDayOfMonth(currentDate);
  const emptyDays = Array.from({ length: startDay }, (_, i) => i);

  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      return (
        event.date.getDate() === day &&
        event.date.getMonth() === currentMonth &&
        event.date.getFullYear() === currentYear
      );
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-indigo-600" />
          {monthNames[currentMonth]} {currentYear + 543}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Days Header */}
        {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((d) => (
          <div
            key={d}
            className="h-10 flex items-center justify-center text-sm font-semibold text-slate-500 dark:text-slate-400"
          >
            {d}
          </div>
        ))}

        {/* Empty Cells */}
        {emptyDays.map((d) => (
          <div key={`empty-${d}`} className="h-24 md:h-32 p-1" />
        ))}

        {/* Days */}
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const hasEvents = dayEvents.length > 0;
          const _isSelected = isSelected(day);
          const _isToday = isToday(day);

          return (
            <div
              key={day}
              onClick={() =>
                onDateSelect(new Date(currentYear, currentMonth, day))
              }
              className={`
                h-24 md:h-32 rounded-lg border p-2 cursor-pointer transition-all relative group
                ${
                  _isSelected
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-600"
                    : "border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/50"
                }
              `}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`
                    w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium
                    ${
                      _isToday
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/50"
                        : _isSelected
                          ? "text-indigo-700 dark:text-indigo-300"
                          : "text-slate-700 dark:text-slate-300"
                    }
                  `}
                >
                  {day}
                </span>
                {hasEvents && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </span>
                )}
              </div>

              <div className="mt-2 space-y-1 overflow-hidden">
                {dayEvents.slice(0, 3).map((event, i) => (
                  <div
                    key={event.id}
                    className={`
                      text-[10px] px-1.5 py-0.5 roundedtruncate font-medium flex items-center gap-1
                      ${
                        event.status === "active"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : event.status === "pending"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : event.status === "returned"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      }
                    `}
                    title={event.title}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        event.status === "active"
                          ? "bg-blue-500"
                          : event.status === "pending"
                            ? "bg-yellow-500"
                            : event.status === "returned"
                              ? "bg-green-500"
                              : "bg-red-500"
                      }`}
                    />
                    <span className="truncate hidden md:inline">
                      {event.title}
                    </span>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-[10px] text-slate-400 pl-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>

              {/* Hover Tooltip */}
              {hasEvents && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[110%] z-50 w-48 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="font-bold mb-2 border-b border-slate-100 dark:border-slate-800 pb-1">
                    {day} {monthNames[currentMonth]}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((e) => (
                      <div key={e.id} className="flex items-center gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            e.status === "active"
                              ? "bg-blue-500"
                              : e.status === "pending"
                                ? "bg-yellow-500"
                                : e.status === "returned"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                          }`}
                        />
                        <span className="truncate">{e.title}</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-slate-900 border-r border-b border-slate-200 dark:border-slate-700 rotate-45"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
