import React from "react";
import BookingPage from "./booking";
import type { Metadata } from "next";
import fetchCars, { car } from "@/lib/fetchCars";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const metadata: Metadata = {
  title: "Car Hub - Make a Booking",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};

export default async function page() {
  const Cars: car[] | null = await fetchCars();
  const User = {
    id: 1,
    role: "user",
    email: "you@example.com",
    username: "johndoe",
    image_url: "http://placeholder.com/image/johndoe",
    phone: "123-456-789",
  };

  return (
    <section>
      <BookingPage Cars={Cars} User={User} />
    </section>
  );
}
