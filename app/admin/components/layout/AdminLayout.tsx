"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../ThemeProvider";
import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";
import type { AdminView } from "../../lib/types";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentView: AdminView;
  onNavigate: (view: AdminView) => void;
  pageTitle: string;
  pendingLessors?: number;
  unreadNotifications?: number;
}

export function AdminLayout({
  children,
  currentView,
  onNavigate,
  pageTitle,
  pendingLessors = 0,
  unreadNotifications = 0,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col md:flex-row relative bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentView={currentView}
          onNavigate={onNavigate}
          pendingLessors={pendingLessors}
          unreadNotifications={unreadNotifications}
        />

        <main className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
          <TopHeader onMenuClick={() => setSidebarOpen(true)} />

          <div className="flex-1 overflow-auto p-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {pageTitle}
              </h1>
            </div>
            {children}
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
              primary: "#22c55e",
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
