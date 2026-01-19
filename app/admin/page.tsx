"use client";

import { useState, useMemo } from "react";
import { AdminLayout } from "./components/layout/AdminLayout";
import { DashboardView } from "./components/views/DashboardView";
import { CategoriesView } from "./components/views/CategoriesView";
import { UsersView } from "./components/views/UsersView";
import { LessorsView } from "./components/views/LessorsView";
import { RentalsView } from "./components/views/RentalsView";
import { MarketplaceView } from "./components/views/MarketplaceView";
import { NotificationsView } from "./components/views/NotificationsView";
import { AiView } from "./components/views/AiView";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import {
  getDashboardData,
  getCategoriesData,
  getUsersData,
  getLessorsData,
  getRentalsData,
  getMarketplaceData,
  getNotificationsData,
  getAiData,
} from "./lib/mockData";
import type { AdminView } from "./lib/types";

const pageTitles: Record<AdminView, string> = {
  dashboard: "ภาพรวมระบบ (Dashboard)",
  categories: "จัดการหมวดหมู่ (Category Management)",
  users: "จัดการผู้ใช้งาน (User Management)",
  lessors: "อนุมัติและจัดการผู้ให้เช่า (Lessor Management)",
  rentals: "ธุรกรรมการเช่า (Rental Transactions)",
  marketplace: "ตลาดสินค้า (Marketplace)",
  notifications: "ศูนย์การแจ้งเตือน (Notification Center)",
  ai: "ตั้งค่า AI (AI Configuration)",
};

export default function AdminPage() {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const [selectedRentalId, setSelectedRentalId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load data (in real app, these would be API calls)
  const dashboardData = useMemo(() => getDashboardData(), []);
  const categoriesData = useMemo(() => getCategoriesData(), []);
  const usersData = useMemo(() => getUsersData(), []);
  const lessorsData = useMemo(() => getLessorsData(), []);
  const rentalsData = useMemo(() => getRentalsData(), []);
  const marketplaceData = useMemo(() => getMarketplaceData(), []);
  const notificationsData = useMemo(() => getNotificationsData(), []);
  const aiData = useMemo(() => getAiData(), []);

  const handleNavigate = (view: AdminView) => {
    setIsLoading(true);
    setCurrentView(view);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 200);
  };

  const handleNavigateToRental = (rentalId: string) => {
    setSelectedRentalId(rentalId);
    handleNavigate("rentals");
  };

  const renderCurrentView = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    switch (currentView) {
      case "dashboard":
        return (
          <DashboardView
            data={dashboardData}
            onNavigateToRental={handleNavigateToRental}
          />
        );
      case "categories":
        return <CategoriesView data={categoriesData} />;
      case "users":
        return <UsersView data={usersData} />;
      case "lessors":
        return <LessorsView data={lessorsData} />;
      case "rentals":
        return (
          <RentalsView data={rentalsData} initialRentalId={selectedRentalId} />
        );
      case "marketplace":
        return <MarketplaceView data={marketplaceData} />;
      case "notifications":
        return <NotificationsView data={notificationsData} />;
      case "ai":
        return <AiView data={aiData} />;
      default:
        return (
          <DashboardView
            data={dashboardData}
            onNavigateToRental={handleNavigateToRental}
          />
        );
    }
  };

  return (
    <AdminLayout
      currentView={currentView}
      onNavigate={handleNavigate}
      pageTitle={pageTitles[currentView]}
      pendingLessors={lessorsData.summary.pending}
      unreadNotifications={notificationsData.unread_count}
    >
      {renderCurrentView()}
    </AdminLayout>
  );
}
