import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutGrid,
  CarFront,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";
import { Stats } from "@/components/ui/stats";
import { RecentOrders } from "@/components/ui/recentorders";
import { Favorites } from "@/components/ui/favorites";

type Props = {};

export default async function Profile({}: Props) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  if (error?.status === 401) {
    redirect("/login?post_login_redirect_url=me/profile");
  }

  return (
    <section className="bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70 p-2">
      <div className="w-full min-h-[400px] mx-auto px-8 mt:24 md:mt-6 ">
        <div className="flex flex-col gap-2 md:flex-row  md:items-start md:gap-4 relative">
          {/* first card */}
          <div className="p-6 bg-white border shadow rounded-md md:sticky md:top-12 ">
            <Image
              src={
                data?.user?.user_metadata.avatar_url ??
                data?.user?.user_metadata.imageUrl
              }
              height={100}
              width={100}
              alt="User Profile"
              className="w-[100px] h-[100px] rounded-full m-auto ring-offset-4 ring-2 ring-green-600 ring-offset-white"
            />

            <p className="text-gray-700 font-semibold my-2 text-center">
              {data?.user?.user_metadata.username}
            </p>
            <p className="text-gray-500 mb-2 break-words text-center">
              {data?.user?.email}
            </p>
            {/* <p className="text-gray-700 font-semibold mb-2">Phone</p>
          <p className="text-gray-700 mb-2">
            {data?.user?.phone === ""
              ? "Update your Phone Number"
              : data?.user?.phone}
          </p> */}
            <div className="flex flex-col space-y-2 ">
              <Link
                href="/me/dashboard"
                className="text-green-500  font-bold flex items-center gap-4 hover:bg-green-500 hover:text-white p-1.5 rounded-md ">
                <LayoutGrid size={20} /> <span>Dashboard</span>
              </Link>
              <Link
                href="/me/orders"
                className="text-green-500  font-bold flex items-center gap-4 hover:bg-green-500 hover:text-white p-1.5 rounded-md ">
                <CalendarDays size={20} /> <span>My Orders</span>
              </Link>
              <Link
                href="/me/favorites"
                className="text-green-500  font-bold flex items-center gap-4 hover:bg-green-500 hover:text-white p-1 rounded-md">
                <CarFront size={20} /> <span>My Favorites</span>
              </Link>
              <Link
                href="/me/settings"
                className="text-green-500  font-bold flex items-center gap-4 hover:bg-green-500 hover:text-white p-1.5 rounded-md ">
                <Settings size={20} /> <span>Settings</span>
              </Link>
              <Link
                className="text-green-500 bg-gray-100 shadow font-bold flex items-center gap-4 hover:bg-red-100 hover:text-red-500 p-1.5 rounded-md "
                href="/api/logout">
                <LogOut size={20} /> <span>Sign Out</span>
              </Link>
            </div>
          </div>
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
