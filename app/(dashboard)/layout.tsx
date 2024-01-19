import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import NavigationMenu from "@/components/ui/navigationmenu";
import "../globals.css";

export const metadata: Metadata = {
  title: "Car Hub",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors closeButton theme="light" />
        <NavigationMenu />
        {children}
      </body>
    </html>
  );
}
