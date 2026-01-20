"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Search,
} from "lucide-react";
import { useState } from "react";

interface ProblemSolution {
  id: string;
  problem: string;
  solution: string;
  icon: "search" | "cost" | "time" | "location";
}

const defaultProblems: ProblemSolution[] = [
  {
    id: "1",
    problem: "หาเครื่องจักรยาก ไม่รู้จะไปหาที่ไหน",
    solution: "รวมเครื่องจักร 5,000+ รายการ ค้นหาได้ง่ายในที่เดียว",
    icon: "search",
  },
  {
    id: "2",
    problem: "ราคาแพง ซื้อเองไม่คุ้ม",
    solution: "เช่าได้ในราคาที่ถูกกว่า พร้อมเปรียบเทียบราคา",
    icon: "cost",
  },
  {
    id: "3",
    problem: "ต้องรอนาน จองล่วงหน้าหลายวัน",
    solution: "จองออนไลน์ได้ทันที เห็นสถานะว่างพร้อมใช้",
    icon: "time",
  },
  {
    id: "4",
    problem: "อยู่ไกล ค่าขนส่งแพง",
    solution: "ค้นหาตามตำแหน่ง เจอเครื่องจักรใกล้บ้าน",
    icon: "location",
  },
];

const iconMap = {
  search: Search,
  cost: DollarSign,
  time: Clock,
  location: MapPin,
};

interface ProblemSolutionSectionProps {
  problems?: ProblemSolution[];
}

export function ProblemSolutionSection({
  problems = defaultProblems,
}: ProblemSolutionSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-200/30 dark:bg-red-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Problem → Solution
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            ปัญหาที่เกษตรกรเจอ
            <span className="block text-emerald-600 dark:text-emerald-400">
              และวิธีที่เราช่วยแก้ไข
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            เราเข้าใจความท้าทายของเกษตรกรไทย และพัฒนา KasetConnect
            ขึ้นมาเพื่อแก้ปัญหาเหล่านี้
          </p>
        </div>

        {/* Problem-Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((item) => {
            const Icon = iconMap[item.icon];
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                className="group relative"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Card */}
                <div
                  className={`relative h-full p-6 lg:p-8 rounded-3xl bg-white dark:bg-slate-800 border transition-all duration-500 ${
                    isHovered
                      ? "border-emerald-500/50 shadow-2xl shadow-emerald-500/10 -translate-y-2"
                      : "border-slate-200 dark:border-slate-700 shadow-sm"
                  }`}
                >
                  {/* Two Column Layout */}
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Problem Side */}
                    <div className="flex-1 space-y-4">
                      {/* Problem Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium">
                        <AlertTriangle className="w-4 h-4" />
                        ปัญหา
                      </div>

                      {/* Problem Icon & Text */}
                      <div className="flex items-start gap-4">
                        <div
                          className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                            isHovered
                              ? "bg-red-500 text-white"
                              : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          {item.problem}
                        </p>
                      </div>
                    </div>

                    {/* Arrow Divider */}
                    <div className="flex lg:flex-col items-center justify-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isHovered
                            ? "bg-emerald-500 text-white scale-110"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                        }`}
                      >
                        <svg
                          className="w-5 h-5 rotate-90 lg:rotate-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Solution Side */}
                    <div className="flex-1 space-y-4">
                      {/* Solution Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        วิธีแก้
                      </div>

                      {/* Solution Text */}
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Gradient Line */}
                  <div
                    className={`absolute bottom-0 left-6 right-6 h-1 rounded-full bg-linear-to-r from-red-500 via-amber-500 to-emerald-500 transition-all duration-500 ${
                      isHovered
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    }`}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
