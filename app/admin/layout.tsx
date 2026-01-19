import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "KasetConnect",
  description: "Connect with Kasetsart University community ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
