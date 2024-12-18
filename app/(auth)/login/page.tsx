import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Login from "./Login";
export const metadata: Metadata = {
  title: "Car Hub- Login to your account",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
type Props = {};

export default function LoginPage({}: Props) {
  return (
    <section>
      {/* show this in large devices */}
      <div className="hidden lg:flex min-h-screen w-full bg-gradient-to-br from-green-200 via-teal-200 to-blue-200 items-center justify-center p-4">
        <div className="w-full max-w-[1000px] bg-white rounded-xl overflow-hidden flex">
          {/* Left side with illustration */}
          <div className="w-1/2 bg-[#F7FCFF]">
            <Image
              alt="CarHub Logo"
              width={118}
              height={18}
              src="/logo.svg"
              className="object-contain m-4"
            />

            <div className="flex items-center justify-center h-full pl-10 bg-[url('/why-us-bg.png')] bg-contain bg-center bg-no-repeat">
              <Image
                src="https://res.cloudinary.com/dipkbpinx/image/upload/v1734537690/cars/b2irjm7jub55tqtxaqya.png"
                alt="Car rental illustration"
                width={800}
                height={450}
                className="my-auto "
                priority
              />
            </div>
            {/* show horizontal lines */}
          </div>

          {/* Right side with form */}
          <div className="flex-1">
            <Login />
          </div>
        </div>
      </div>
      {/* show this in small devices */}
      <section className="w-full bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70 lg:hidden">
        <Login />
      </section>
    </section>
  );
}
