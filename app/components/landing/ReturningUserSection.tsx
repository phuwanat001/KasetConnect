"use client";

import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  LogIn,
  Zap,
  Clock,
  Shield,
} from "lucide-react";
import { useState, useEffect } from "react";

export function ReturningUserSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const benefits = [
    {
      icon: Zap,
      title: "เข้าถึงทันที",
      description: "ไปยังแดชบอร์ดได้เลย",
    },
    {
      icon: Clock,
      title: "ดูประวัติการเช่า",
      description: "ติดตามทุกรายการ",
    },
    {
      icon: Shield,
      title: "บัญชีปลอดภัย",
      description: "ข้อมูลถูกเข้ารหัส",
    },
  ];

  return (
    <section className="py-20 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] animate-pulse [animation-delay:1s]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating Particles */}
        {mounted && (
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        {/* Content Container */}
        <div className="relative bg-white/5 backdrop-blur-xl rounded-4xl border border-white/10 p-8 lg:p-12 overflow-hidden">
          {/* Inner Glow Effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-sm font-medium text-blue-300">
                  สำหรับสมาชิก
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                ยินดีต้อนรับกลับ
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                  เข้าสู่ระบบได้เลย
                </span>
              </h2>

              {/* Description */}
              <p className="text-slate-400 text-lg leading-relaxed">
                กลับมาจัดการรายการเช่า ดูสถานะเครื่องจักร
                หรือสำรวจเครื่องจักรใหม่ๆ ได้ทันที
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mb-3">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <p className="text-sm font-medium text-white">
                        {benefit.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {benefit.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: CTA Buttons */}
            <div className="space-y-4">
              {/* Login Button - Primary */}
              <Link
                href="/login"
                className="group relative flex items-center justify-center gap-3 w-full px-8 py-5 bg-linear-to-r from-blue-500 to-indigo-500 rounded-2xl font-bold text-white text-lg shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                {/* Glow Effect */}
                <span className="absolute inset-0 bg-linear-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <span className="relative flex items-center gap-3">
                  <LogIn className="w-5 h-5" />
                  เข้าสู่ระบบ
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              {/* Dashboard Button - Secondary */}
              <Link
                href="/dashboard"
                className="group flex items-center justify-center gap-3 w-full px-8 py-5 rounded-2xl font-semibold text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                <LayoutDashboard className="w-5 h-5 text-blue-400" />
                ไปที่แดชบอร์ด
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>

              {/* Trust Text */}
              <p className="text-center text-sm text-slate-500 pt-2">
                🔒 ข้อมูลของคุณปลอดภัย เข้ารหัส 256-bit SSL
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
