import React from "react";
import BookingPage from "./booking";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserData } from "@/lib/actions/decodetoken";
import BookingComponent from "./booking-component";

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
// only fetch the current car, we can redirect with the car id in the params
export default async function page() {
  const User = (await getUserData()) as user | null;
  if (!User) {
    return redirect(`/login?post_login_redirect_url=me`);
  }
  return (
    <section>
      <BookingComponent User={User} />
    </section>
  );
}
