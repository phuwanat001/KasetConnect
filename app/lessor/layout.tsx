import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "KasetLessor - ระบบจัดการร้านค้าเครื่องจักร",
  description:
    "ระบบจัดการร้านค้า การจอง และเครื่องจักรสำหรับผู้ให้เช่า KasetConnect",
};

export default function LessorRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="antialiased font-sans">{children}</div>;
}
