// TypeScript interfaces for Admin Panel mock data

// Dashboard
export interface DashboardSummary {
  rentals_today: number;
  active_rentals: number;
  pending_lessors: number;
  total_revenue: string;
}

export interface UpcomingPickup {
  id: string;
  month: string;
  day: number;
  equipment_name: string;
  lessor_name: string;
  renter_name: string;
  color: "blue" | "green";
}

export interface ActivityChart {
  labels: string[];
  data: number[];
}

export interface DashboardData {
  summary: DashboardSummary;
  activity_chart: ActivityChart;
  upcoming_pickups: UpcomingPickup[];
}

// Categories
export interface Category {
  id: string;
  name: string;
  name_en: string;
  icon: string;
  status: "active" | "inactive";
  equipment_count: number;
  created_at: string;
}

// Users
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "renter" | "lessor";
  status: "active" | "suspended";
  trust_score: number;
  total_rentals: number;
  registered_at: string;
}

// Lessors
export interface LessorSummary {
  pending: number;
  active: number;
  suspended: number;
}

export interface Lessor {
  id: string;
  business_name: string;
  contact_person: string;
  email: string;
  phone: string;
  equipment_count: number;
  rating: number;
  total_rentals: number;
  status: "approved" | "pending" | "suspended";
  verified_at?: string;
  applied_at?: string;
  suspended_reason?: string;
  suspended_at?: string;
}

export interface LessorsData {
  summary: LessorSummary;
  items: Lessor[];
}

// Rentals
export interface RentalSummary {
  all: number;
  pending: number;
  active: number;
  returned: number;
  damaged: number;
}

export interface Rental {
  id: string;
  equipment_name: string;
  equipment_id: string;
  lessor_id: string;
  lessor_name: string;
  renter_id: string;
  renter_name: string;
  start_date: string;
  end_date: string;
  total_price: number;
  deposit: number;
  status: "active" | "pending" | "returned" | "damaged";
  damage_note?: string;
}

export interface RentalsData {
  summary: RentalSummary;
  items: Rental[];
}

// Notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  target: "all" | "renters" | "lessors";
  target_label: string;
  channels: ("in_app" | "email")[];
  date: string;
  status: "sent" | "scheduled";
  sent_count: number;
}

export interface NotificationsData {
  unread_count: number;
  items: Notification[];
}

// AI
export interface AiSetting {
  enabled: boolean;
  description: string;
}

export interface AiUsageItem {
  value: number;
  percentage: number;
  label: string;
}

export interface AiData {
  system_status: "operational" | "degraded" | "offline";
  last_updated: string;
  settings: {
    smart_recommendation: AiSetting;
    chatbot_assistant: AiSetting;
    price_optimization: AiSetting;
    fraud_detection: AiSetting;
  };
  usage_today: {
    matches: AiUsageItem;
    chat_responses: AiUsageItem;
    fraud_alerts: AiUsageItem;
  };
  model_info: {
    recommendation_model: string;
    chatbot_model: string;
    last_trained: string;
  };
}

// Marketplace
export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price_per_day: number;
  lessor_id: string;
  lessor_name: string;
  location: string;
  rating: number;
  total_reviews: number;
  images: string[];
  status: "available" | "rented" | "maintenance" | "inactive";
  created_at: string;
  specifications: {
    brand?: string;
    model?: string;
    year?: number;
    condition?: string;
  };
}

export interface MarketplaceData {
  summary: {
    total: number;
    available: number;
    rented: number;
    maintenance: number;
  };
  items: MarketplaceItem[];
}

// Navigation
export type AdminView =
  | "dashboard"
  | "categories"
  | "users"
  | "lessors"
  | "rentals"
  | "marketplace"
  | "notifications"
  | "ai";

export interface NavItem {
  id: AdminView;
  label: string;
  icon: string;
  badge?: number;
}
