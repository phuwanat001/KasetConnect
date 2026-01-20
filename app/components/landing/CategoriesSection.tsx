"use client";

import Link from "next/link";
import { ArrowUpRight, Tractor, Plane, Wheat, Shovel } from "lucide-react";
import { useState } from "react";

interface Category {
  id: string;
  title: string;
  count: number;
  image: string;
}

interface CategoriesSectionProps {
  categories: Category[];
}

const categoryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "1": Tractor,
  "2": Plane,
  "3": Wheat,
  "4": Shovel,
};

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
              Categories
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white">
              หมวดหมู่เครื่องจักร
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              ค้นหาเครื่องจักรที่เหมาะสมกับงานเกษตรของคุณจากหมวดหมู่ที่หลากหลาย
            </p>
          </div>
          <Link
            href="/categories"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-emerald-500 hover:text-white transition-all duration-300"
          >
            ดูทั้งหมด
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[200px] lg:auto-rows-[280px]">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.id] || Tractor;
            // First item spans 2 columns and 2 rows on large screens
            const isLarge = index === 0;

            return (
              <Link
                key={category.id}
                href={`/marketplace?category=${category.id}`}
                className={`group relative overflow-hidden rounded-3xl ${
                  isLarge ? "md:col-span-2 md:row-span-2" : ""
                }`}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredId === category.id ? "scale-110" : "scale-100"
                    }`}
                  />
                </div>

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-t transition-all duration-500 ${
                    hoveredId === category.id
                      ? "from-emerald-900/90 via-emerald-900/50 to-transparent"
                      : "from-slate-900/80 via-slate-900/40 to-transparent"
                  }`}
                />

                {/* Glassmorphism Card */}
                <div
                  className={`absolute inset-4 lg:inset-6 flex flex-col justify-end transition-all duration-500 ${
                    hoveredId === category.id
                      ? "translate-y-0"
                      : "translate-y-2"
                  }`}
                >
                  {/* Icon Badge */}
                  <div
                    className={`inline-flex self-start items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-4 transition-all duration-500 ${
                      hoveredId === category.id
                        ? "bg-emerald-500/80 scale-110"
                        : ""
                    }`}
                  >
                    <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3
                      className={`font-bold text-white transition-all duration-300 ${
                        isLarge ? "text-2xl lg:text-4xl" : "text-xl lg:text-2xl"
                      }`}
                    >
                      {category.title}
                    </h3>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        {category.count} รายการ
                      </span>

                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full bg-white text-emerald-600 transition-all duration-300 ${
                          hoveredId === category.id
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-4"
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow Effect on Hover */}
                <div
                  className={`absolute inset-0 rounded-3xl ring-2 transition-all duration-500 ${
                    hoveredId === category.id
                      ? "ring-emerald-400/50 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                      : "ring-transparent"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
