import React from "react";
import BookingPage from "./booking";
import type { Metadata } from "next";
import fetchCars, { car } from "@/lib/fetchCars";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const metadata: Metadata = {
  title: "Car Hub - Make a Booking",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};

export default async function page() {
  const Cars: car[] | null = await fetchCars();
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  if (error?.status === 401) {
    toast.error("Login required to perform this action! ", {
      position: "top-center",
    });
    setTimeout(() => {
      redirect("/login?post_login_redirect_url=/booking");
    }, 1000);
  }
  return (
    <section>
      <BookingPage Cars={Cars} User={data.user} />
    </section>
  );
}
