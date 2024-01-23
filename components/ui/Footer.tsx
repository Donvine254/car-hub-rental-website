import React from "react";

import Link from "next/link";
import Image from "next/image";
import { Clock, MailIcon, MapPinnedIcon, Phone, Twitter } from "lucide-react";
import { FacebookIcon, InstagramIcon, TiktokIcon, YoutubeIcon } from "@/assets";

export default function Footer() {
  return (
    <div>
      <div className="bg-[#f8f9fa] border bg-opacity-80 text-center text-neutral-600  lg:text-left">
        <div className="mx-6 py-4 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="">
              <Link href="/" className="flex items-center gap-0">
                <Image
                  alt="CarHub Logo"
                  width={118}
                  height={18}
                  src="/logo.svg"
                  className="object-contain"
                />
              </Link>
              <div className="py-4">
                <div className="inline-flex py-2">
                  <MapPinnedIcon fill="none" className="text-green-500" />
                  <p className="leading-loose font-semibold">
                    &nbsp; 123 Kimathi Street, Nairobi
                  </p>
                </div>
                <div className="flex items-center gap-1 py-2">
                  <Clock fill="none" className="text-green-500" />
                  <p>Mon - Fri 08.00 - 18.00</p>
                </div>
                <div className="flex items-center gap-4 py-2 text-green-500">
                  <FacebookIcon />
                  <Twitter />
                  <InstagramIcon />
                  <YoutubeIcon />
                  <TiktokIcon />
                </div>
              </div>
            </div>
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Services
              </h6>
              <p className="mb-4">
                <a
                  href="/booking"
                  className="text-neutral-600 dark:text-neutral-200">
                  Car Rental
                </a>
              </p>
              <p className="mb-4">
                <a
                  href="/cars"
                  className="text-neutral-600 dark:text-neutral-200">
                  Special Events
                </a>
              </p>
              <p className="mb-4">
                <a
                  href="/services"
                  className="text-neutral-600 dark:text-neutral-200">
                  Tour Guide
                </a>
              </p>
            </div>
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Quick Links
              </h6>
              <p className="mb-4">
                <a
                  href="/pricing"
                  className="text-neutral-600 dark:text-neutral-200">
                  Pricing
                </a>
              </p>
              <p className="mb-4">
                <a
                  href="/faqs"
                  className="text-neutral-600 dark:text-neutral-200">
                  FAQs
                </a>
              </p>

              <p className="mb-4">
                <a
                  href="/privacy"
                  className="text-neutral-600 dark:text-neutral-200">
                  Privacy Policy
                </a>
              </p>
              <p>
                <a
                  href="/help"
                  className="text-neutral-600 dark:text-neutral-200">
                  Help
                </a>
              </p>
            </div>

            <div>
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Contact Us
              </h6>
              <p className="mb-4 flex items-center justify-center md:justify-start gap-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-green-500">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
                123 Kimathi Street, NRB.
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start gap-2 cursor-pointer">
                <MailIcon fill="none" className="text-green-500" />
                <a href="mailto:admin@carhub.com" target="_blank">
                  info@carhubke.com
                </a>
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start gap-2 cursor-pointer">
                <Phone fill="none" className="text-green-500" />
                <a href="tel:+254 702018099" target="_blank">
                  +254702018099
                </a>
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start gap-2 cursor-pointer">
                <svg
                  viewBox="0 0 1024 1024"
                  height="24"
                  fill="currentColor"
                  className="text-green-500"
                  width="24">
                  <path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" />
                </svg>
                Download Brochure
              </p>
            </div>
          </div>
        </div>
        <div className="bg-neutral-200 py-1 text-center dark:bg-neutral-700">
          <p>&copy; {new Date().getFullYear()} - Carhub design by Donvine</p>
        </div>
      </div>
    </div>
  );
}
