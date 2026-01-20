// Mock Data Loader for Lessor CMS
import dashboardData from "../mock/dashboard.json";
import bookingsData from "../mock/bookings.json";
import productsData from "../mock/products.json";
import rentalsData from "../mock/rentals.json";
import profileData from "../mock/profile.json";
import marketplaceData from "../mock/marketplace.json";

import type {
  DashboardData,
  BookingsData,
  ProductsData,
  RentalsData,
  ProfileData,
  MarketplaceData,
} from "./types";

export function getDashboardData(): DashboardData {
  return dashboardData as DashboardData;
}

export function getBookingsData(): BookingsData {
  return bookingsData as BookingsData;
}

export function getProductsData(): ProductsData {
  return productsData as ProductsData;
}

export function getRentalsData(): RentalsData {
  return rentalsData as RentalsData;
}

export function getProfileData(): ProfileData {
  return profileData as ProfileData;
}

export function getMarketplaceData(): MarketplaceData {
  return marketplaceData as MarketplaceData;
}
