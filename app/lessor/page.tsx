"use client";

import { useState, useMemo } from "react";
import { LessorLayout } from "./components/layout/LessorLayout";
import { DashboardView } from "./components/views/DashboardView";
import { BookingCalendarView } from "./components/views/BookingCalendarView";
import { ProductsView } from "./components/views/ProductsView";
import { MarketplaceView } from "./components/views/MarketplaceView";
import { RentalsView } from "./components/views/RentalsView";
import { ProfileView } from "./components/views/ProfileView";

import {
  getDashboardData,
  getBookingsData,
  getProductsData,
  getRentalsData,
  getProfileData,
  getMarketplaceData,
} from "./lib/mockData";

import type { LessorView } from "./lib/types";

const pageTitles: Record<LessorView, string> = {
  dashboard: "ภาพรวมร้านค้า",
  calendar: "ปฏิทินการจอง",
  products: "จัดการเครื่องจักร",
  marketplace: "จัดการตลาดเช่า",
  rentals: "ประวัติการเช่า",
  profile: "ข้อมูลร้านค้า",
};

export default function LessorPage() {
  const [currentView, setCurrentView] = useState<LessorView>("dashboard");
  const [isLoading, setIsLoading] = useState(false);

  // Load data
  const dashboardData = useMemo(() => getDashboardData(), []);
  const bookingsData = useMemo(() => getBookingsData(), []);
  const productsData = useMemo(() => getProductsData(), []);
  const rentalsData = useMemo(() => getRentalsData(), []);
  const profileData = useMemo(() => getProfileData(), []);
  const marketplaceData = useMemo(() => getMarketplaceData(), []);

  const handleNavigate = (view: LessorView) => {
    setIsLoading(true);
    setCurrentView(view);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  };

  const renderCurrentView = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    switch (currentView) {
      case "dashboard":
        return <DashboardView data={dashboardData} />;
      case "calendar":
        return <BookingCalendarView data={bookingsData} />;
      case "products":
        return <ProductsView data={productsData} />;
      case "marketplace":
        return <MarketplaceView data={marketplaceData} />;
      case "rentals":
        return <RentalsView data={rentalsData} />;
      case "profile":
        return <ProfileView data={profileData} />;
      default:
        return (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-slate-500">
              ส่วนนี้กำลังพัฒนา ({currentView})
            </h3>
          </div>
        );
    }
  };

  return (
    <LessorLayout
      currentView={currentView}
      onNavigate={handleNavigate}
      pageTitle={pageTitles[currentView]}
      pendingBookings={dashboardData.stats.pendingBookings}
    >
      {renderCurrentView()}
    </LessorLayout>
  );
}
