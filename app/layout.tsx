import type { Metadata } from "next";
import { Geist } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";


const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskMaster - Organize Your Day",
  description: "A modern and minimal task management application"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geist.className} min-h-full flex flex-col bg-gray-950 text-gray-100`}>
        <NavBar />
        <div className="flex-grow pt-16">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
