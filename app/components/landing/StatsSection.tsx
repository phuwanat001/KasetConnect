"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, Users, MapPin, Tractor } from "lucide-react";

interface Stat {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

const defaultStats: Stat[] = [
  { icon: "Tractor", value: 5000, suffix: "+", label: "เครื่องจักรพร้อมใช้" },
  { icon: "Users", value: 10000, suffix: "+", label: "เกษตรกรใช้งาน" },
  { icon: "MapPin", value: 77, suffix: "", label: "จังหวัดทั่วไทย" },
  { icon: "TrendingUp", value: 98, suffix: "%", label: "ลูกค้าพึงพอใจ" },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Tractor,
  Users,
  MapPin,
  TrendingUp,
};

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

interface StatsSectionProps {
  stats?: Stat[];
}

export function StatsSection({ stats = defaultStats }: StatsSectionProps) {
  return (
    <section className="relative py-20 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-200 dark:bg-emerald-900/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-200 dark:bg-teal-900/30 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Our Impact
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
            ตัวเลขที่พูดแทนเรา
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon] || Tractor;
            return (
              <div
                key={index}
                className="group relative p-6 lg:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
                <div className="absolute inset-px rounded-3xl bg-white dark:bg-slate-900 -z-5" />

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Value */}
                <p className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>

                {/* Label */}
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </p>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-linear-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
