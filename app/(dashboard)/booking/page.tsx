import React from "react";
import BookingPage from "./booking";
import type { Metadata } from "next";
import fetchCars, { Car } from "@/lib/fetchCars";
import { redirect } from "next/navigation";
import { getUserData } from "@/lib/decodetoken";

export const metadata: Metadata = {
  title: "Car Hub - Make a Booking",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
interface user {
  id: number;
  username: string;
  email: string;
  phone: number;
  role: string;
  image: string;
}

export default async function page() {
  const Cars = (await fetchCars()) as Car[];
  const User = (await getUserData()) as user | null;
  if (!User) {
    return redirect(`/login?post_login_redirect_url=me`);
  }
  return (
    <section>
      <BookingPage Cars={Cars} User={User} />
    </section>
  );
}
