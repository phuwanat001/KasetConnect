// Lessor CMS Types

export type LessorView =
  | "dashboard"
  | "calendar"
  | "products"
  | "marketplace"
  | "rentals"
  | "profile";

// Dashboard Types
export interface DashboardStats {
  totalProducts: number;
  activeRentals: number;
  monthlyRevenue: number;
  pendingBookings: number;
  totalViews: number;
  completedRentals: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentBookings: Booking[];
  revenueChart: RevenueData[];
  topProducts: Product[];
}

// Booking Types
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  customerName: string;
  customerPhone: string;
  customerAvatar?: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  totalPrice: number;
  notes?: string;
  createdAt: string;
}

export interface BookingsData {
  bookings: Booking[];
  summary: {
    pending: number;
    confirmed: number;
    inProgress: number;
    completed: number;
    cancelled: number;
  };
}

// Product Types
export type ProductStatus = "active" | "inactive" | "maintenance";
export type PriceUnit = "วัน" | "ไร่" | "ชั่วโมง" | "ครั้ง" | "ก้อน";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryId: string;
  price: number;
  priceUnit: PriceUnit;
  images: string[];
  status: ProductStatus;
  isListed: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  totalRentals: number;
  totalViews: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsData {
  products: Product[];
  categories: { id: string; name: string }[];
  summary: {
    total: number;
    active: number;
    inactive: number;
    maintenance: number;
  };
}

// Rental Types
export type RentalStatus = "active" | "completed" | "cancelled" | "disputed";

export interface Rental {
  id: string;
  bookingId: string;
  productId: string;
  productName: string;
  productImage: string;
  customerName: string;
  customerPhone: string;
  customerAvatar?: string;
  startDate: string;
  endDate: string;
  actualReturnDate?: string;
  status: RentalStatus;
  totalPrice: number;
  paidAmount: number;
  paymentStatus: "pending" | "partial" | "paid";
  rating?: number;
  review?: string;
  createdAt: string;
}

export interface RentalsData {
  rentals: Rental[];
  summary: {
    active: number;
    completed: number;
    totalRevenue: number;
    averageRating: number;
  };
}

// Profile Types
export interface ServiceArea {
  provinceId: string;
  provinceName: string;
  isActive: boolean;
}

export interface OperatingHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface LessorProfile {
  id: string;
  businessName: string;
  ownerName: string;
  description: string;
  avatar: string;
  coverImage?: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  province: string;
  district: string;
  postalCode: string;
  serviceAreas: ServiceArea[];
  operatingHours: OperatingHours[];
  isVerified: boolean;
  verificationStatus: "pending" | "approved" | "rejected" | "none";
  verificationDocuments: string[];
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountName?: string;
  rating: number;
  reviewCount: number;
  totalProducts: number;
  totalRentals: number;
  memberSince: string;
}

export interface ProfileData {
  profile: LessorProfile;
}

// Marketplace Types
export interface MarketplaceListing {
  productId: string;
  productName: string;
  productImage: string;
  isListed: boolean;
  isFeatured: boolean;
  views: number;
  inquiries: number;
  bookings: number;
  conversionRate: number;
  lastUpdated: string;
}

export interface MarketplaceData {
  listings: MarketplaceListing[];
  summary: {
    totalListed: number;
    totalFeatured: number;
    totalViews: number;
    totalInquiries: number;
  };
}
