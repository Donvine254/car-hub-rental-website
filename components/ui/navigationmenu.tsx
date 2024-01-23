"use client";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import React, { useEffect, useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
type Props = {};
type User = {};
export default function NavigationMenu({}: Props) {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();
  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (!error && data !== null) {
          setUser(data);
        }
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    })();
  }, [supabase.auth]);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <nav className="bg-gray-200 w-full py-4 min-h-20 fixed md:sticky top-0 md:z-20">
      <Script
        async
        defer
        src="https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js"></Script>
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="flex items-center gap-0">
          <Image
            alt="CarHub Logo"
            width={118}
            height={18}
            src="/logo.svg"
            className="object-contain"
          />
        </Link>
        <button
          data-collapse-toggle="mobile-menu"
          type="button"
          className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
          aria-controls="mobile-menu-2"
          aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"></path>
          </svg>
          <svg
            className="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"></path>
          </svg>
        </button>
        <div className="hidden md:block w-full md:w-auto" id="mobile-menu">
          <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-xl md:font-medium">
            <li>
              <Link
                href="/"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 hover:underline underline-offset-2 md:p-0">
                Home
              </Link>
            </li>
            <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar2"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto hover:underline underline-offset-2">
                Vehicle Models{" "}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </button>
              {/* Dropdown menu  */}
              <div
                id="dropdownNavbar2"
                className="hidden bg-white text-base z-10 list-none divide-y divide-gray-200 rounded shadow my-4 w-[84%] md:w-44">
                <ul className="py-1" aria-labelledby="dropdownLargeButton">
                  <li>
                    <Link
                      href="/cars?model=suv"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      SUVs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cars?model=saloon"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      Saloons
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cars?model=van"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      Vans
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cars?model=pickup"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      Pickup
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            {/* dropdown for account */}
            <li className={`${!user ? "hidden" : "block"}`}>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto hover:underline underline-offset-2">
                My Account{" "}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </button>
              {/* Dropdown menu  */}
              <div
                id="dropdownNavbar"
                className="hidden bg-white text-base z-10 list-none divide-y divide-gray-200 rounded shadow my-4 w-[84%] md:w-44">
                <ul className="py-1" aria-labelledby="dropdownLargeButton">
                  <li>
                    <Link
                      href="/me/profile"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/me/orders"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/me/orders"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      My Favorite Cars
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/me/settings"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      Settings
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            {/* dropdown for resources */}
            <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar3"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto hover:underline underline-offset-2">
                Resources{" "}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </button>
              {/* Dropdown menu  */}
              <div
                id="dropdownNavbar3"
                className="hidden bg-white text-base z-10 list-none divide-y divide-gray-200 rounded shadow my-4 w-[84%] md:w-44">
                <ul className="py-1" aria-labelledby="dropdownLargeButton">
                  <li>
                    <Link
                      href="/pricing"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/locations"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      Locations
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/booking"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      Booking
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      Blog
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <Link
                    href="/contact/help"
                    className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                    Help Center
                  </Link>
                </div>
              </div>
            </li>
            {/* end of dropdown */}

            <li className={`${user ? "hidden" : "block"}`}>
              <Link
                href="/login"
                className="text-gray-700 hover:bg-gray-50 xsm:border-b  md:hover:bg-green-500 md:hover:shadow  md:bg-green-500 block pl-3 pr-4 py-2 md:hover:text-white md:py-0 md:px-4 md:text-white md:text-center md:rounded-md md:h-8">
                Login
              </Link>
            </li>
            <li className={`${!user ? "hidden" : "block"} `}>
              <Link
                href="/api/logout"
                onClick={handleLogout}
                className=" text-gray-700 hover:bg-gray-50 xsm:border-b  md:hover:bg-green-500 md:hover:shadow  md:bg-green-500 block pl-3 pr-4 py-2 md:hover:text-white md:py-0 md:h-8 md:px-4 md:text-white md:text-center md:rounded-md ">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
