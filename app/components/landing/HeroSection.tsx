"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Users,
  MapPin,
  Star,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
}

export function HeroSection({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
}: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-emerald-950 to-slate-900"
      aria-label="Hero section"
    >
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-teal-500/20 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
        <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-emerald-400/15 rounded-full blur-[80px] animate-pulse [animation-delay:0.5s]" />

        {/* Grid Pattern Overlay */}
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
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-emerald-400/40 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-emerald-300">
                แพลตฟอร์มเช่าเครื่องจักรเกษตร #1 ของไทย
              </span>
            </div>

            {/* SEO-Optimized H1 with Strong Value Proposition */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">{title}</span>
              <span className="block mt-2 bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                เช่าเครื่องจักรเกษตร ง่าย ประหยัด ทั่วไทย
              </span>
            </h1>

            {/* Value Proposition Subtitle */}
            <p className="text-xl lg:text-2xl font-medium text-emerald-100/90">
              {subtitle}
            </p>

            {/* Description */}
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              {description}
            </p>

            {/* Primary & Secondary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* Primary CTA: Register / Get Started */}
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

              {/* Secondary CTA: Explore / Learn More */}
              <Link
                href="/marketplace"
                className="group inline-flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-white/90 border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                <Search className="w-4 h-4" />
                สำรวจเครื่องจักร
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white"
                    >
                      {["ก", "ข", "ค", "ง"][i - 1]}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-slate-400">
                  <span className="text-white font-semibold">10,000+</span>{" "}
                  เกษตรกรใช้งาน
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="text-white font-semibold">4.9</span>
                <span className="text-slate-400 text-sm">จาก 2,500 รีวิว</span>
              </div>
            </div>
          </div>

          {/* Right: Floating Cards Showcase */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Main Card */}
            <div className="relative z-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-linear-to-br from-emerald-900/50 to-teal-900/50 relative">
                <img
                  src="https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=2074&auto=format&fit=crop"
                  alt="Agricultural Machinery"
                  className="w-full h-full object-cover mix-blend-luminosity opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-transparent to-transparent" />

                {/* Overlay Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-lg">
                        Kubota L5018SP
                      </p>
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>นครปฐม</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-bold text-xl">
                        ฿2,500
                      </p>
                      <p className="text-slate-400 text-sm">/วัน</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      สมชาย ฟาร์ม
                    </p>
                    <p className="text-slate-400 text-xs">Verified Lessor</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-medium">4.9</span>
                </div>
              </div>
            </div>

            {/* Floating Mini Cards */}
            <div className="absolute -top-8 -right-8 z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">2,500+</p>
                  <p className="text-slate-400 text-xs">ผู้ให้เช่า</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl animate-float [animation-delay:1s]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">77 จังหวัด</p>
                  <p className="text-slate-400 text-xs">ครอบคลุมทั่วไทย</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L48 108C96 96 192 72 288 60C384 48 480 48 576 54C672 60 768 72 864 78C960 84 1056 84 1152 78C1248 72 1344 60 1392 54L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="currentColor"
            className="text-slate-50 dark:text-slate-950"
          />
        </svg>
      </div>
    </section>
  );
}
