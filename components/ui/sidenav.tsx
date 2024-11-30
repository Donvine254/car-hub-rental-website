"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  CarFront,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";
type Props = {
  user: {
    id: number;
    username: string;
    email: string;
    phone: number | null;
    role: string;
    image: string | null;
  };
};

export default function SideNav({ user }: Props) {
  const pathname = usePathname();
  console.log(user);
  return (
    <div className="p-6 bg-white border shadow rounded-md md:sticky md:top-12 md:min-w-80 ">
      <Image
        src={user?.image ?? "./placeholder.png"}
        height={100}
        width={100}
        alt="User Profile"
        className="w-[100px] h-[100px] rounded-full m-auto ring-offset-4 ring-2 ring-green-600 ring-offset-white"
      />

      <p className="text-gray-700 font-semibold my-2 text-center capitalize">
        {user?.username}
      </p>
      <p className="text-gray-500 mb-2 break-words text-center">
        {user?.email}
      </p>
      <div className="flex flex-col space-y-2 ">
        <Link
          href="/me/profile"
          className={`${
            pathname.startsWith("/me/profile")
              ? "bg-green-500 text-white"
              : "text-green-500 hover:bg-green-500 hover:text-white"
          } font-bold flex items-center gap-4 p-1.5 rounded-md`}>
          <LayoutGrid size={20} /> <span>Dashboard</span>
        </Link>
        <Link
          href="/me/orders"
          className={`${
            pathname.startsWith("/me/orders")
              ? "bg-green-500 text-white"
              : "text-green-500 hover:bg-green-500 hover:text-white"
          } font-bold flex items-center gap-4 p-1.5 rounded-md`}>
          <CalendarDays size={20} /> <span>My Orders</span>
        </Link>
        <Link
          href="/me/favorites"
          className={`${
            pathname.startsWith("/me/favorites")
              ? "bg-green-500 text-white"
              : "text-green-500 hover:bg-green-500 hover:text-white"
          } font-bold flex items-center gap-4 p-1.5 rounded-md`}>
          <CarFront size={20} /> <span>My Favorites</span>
        </Link>
        <Link
          href="/me/settings"
          className={`${
            pathname.startsWith("/me/settings")
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
