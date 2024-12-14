import React from "react";
import { Stats } from "@/components/ui/stats";
import { RecentOrders } from "@/components/ui/recentorders";
import type { Metadata } from "next";
import { prisma } from "@/db/prisma";
import { getUserData } from "@/lib/actions/decodetoken";
import { redirect } from "next/navigation";
import fetchCars, { Car } from "@/lib/actions/car-actions/fetchCars";
import CarCarousel from "@/components/ui/carCarousel";
import Favorites from "./favorites";
export const metadata: Metadata = {
  title: "Car Hub - My Profile ",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
type Props = {};
interface user {
  id: number;
  username: string;
  email: string;
  phone: number;
  role: string;
  image: string;
}
export default async function Profile({}: Props) {
  const User = (await getUserData()) as user | null;
  if (!User) {
    return redirect(`/login?post_login_redirect_url=me`);
  }
  const orders = await prisma.booking.findMany({
    where: {
      userId: User.id,
    },
    include: {
      car: {
        select: {
          modelName: true,
          id: true,
        },
      },
    },
  });
  const recentOrders = orders
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) // Sort by `createdAt` in descending order
    .slice(0, 5);
  const cars = (await fetchCars()) as Car[];
  // Shuffle the cars array and select the first three cars
  const randomCars = cars
    ? [...cars].sort(() => 0.5 - Math.random()).slice(0, 5)
    : [];
  return (
    <section>
      <Stats orders={orders} />
      <RecentOrders orders={recentOrders} />
      {/* favorite car showcase */}
      <Favorites Cars={randomCars} />
    </section>
  );
}
