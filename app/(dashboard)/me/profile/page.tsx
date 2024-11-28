import React from "react";
import { Stats } from "@/components/ui/stats";
import { RecentOrders } from "@/components/ui/recentorders";
import { Favorites } from "@/components/ui/favorites";
import SideNav from "@/components/ui/sidenav";
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
      <div className="bg-[url('/hero.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            My Profile
          </h1>
        </div>
      </div>

      <section className="bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70 p-2">
        <div className="w-full min-h-[400px] mx-auto px-8 mt:24 md:mt-6 ">
          <div className="flex flex-col gap-2 md:flex-row  md:items-start md:gap-4 relative">
            {/* first card */}
            <SideNav pathname="dashboard" />
            {/* second div */}
            <section>
              <Stats />
              <RecentOrders />
              <Favorites />
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}
