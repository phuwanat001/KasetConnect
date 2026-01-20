"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Leaf,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Settings,
  ChevronDown,
  Store,
  Info,
  Phone,
} from "lucide-react";

interface User {
  name: string;
  image?: string;
  role: "admin" | "user" | "lessor";
}

// Mock User for Dev - set to null to see Guest view
const MOCK_USER: User | null = null; // Guest view - show signin/signup

const navLinks = [
  { href: "/marketplace", label: "ตลาด", icon: Store },
  { href: "/about", label: "เกี่ยวกับ", icon: Info },
  { href: "/contact", label: "ติดต่อ", icon: Phone },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const user = MOCK_USER;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false);
    };

    if (isUserMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isUserMenuOpen]);

  return (
    <>
      {/* Floating Navbar Container */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <nav
          className="relative overflow-hidden bg-white/95 dark:bg-slate-900/95 shadow-2xl shadow-slate-900/10 backdrop-blur-xl border border-white/20 w-full max-w-5xl"
          style={{ borderRadius: "48px" }}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 bg-linear-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 opacity-100"
            style={{ borderRadius: "inherit" }}
          />

          <div className="relative flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 font-bold shrink-0"
            >
              <div className="relative p-2 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-slate-900 dark:text-white text-base">
                Kaset<span className="text-emerald-500">Connect</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 rounded-full font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 group"
                >
                  {link.label}
                  <span className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-linear-to-r from-emerald-500 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {user ? (
                /* User Menu */
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUserMenuOpen(!isUserMenuOpen);
                    }}
                    className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/25">
                      {user.name.charAt(0)}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-600 dark:text-slate-300 transition-all duration-300 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && mounted && (
                    <div
                      className="absolute right-0 top-full mt-3 w-64 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* User Info Header */}
                      <div className="p-4 bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/25">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-sm text-emerald-600 dark:text-emerald-400 capitalize">
                              {user.role}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Settings className="w-5 h-5 text-slate-400" />
                          <span>โปรไฟล์และตั้งค่า</span>
                        </Link>

                        {user.role === "admin" && (
                          <Link
                            href="/admin"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-950 transition-colors"
                          >
                            <LayoutDashboard className="w-5 h-5" />
                            <span className="font-medium">Admin Panel</span>
                          </Link>
                        )}

                        <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors">
                          <LogOut className="w-5 h-5" />
                          <span>ออกจากระบบ</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Guest Actions */
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="hidden sm:block px-4 py-2 rounded-full font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-all duration-300"
                  >
                    เข้าสู่ระบบ
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2.5 rounded-full font-bold text-sm bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300"
                  >
                    สมัคร
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-4 right-4 z-50 lg:hidden">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            {/* Navigation Links */}
            <div className="p-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 dark:border-slate-800" />

            {/* User Section or Auth Buttons */}
            <div className="p-4">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">
                        {user.name}
                      </p>
                      <p className="text-xs text-emerald-600 capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Settings className="w-5 h-5 text-slate-400" />
                    <span>โปรไฟล์และตั้งค่า</span>
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 transition-colors"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span className="font-medium">Admin Panel</span>
                    </Link>
                  )}

                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>ออกจากระบบ</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-4 py-3 rounded-2xl text-center font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    เข้าสู่ระบบ
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-4 py-3 rounded-2xl text-center font-bold text-white bg-linear-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25 transition-all"
                  >
                    สมัครสมาชิก
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
