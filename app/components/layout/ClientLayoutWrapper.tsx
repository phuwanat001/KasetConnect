"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BottomNavBar } from "./BottomNavBar";

// Route configuration
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

export function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Determine route type
  const isAdminRoute = pathname?.startsWith("/admin");
  const isLessorRoute = pathname?.startsWith("/lessor");
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname?.startsWith(route));

  // =========================================
  // ADMIN & LESSOR PAGES - Own layout, no wrapper
  // =========================================
  if (isAdminRoute || isLessorRoute) {
    return <>{children}</>;
  }

  // =========================================
  // AUTH PAGES - Simple layout with BottomNavBar
  // =========================================
  if (isAuthRoute) {
    return (
      <div className="relative">
        {/* Main content */}
        <div className="min-h-[100dvh] pb-16 lg:pb-0">{children}</div>
        {/* Bottom Navigation - Mobile only */}
        <BottomNavBar />
      </div>
    );
  }

  // =========================================
  // PUBLIC PAGES - Full layout
  // =========================================
  return (
    <div className="flex min-h-[100dvh] flex-col bg-slate-50 dark:bg-slate-950">
      {/* Top Navbar - Desktop & Mobile */}
      <Navbar />

      {/* Main content with bottom padding for mobile nav */}
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>

      {/* Footer - Hidden on mobile when bottom nav is shown */}
      <div className="hidden lg:block">
        <Footer />
      </div>

      {/* Bottom Navigation - Mobile only */}
      <BottomNavBar />
    </div>
  );
}
