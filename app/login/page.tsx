"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Leaf,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement login logic
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-full bg-linear-to-br from-slate-950 via-emerald-950 to-slate-950 relative overflow-auto">
      {/* Background Elements - Fixed */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-teal-500/15 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Content - Scrollable */}
      <div className="relative z-10 flex items-center justify-center px-4 py-6 sm:py-12">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Logo */}
          <div className="text-center mb-6 sm:mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold group"
            >
              <div className="relative p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30">
                <Leaf className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <span className="text-white">
                Kaset<span className="text-emerald-400">Connect</span>
              </span>
            </Link>
          </div>

          {/* Login Card */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-75" />

            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-5 sm:mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 sm:mb-4">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-xs sm:text-sm font-medium text-emerald-300">
                    ยินดีต้อนรับกลับ
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                  เข้าสู่ระบบ
                </h1>
                <p className="text-sm sm:text-base text-slate-400">
                  เข้าสู่ระบบเพื่อจัดการบัญชีของคุณ
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2"
                  >
                    อีเมล
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-lg bg-emerald-500/10">
                      <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-11 sm:pl-14 pr-4 py-3 sm:py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2"
                  >
                    รหัสผ่าน
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-lg bg-emerald-500/10">
                      <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 sm:pl-14 pr-12 py-3 sm:py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-white/10 text-slate-400"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        rememberMe
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-slate-600 group-hover:border-slate-500"
                      }`}
                      onClick={() => setRememberMe(!rememberMe)}
                    >
                      {rememberMe && (
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-slate-400 group-hover:text-slate-300">
                      จดจำฉัน
                    </span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    ลืมรหัสผ่าน?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white text-sm sm:text-base font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      เข้าสู่ระบบ
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-5 sm:my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 text-xs sm:text-sm text-slate-500 bg-transparent">
                    หรือ
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white font-medium hover:bg-white/10 transition-all"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white font-medium hover:bg-white/10 transition-all"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
              </div>

              {/* Register Link */}
              <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-slate-400">
                ยังไม่มีบัญชี?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  สมัครสมาชิก
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
