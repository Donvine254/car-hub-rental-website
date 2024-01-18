import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import React from "react";

type Props = {};

export default function NavigationMenu({}: Props) {
  return (
    <nav className="bg-gray-200 w-full py-4 min-h-20 fixed md:sticky top-0 md:z-20">
      <Script
        async
        defer
        src="https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js"></Script>
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="flex">
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
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto">
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
                <div className="py-1">
                  <Link
                    href="/api/logout"
                    className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                    Sign out
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar2"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto">
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
            {/* end of dropdown */}
            <li>
              <a
                href="/booking"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">
                Booking
              </a>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-blue-700 md:border md:bg-blue-500 block pl-3 pr-4 py-2 md:hover:text-white md:py-0 md:px-4 md:text-white md:text-center md:rounded-md">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
