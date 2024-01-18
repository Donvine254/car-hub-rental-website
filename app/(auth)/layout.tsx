import type { Metadata } from "next";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/sonner";
import "../../app/globals.css";

export const metadata: Metadata = {
  title: "Car Hub",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <Sonner richColors closeButton theme="light" />
        {children}
      </body>
    </html>
  );
}
