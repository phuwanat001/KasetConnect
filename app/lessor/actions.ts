"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import {
  Booking,
  BookingsData,
  BookingStatus,
  DashboardData,
  RentalsData,
  Rental,
  Product,
  ProductsData,
  ProfileData,
  MarketplaceData,
} from "./lib/types";

const MOCK_DIR = path.join(process.cwd(), "app", "lessor", "mock");

async function readJson<T>(filename: string): Promise<T> {
  const filePath = path.join(MOCK_DIR, filename);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as T;
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(MOCK_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getDashboardData(): Promise<DashboardData> {
  // Simulator lag
  await new Promise((resolve) => setTimeout(resolve, 500));
  return readJson<DashboardData>("dashboard.json");
}

export async function getBookingsData(): Promise<BookingsData> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return readJson<BookingsData>("bookings.json");
}

export async function getRentalsData(): Promise<RentalsData> {
  return readJson<RentalsData>("rentals.json");
}

export async function getProductsData(): Promise<ProductsData> {
  return readJson<ProductsData>("products.json");
}

export async function getProfileData(): Promise<ProfileData> {
  return readJson<ProfileData>("profile.json");
}

export async function getMarketplaceData(): Promise<MarketplaceData> {
  return readJson<MarketplaceData>("marketplace.json");
}

// Actions
export async function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatus,
): Promise<{ success: boolean; message?: string }> {
  try {
    const data = await readJson<BookingsData>("bookings.json");
    const bookingIndex = data.bookings.findIndex((b) => b.id === bookingId);

    if (bookingIndex === -1) {
      throw new Error("Booking not found");
    }

    // Update status
    data.bookings[bookingIndex].status = newStatus;

    // Update summary counts
    // (In a real app, we'd recalculate counts dynamically, but here we just tweak simpler logic or recount)
    // Let's recount for safety
    const summary = {
      pending_payment: 0,
      payment_verification: 0,
      confirmed: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
      rejected: 0,
    };

    data.bookings.forEach((b) => {
      if (b.status === "pending_payment") summary.pending_payment++;
      else if (b.status === "payment_verification")
        summary.payment_verification++;
      else if (b.status === "confirmed") summary.confirmed++;
      else if (b.status === "in_progress") summary.inProgress++;
      else if (b.status === "completed") summary.completed++;
      else if (b.status === "cancelled") summary.cancelled++;
      else if (b.status === "rejected") summary.rejected++;
    });

    data.summary = summary;

    await writeJson("bookings.json", data);

    // Also need to update Dashboard stats if relevant?
    // Usage: DashboardView reads 'dashboard.json'.
    // In a real DB, these generated views are dynamic.
    // For now, we only update bookings.json. Client should reload bookings.

    revalidatePath("/lessor");
    return { success: true };
  } catch (error) {
    console.error("Failed to update booking:", error);
    return { success: false, message: "Failed to update booking status" };
  }
}
