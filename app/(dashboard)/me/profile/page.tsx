import React from "react";
import { Stats } from "@/components/ui/stats";
import { RecentOrders } from "@/components/ui/recentorders";
import { Favorites } from "@/components/ui/favorites";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Car Hub - My Profile ",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
type Props = {};

export default async function Profile({}: Props) {
  return (
    <section>
      <Stats />
      <RecentOrders />
      <Favorites />
    </section>
  );
}
