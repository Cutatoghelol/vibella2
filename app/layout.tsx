import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Vibella — Mạng xã hội tích cực",
  description: "Vibella — Kết nối, chia sẻ thói quen tốt và lan tỏa năng lượng tích cực",
  themeColor: '#FF3B6F',
  icons: {
    icon: '/vibella-logo.svg',
    apple: '/vibella-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <Header />
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
