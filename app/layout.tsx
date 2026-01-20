import type { Metadata } from "next";
import { ClientLayoutWrapper } from "./components/layout/ClientLayoutWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "KasetConnect - เช่าเครื่องจักรเกษตร ง่าย ประหยัด ทั่วไทย",
  description:
    "แพลตฟอร์มเช่าเครื่องจักรเกษตรที่ครบวงจรที่สุดในประเทศไทย เชื่อมต่อเกษตรกรกับเครื่องจักรคุณภาพกว่า 5,000+ รายการ ใน 77 จังหวัดทั่วประเทศ",
  keywords: [
    "เช่าเครื่องจักรเกษตร",
    "รถแทรกเตอร์",
    "รถเกี่ยวข้าว",
    "โดรนเกษตร",
    "อุปกรณ์การเกษตร",
    "เกษตรกรไทย",
    "KasetConnect",
  ],
  openGraph: {
    title: "KasetConnect - เช่าเครื่องจักรเกษตร ง่าย ประหยัด ทั่วไทย",
    description: "แพลตฟอร์มเช่าเครื่องจักรเกษตรที่ครบวงจรที่สุดในประเทศไทย",
    type: "website",
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Chiron+Hei+HK:ital,wght@0,200..900;1,200..900&family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Sans+Thai:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
