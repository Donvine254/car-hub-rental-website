"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function ProfileHeroComponent() {
  const pathname = usePathname();

  // Map pathnames to display titles
  const pathTitles: { [key: string]: string } = {
    "/me/profile": "My Profile",
    "/me/orders": "My Orders",
    "/me/favorites": "My Favorite Cars",
    "/me/settings": "Settings",
    "/me/coupons": "Coupons Center",
  };

  // Default to an empty string if the path is not in the map
  const displayTitle = pathTitles[pathname] || "Page";

  return (
    <div className="bg-[url('/subheader.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="bg-black flex items-center justify-center bg-opacity-30 px-6 py-10 md:py-20">
        <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize text-white md:py-4">
          {displayTitle}
        </h1>
      </div>
    </div>
  );
}
