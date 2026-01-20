"use client";

import { Search, CalendarCheck, Truck } from "lucide-react";
import { useState } from "react";

interface Step {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: Search,
    number: "01",
    title: "ค้นหาเครื่องจักร",
    description:
      "เลือกเครื่องจักรที่ต้องการจากรายการที่หลากหลาย กรองตามพื้นที่ ราคา และประเภท",
  },
  {
    icon: CalendarCheck,
    number: "02",
    title: "จองและชำระเงิน",
    description:
      "เลือกวันที่ต้องการ ตกลงราคากับผู้ให้เช่า และชำระเงินอย่างปลอดภัยผ่านระบบ",
  },
  {
    icon: Truck,
    number: "03",
    title: "รับเครื่องจักร",
    description: "ผู้ให้เช่าจัดส่งถึงไร่นา หรือนัดรับตามสะดวก พร้อมใช้งานทันที",
  },
];

export function HowItWorksSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
            How It Works
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            ขั้นตอนง่ายๆ 3 ขั้นตอน
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            เช่าเครื่องจักรเกษตรได้ง่ายกว่าที่คิด เพียงไม่กี่คลิกก็พร้อมใช้งาน
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-linear-to-r from-emerald-200 via-teal-200 to-cyan-200 dark:from-emerald-900/50 dark:via-teal-900/50 dark:to-cyan-900/50 -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Card */}
                  <div
                    className={`relative bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 transition-all duration-500 ${
                      hoveredIndex === index
                        ? "shadow-2xl shadow-emerald-500/20 -translate-y-4"
                        : "shadow-lg"
                    }`}
                  >
                    {/* Step Number */}
                    <div
                      className={`absolute -top-6 left-8 inline-flex items-center justify-center w-12 h-12 rounded-2xl font-bold text-lg transition-all duration-500 ${
                        hoveredIndex === index
                          ? "bg-linear-to-br from-emerald-500 to-teal-500 text-white scale-125 rotate-12"
                          : "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 mt-4 transition-all duration-500 ${
                        hoveredIndex === index
                          ? "bg-linear-to-br from-emerald-500 to-teal-500"
                          : "bg-emerald-100 dark:bg-emerald-900/30"
                      }`}
                    >
                      <Icon
                        className={`w-10 h-10 transition-all duration-500 ${
                          hoveredIndex === index
                            ? "text-white scale-110"
                            : "text-emerald-600 dark:text-emerald-400"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Arrow to next step */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                            hoveredIndex === index
                              ? "bg-emerald-500 text-white scale-110"
                              : "bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 rounded-3xl bg-linear-to-br from-emerald-500/20 to-teal-500/20 transition-opacity duration-500 ${
                        hoveredIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
