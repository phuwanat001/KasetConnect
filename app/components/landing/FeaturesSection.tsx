"use client";

import * as LucideIcons from "lucide-react";
import { useState } from "react";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesSectionProps {
  title?: string;
  features: Feature[];
}

export function FeaturesSection({
  title = "จุดเด่นของเรา",
  features,
}: FeaturesSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/50 dark:bg-emerald-900/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200/50 dark:bg-teal-900/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            KasetConnect มอบประสบการณ์ที่ดีที่สุดในการเช่าเครื่องจักรเกษตร
            ด้วยระบบที่ทันสมัยและบริการที่เหนือความคาดหมาย
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            // Dynamic Icon Loading
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconComponent =
              (LucideIcons as any)[feature.icon] || LucideIcons.HelpCircle;

            return (
              <div
                key={feature.title}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glassmorphism Card */}
                <div
                  className={`relative h-full p-8 rounded-3xl bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl border transition-all duration-500 ${
                    hoveredIndex === index
                      ? "border-emerald-500/50 shadow-2xl shadow-emerald-500/10 -translate-y-2"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {/* Icon with Gradient Background */}
                  <div
                    className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-500 ${
                      hoveredIndex === index
                        ? "bg-linear-to-br from-emerald-500 to-teal-500 rotate-6 scale-110"
                        : "bg-linear-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50"
                    }`}
                  >
                    <IconComponent
                      className={`w-8 h-8 transition-all duration-500 ${
                        hoveredIndex === index
                          ? "text-white"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    />

                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 blur-xl transition-opacity duration-500 ${
                        hoveredIndex === index ? "opacity-50" : "opacity-0"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative Line */}
                  <div
                    className={`absolute bottom-0 left-8 right-8 h-1 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 transition-all duration-500 ${
                      hoveredIndex === index
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    }`}
                    style={{ transformOrigin: "left" }}
                  />

                  {/* Number Badge */}
                  <div
                    className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                      hoveredIndex === index
                        ? "bg-emerald-500 text-white scale-110"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
