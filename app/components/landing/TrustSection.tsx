"use client";

import { useEffect, useState, useRef } from "react";
import {
  TrendingUp,
  Users,
  MapPin,
  Tractor,
  Shield,
  CheckCircle,
  Award,
  Star,
} from "lucide-react";

// Animated Counter Component
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// Stats Data
const stats = [
  { icon: Tractor, value: 5000, suffix: "+", label: "เครื่องจักรพร้อมใช้" },
  { icon: Users, value: 10000, suffix: "+", label: "เกษตรกรใช้งาน" },
  { icon: MapPin, value: 77, suffix: "", label: "จังหวัดทั่วไทย" },
  { icon: TrendingUp, value: 98, suffix: "%", label: "ลูกค้าพึงพอใจ" },
];

// Trust Badges
const trustBadges = [
  {
    icon: Shield,
    title: "ระบบชำระเงินปลอดภัย",
    description: "เข้ารหัส SSL 256-bit",
  },
  {
    icon: CheckCircle,
    title: "ตรวจสอบผู้ให้เช่า",
    description: "ยืนยันตัวตนทุกราย",
  },
  {
    icon: Award,
    title: "รับประกันคุณภาพ",
    description: "เครื่องจักรผ่านการตรวจสอบ",
  },
];

export function TrustSection() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-100/50 dark:bg-teal-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Why Trust Us
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            ความน่าเชื่อถือที่
            <span className="text-emerald-600 dark:text-emerald-400">
              {" "}
              พิสูจน์ได้
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            ตัวเลขและความเชื่อมั่นจากเกษตรกรทั่วประเทศ
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative p-6 lg:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/10"
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                {/* Gradient Border on Hover */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-linear-to-br from-emerald-500 to-teal-500 transition-opacity duration-500 -z-10 blur-sm ${
                    hoveredStat === index ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="absolute inset-px rounded-3xl bg-slate-50 dark:bg-slate-900" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-all duration-500 ${
                      hoveredStat === index
                        ? "bg-linear-to-br from-emerald-500 to-teal-500 scale-110"
                        : "bg-emerald-100 dark:bg-emerald-900/30"
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 transition-colors duration-500 ${
                        hoveredStat === index
                          ? "text-white"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    />
                  </div>

                  {/* Value */}
                  <p className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>

                  {/* Label */}
                  <p className="text-slate-600 dark:text-slate-400 font-medium">
                    {stat.label}
                  </p>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-linear-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="group flex items-start gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rating Summary */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <div className="text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-900 dark:text-white">
              4.9/5
            </span>{" "}
            จากรีวิว{" "}
            <span className="font-bold text-slate-900 dark:text-white">
              2,500+
            </span>{" "}
            รายการ
          </div>
        </div>
      </div>
    </section>
  );
}
