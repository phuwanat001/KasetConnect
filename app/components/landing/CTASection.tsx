"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function CTASection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/30 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] animate-pulse [animation-delay:0.5s]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Particles */}
        {mounted && (
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-emerald-400/50 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-sm font-medium text-emerald-100">
            เริ่มต้นใช้งานฟรี
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          พร้อมยกระดับ
          <span className="block bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            การเกษตรของคุณ?
          </span>
        </h2>

        {/* Description */}
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          เข้าร่วมกับเกษตรกรและเจ้าของเครื่องจักรนับหมื่นรายบน KasetConnect
          วันนี้ เพื่อเข้าถึงเครื่องจักรคุณภาพในราคาที่คุ้มค่า
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full font-bold text-white shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            {/* Glow Effect */}
            <span className="absolute inset-0 bg-linear-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <span className="relative flex items-center gap-2">
              สมัครสมาชิกฟรี
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/register?role=lessor"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
          >
            ลงทะเบียนเป็นผู้ให้เช่า
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Trust Text */}
        <p className="mt-8 text-sm text-slate-400">
          ✓ ลงทะเบียนฟรี &nbsp;•&nbsp; ✓ ไม่มีค่าธรรมเนียมรายเดือน &nbsp;•&nbsp;
          ✓ ยกเลิกเมื่อไหร่ก็ได้
        </p>
      </div>
    </section>
  );
}
