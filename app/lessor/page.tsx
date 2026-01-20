"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

import { LessorLayout } from "./components/layout/LessorLayout";
import { DashboardView } from "./components/views/DashboardView";
import { BookingCalendarView } from "./components/views/BookingCalendarView";
import { ProductsView } from "./components/views/ProductsView";
import { MarketplaceView } from "./components/views/MarketplaceView";
import { RentalsView } from "./components/views/RentalsView";
import { ProfileView } from "./components/views/ProfileView";
import { RentalDetailView } from "./components/views/RentalDetailView";

import {
  getDashboardData,
  getBookingsData,
  getProductsData,
  getRentalsData,
  getProfileData,
  getMarketplaceData,
  updateBookingStatus,
} from "./actions";

import type {
  LessorView,
  BookingStatus,
  DashboardData,
  BookingsData,
  ProductsData,
  RentalsData,
  ProfileData,
  MarketplaceData,
} from "./lib/types";

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
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  // Data State
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [bookingsData, setBookingsData] = useState<BookingsData | null>(null);
  const [productsData, setProductsData] = useState<ProductsData | null>(null);
  const [rentalsData, setRentalsData] = useState<RentalsData | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [marketplaceData, setMarketplaceData] =
    useState<MarketplaceData | null>(null);

  const fetchAllData = useCallback(async () => {
    try {
      const [dash, books, prods, rents, prof, market] = await Promise.all([
        getDashboardData(),
        getBookingsData(),
        getProductsData(),
        getRentalsData(),
        getProfileData(),
        getMarketplaceData(),
      ]);

      setDashboardData(dash);
      setBookingsData(books);
      setProductsData(prods);
      setRentalsData(rents);
      setProfileData(prof);
      setMarketplaceData(market);
    } catch (error) {
      console.error("Failed to fetch data", error);
      toast.error("โหลดข้อมูลล้มเหลว");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleNavigate = (view: LessorView) => {
    setCurrentView(view);
    setSelectedBookingId(null);
  };

  const handleViewDetails = (bookingId: string) => {
    setSelectedBookingId(bookingId);
  };

  const handleUpdateStatus = async (id: string, newStatus: BookingStatus) => {
    const loadingToast = toast.loading("กำลังอัปเดตสถานะ...");
    try {
      const result = await updateBookingStatus(id, newStatus);
      if (result.success) {
        toast.success("อัปเดตสถานะเรียบร้อย", { id: loadingToast });
        // Refresh data
        await fetchAllData();
        setSelectedBookingId(null); // Go back to list/calendar
      } else {
        toast.error(result.message || "เกิดข้อผิดพลาด", { id: loadingToast });
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อ", { id: loadingToast });
    }
  };

  const renderCurrentView = () => {
    if (
      isLoading ||
      !dashboardData ||
      !bookingsData ||
      !productsData ||
      !rentalsData ||
      !profileData ||
      !marketplaceData
    ) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">
            กำลังโหลดข้อมูลร้านค้า...
          </p>
        </div>
      );
    }

    if (selectedBookingId) {
      const booking =
        bookingsData.bookings.find((b) => b.id === selectedBookingId) ||
        dashboardData.recentBookings.find((b) => b.id === selectedBookingId);

      // Fallback
      if (!booking) {
        // Should not happen if data is consistent
        return <div>Booking not found</div>;
      }

      return (
        <RentalDetailView
          booking={booking}
          onBack={() => setSelectedBookingId(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      );
    }

    switch (currentView) {
      case "dashboard":
        return (
          <DashboardView
            data={dashboardData}
            onViewBooking={handleViewDetails}
            onNavigate={handleNavigate}
          />
        );
      case "calendar":
        return (
          <BookingCalendarView
            data={bookingsData}
            onViewBooking={handleViewDetails}
          />
        );
      case "products":
        return <ProductsView data={productsData} />;
      case "marketplace":
        return <MarketplaceView data={marketplaceData} />;
      case "rentals":
        return (
          <RentalsView data={rentalsData} onViewBooking={handleViewDetails} />
        );
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
      pendingBookings={dashboardData?.stats.pendingBookings || 0}
    >
      {renderCurrentView()}
    </LessorLayout>
  );
}
