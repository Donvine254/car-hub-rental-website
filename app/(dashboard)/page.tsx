import type { Metadata } from "next";
import Image from "next/image";
import Homebooking from "@/components/ui/homebooking";
import {
  Clock10Icon,
  MapPinIcon,
  PhoneCallIcon,
  ShieldCheckIcon,
  TagIcon,
  Trophy,
} from "lucide-react";
import Testimonials from "@/components/ui/testimonials";
import Carshowcase from "@/components/ui/carshowcase";
import ScrollToTopButton from "@/components/ui/scrollButton";
import HeroSection from "@/components/ui/heroSection";
import Link from "next/link";
import { GoogleOneTapLogin } from "../(auth)/login/google";

export const metadata: Metadata = {
  title: "Car Hub - Homepage",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};

export default function Home() {
  return (
    <div className=" bg-green-500 w-full relative">
      <section className="relative bg-[url('/subheader.jpg')] bg-cover bg-no-repeat bg-right py-5 h-full ">
        <div className="md:h-screen w-full  px-4 py-2 md:flex md:items-center md:justify-center md:gap-4 ">
          <div className="flex-1 p-2">
            <h1 className="text-white text-center md:text-start xsm:text-3xl text-5xl md:text-6xl font-semibold md:leading-tight  md:tracking-wide ">
              Explore the world with comfortable car
            </h1>
            <h3 className="text-gray-100 xsm:text-base text-2xl md:text-2xl tracking-wide font-semibold  my-2 leading-loose">
              Embark on unforgettable adventures and discover the world in
              unparalleled comfort and style with our fleet of exceptionally
              comfortable cars.
            </h3>
          </div>
          <div className="flex-1 w-full md:w-1/2 ">
            <Homebooking />
          </div>
        </div>
      </section>
      <section className="bg-[#f8f9fa] py-12">
        <div className="bg-[url('/why-us-bg.png')] bg-contain bg-center bg-no-repeat">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl font-bold text-center text-green-500 py-1 px-4 border bg-gray-200 w-fit">
                Why Choose Us
              </p>
              <h1 className="text-4xl font-bold text-center ">Our Features</h1>
            </div>

            <div className="mt-8 flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-8">
              <div className="py-2 space-y-4 flex-col items-center">
                <div className="flex justify-between gap-2">
                  <div className="w-fit h-fit px-2 py-2 bg-green-500 rounded-md">
                    <Trophy fill="none" className="text-white" size={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      First Class Services
                    </h3>
                    <p className="mt-2 text-base text-gray-600">
                      Experience convenience, safety, and customization, paving
                      the way for unforgettable adventures and seamless mobility
                      solutions.
                    </p>
                  </div>
                </div>
                <div className="flex justify-between gap-2">
                  <div className="w-fit h-fit px-2 py-2 bg-green-500 rounded-md">
                    <TagIcon fill="none" className="text-white" size={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      Quality & Maximum Efficiency
                    </h3>
                    <p className="mt-2 text-base text-gray-600">
                      Uncompromising quality and efficiency with maximum comfort
                      while ensuring brilliant transportation solutions to make
                      the most of your car rental experience.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 py-2 flex-col items-center">
                <Image
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1706566325/cars/u103yff7rpt9li9cgvaj.png"
                  width={680}
                  placeholder="blur"
                  blurDataURL="/vehicle-placeholder.png"
                  height={680}
                  alt="car"
                />
                <div className="flex justify-between gap-2">
                  <div className="w-fit h-fit px-2 py-2 bg-green-500 rounded-md">
                    <ShieldCheckIcon
                      fill="none"
                      className="text-white"
                      size={40}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold ">
                      Free Vehicle Insurance
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 ">
                      Our Vehicles are Insured for injuries and damage you may
                      cause to others while driving. You will have to pay at
                      most the deductible if the cars bodywork is damaged.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 py-2 flex-col items-center ">
                <div className="flex justify-between gap-2 items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-right">
                      24/7 Road Assistance
                    </h3>
                    <p className="mt-2 text-base text-gray-600 text-right">
                      Reliable support when you need it most, keeping you on the
                      move with confidence and peace of mind.
                    </p>
                  </div>
                  <div className="w-fit h-fit px-2 py-2 bg-green-500 rounded-md">
                    <Clock10Icon className="text-white" fill="none" size={40} />
                  </div>
                </div>
                <div className="flex justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-right">
                      Free Pick-Up & Drop-Off
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 text-right">
                      Enjoy free pickup and drop-off services, adding an extra
                      layer of ease to your car rental experience.
                    </p>
                  </div>
                  <div className="w-fit h-fit px-2 py-2 bg-green-500 rounded-md">
                    <MapPinIcon fill="none" className="text-white" size={40} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Carshowcase />
      <HeroSection />
      <Testimonials />
      <section className="bg-green-500 text-white py-12 grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 items-center my-2 shadow">
        <div className="flex flex-col gap-4 sm:w-1/2 sm:mx-auto">
          <p className="text-base font-bold w-fit text-gray-100 py-1 px-4 rounded-md bg-[#098e07] xsm:w-full xsm:text-center">
            Call us for more information
          </p>
          <h2 className="text-4xl lg:text-4xl font-bold text-white xsm:text-center">
            Our customer care is here to help you anytime.
          </h2>
        </div>
        <div className="flex flex-col items-start sm:items-center gap-4 sm:w-1/2 sm:mx-auto xsm:items-center">
          <PhoneCallIcon className="fill-white " size={48} />
          <p className="text-base md:text-xl font-extralight">CALL US NOW</p>
          <a
            href="tel:+254702018079"
            className="text-2xl md:text-3xl lg:text-4xl font-bold">
            +254702018099
          </a>
          <Link
            href="/help"
            className="bg-[#18a710] rounded-md xsm:w-1/2 text-center px-2 py-1 hover:shadow-2xl hover:shadow-white font-bold">
            Contact Us
          </Link>
        </div>
      </section>

      <ScrollToTopButton />
    </div>
  );
}
