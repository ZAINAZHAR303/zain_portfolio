import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "./components/Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zain Azhar - Portfolio",
  description: "Portfolio website of Zain Azhar - Computer Science Student & Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
          <Sidebar />
          <main className="ml-64 flex-1 p-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
