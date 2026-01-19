// Mock data loader utilities
import type {
  DashboardData,
  Category,
  User,
  LessorsData,
  RentalsData,
  NotificationsData,
  AiData,
  MarketplaceData,
} from "./types";

// Import mock data directly (for client-side use in Next.js)
import dashboardJson from "../mock/dashboard.json";
import categoriesJson from "../mock/categories.json";
import usersJson from "../mock/users.json";
import lessorsJson from "../mock/lessors.json";
import rentalsJson from "../mock/rentals.json";
import notificationsJson from "../mock/notifications.json";
import aiJson from "../mock/ai.json";
import marketplaceJson from "../mock/marketplace.json";

export function getDashboardData(): DashboardData {
  return {
    summary: dashboardJson.summary,
    activity_chart: dashboardJson.activity_chart,
    upcoming_pickups: dashboardJson.upcoming_pickups,
  } as DashboardData;
}

export function getCategoriesData(): Category[] {
  return categoriesJson.items as Category[];
}

export function getUsersData(): User[] {
  return usersJson.items as User[];
}

export function getLessorsData(): LessorsData {
  return {
    summary: lessorsJson.summary,
    items: lessorsJson.items,
  } as LessorsData;
}

export function getRentalsData(): RentalsData {
  return {
    summary: rentalsJson.summary,
    items: rentalsJson.items,
  } as RentalsData;
}

export function getNotificationsData(): NotificationsData {
  return {
    unread_count: notificationsJson.unread_count,
    items: notificationsJson.items,
  } as NotificationsData;
}

export function getAiData(): AiData {
  return aiJson as unknown as AiData;
}

export function getMarketplaceData(): MarketplaceData {
  return {
    summary: marketplaceJson.summary,
    items: marketplaceJson.items,
  } as MarketplaceData;
}
