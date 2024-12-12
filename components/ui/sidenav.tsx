"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  CarFront,
  CalendarDays,
  Settings,
  LogOut,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    {
      href: "/me/profile",
      icon: LayoutGrid,
      label: "Dashboard",
      title: "View Dashboard",
    },
    {
      href: "/me/orders",
      icon: CalendarDays,
      label: "My Orders",
      title: "View My Orders",
    },
    {
      href: "/me/coupons",
      icon: Tag,
      label: "Coupon Center",
      title: "Access Coupon Center",
    },
    {
      href: "/me/favorites",
      icon: CarFront,
      label: "Favorite Cars",
      title: "View Favorite Cars",
    },
    {
      href: "/me/settings",
      icon: Settings,
      label: "Settings",
      title: "Adjust Settings",
    },
  ];

  return (
    <div
      className={cn(
        "bg-white border shadow rounded-md md:sticky md:top-12 hidden md:block transition-all duration-300",
        isCollapsed ? "w-fit md:min-w-32" : "md:min-w-80"
      )}>
      <button
        onClick={toggleCollapse}
        className="absolute top-2 right-[-10px] p-1 rounded-lg bg-[#F1F3FF] hover:bg-gray-200 transition-colors border shadow"
        title={isCollapsed ? "Expand Menu" : "Collapse Menu"}>
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
      <div className="flex flex-col items-center px-6 pt-4">
        <Image
          src={user?.image ?? "/placeholder.svg"}
          height={isCollapsed ? 40 : 100}
          width={isCollapsed ? 40 : 100}
          alt="User Profile"
          className={cn(
            "rounded-full m-auto ring-offset-4 ring-2 ring-green-600 ring-offset-white object-fit",
            isCollapsed ? "w-10 h-10 mb-4" : "w-[100px] h-[100px]"
          )}
        />
        {!isCollapsed && (
          <>
            <p className="text-gray-700 font-semibold my-2 text-center capitalize">
              {user?.username}
            </p>
            <p className="text-gray-500 mb-2 break-words text-center">
              {user?.email}
            </p>
          </>
        )}
      </div>
      <div className="flex flex-col space-y-2 ">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            title={item.title}
            className={cn(
              "font-bold flex items-center gap-4 py-1.5 px-4 transition-colors",
              pathname.startsWith(item.href)
                ? "bg-green-500 text-white"
                : "text-green-500 hover:bg-green-500 hover:text-white",
              isCollapsed && "justify-center"
            )}>
            <item.icon size={20} />
            {!isCollapsed && <span>{item.label}</span>}
          </a>
        ))}
        <hr />
        <div className="pb-6">
          <a
            className={cn(
              "text-gray-400 font-bold flex items-center gap-4 hover:bg-red-100 hover:text-red-500 py-1.5 px-4 transition-colors ",
              isCollapsed && "justify-center"
            )}
            href="/api/logout"
            title="Sign Out">
            <LogOut size={20} />
            {!isCollapsed && <span>Sign Out</span>}
          </a>
        </div>
      </div>
    </div>
  );
}
