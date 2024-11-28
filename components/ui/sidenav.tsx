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
type Props = {
  pathname: string;
};

export default async function SideNav({ pathname }: Props) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();
  if (error?.status === 401 || !data) {
    redirect("/login?post_login_redirect_url=me");
  }

  return (
    <div className="p-6 bg-white border shadow rounded-md md:sticky md:top-12 md:min-w-80 ">
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
        {data?.user?.user_metadata.username || data?.user?.user_metadata.name}
      </p>
      <p className="text-gray-500 mb-2 break-words text-center">
        {data?.user?.email}
      </p>
      <div className="flex flex-col space-y-2 ">
        <Link
          href="/me/profile"
          prefetch
          className={`${
            pathname === "dashboard"
              ? "bg-green-500 text-white"
              : "text-green-500 hover:bg-green-500 hover:text-white"
          } font-bold flex items-center gap-4 p-1.5 rounded-md`}>
          <LayoutGrid size={20} /> <span>Dashboard</span>
        </Link>
        <Link
          href="/me/orders"
          prefetch
          className={`${
            pathname === "orders"
              ? "bg-green-500 text-white"
              : "text-green-500 hover:bg-green-500 hover:text-white"
          } font-bold flex items-center gap-4 p-1.5 rounded-md`}>
          <CalendarDays size={20} /> <span>My Orders</span>
        </Link>
        <Link
          href="/me/favorites"
          prefetch
          className={`${
            pathname === "favorites"
              ? "bg-green-500 text-white"
              : "text-green-500 hover:bg-green-500 hover:text-white"
          } font-bold flex items-center gap-4 p-1.5 rounded-md`}>
          <CarFront size={20} /> <span>My Favorites</span>
        </Link>
        <Link
          href="/me/settings"
          prefetch
          className={`${
            pathname === "settings"
              ? "bg-green-500 text-white"
              : "text-green-500 hover:bg-green-500 hover:text-white"
          } font-bold flex items-center gap-4 p-1.5 rounded-md`}>
          <Settings size={20} /> <span>Settings</span>
        </Link>
        <hr />
        <Link
          className="text-gray-400  font-bold flex items-center gap-4 hover:bg-red-100 hover:text-red-500 p-1.5 rounded-md "
          href="/api/logout">
          <LogOut size={20} /> <span>Sign Out</span>
        </Link>
      </div>
    </div>
  );
}
