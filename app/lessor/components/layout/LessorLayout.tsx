"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../../../admin/components/ThemeProvider"; // Reusing admin theme provider
import { LessorSidebar } from "./LessorSidebar";
import { LessorTopHeader } from "./LessorTopHeader";
import type { LessorView } from "../../lib/types";

interface LessorLayoutProps {
  children: React.ReactNode;
  currentView: LessorView;
  onNavigate: (view: LessorView) => void;
  pageTitle: string;
  pendingBookings?: number;
}

export function LessorLayout({
  children,
  currentView,
  onNavigate,
  pageTitle,
  pendingBookings = 0,
}: LessorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
        <LessorSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentView={currentView}
          onNavigate={onNavigate}
          pendingBookings={pendingBookings}
        />

        <main className="flex-1 flex flex-col min-w-0 h-screen">
          <LessorTopHeader
            onMenuClick={() => setSidebarOpen(true)}
            title={pageTitle}
          />

          <div className="flex-1 overflow-y-auto w-full">
            <div className="container max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </div>
        </main>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            borderRadius: "12px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#10b981", // Emerald-500
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </ThemeProvider>
  );
}
