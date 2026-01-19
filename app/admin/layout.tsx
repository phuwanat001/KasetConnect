import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "KasetConnect - ระบบจัดการหลังบ้าน",
  description: "ระบบจัดการหลังบ้าน KasetConnect สำหรับผู้ดูแลระบบ",
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
