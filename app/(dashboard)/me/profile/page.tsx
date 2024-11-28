import React from "react";
import { Stats } from "@/components/ui/stats";
import { RecentOrders } from "@/components/ui/recentorders";
import { Favorites } from "@/components/ui/favorites";
import SideNav from "@/components/ui/sidenav";

type Props = {};

export default async function Profile({}: Props) {
  return (
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
  );
}
