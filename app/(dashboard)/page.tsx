import Link from "next/link";

import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/assets";
import Homebooking from "@/components/ui/homebooking";
import { Clock10Icon, MapPinIcon, TagIcon, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="pt-32 md:pt-0">
      <section className="relative bg-[url('https://watermark.lovepik.com/photo/20211208/large/lovepik-forest-road-highway-picture_501669994.jpg')] bg-cover bg-no-repeat bg-right py-5 h-full ">
        <div className="md:h-screen w-full  px-4 py-2 md:flex md:items-center md:justify-center md:gap-4 ">
          <div className="flex-1 bg-black rounded-md bg-opacity-40 p-2">
            <h1 className="text-white text-4xl md:text-6xl font-semibold leading-loose tracking-wide ">
              Explore the world with comfortable car
            </h1>
            <h3 className="text-gray-100 text-xl  font-semibold  my-2 leading-loose">
              Embark on unforgettable adventures and discover the world in
              unparalleled comfort and style with our fleet of exceptionally
              comfortable cars.
            </h3>
          </div>
          <div className="flex-1 w-full md:w-1/2">
            <Homebooking />
          </div>
        </div>
      </section>
      <section className="bg-[#f8f9fa] py-12">
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
            <div className="space-y-2">
              <Image src="/car.png" width={680} height={680} alt="car" />
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
      </section>
      <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black w-full h-full  bg-opacity-60">
          <div className="p-6 my-12 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
              <h2 className="text-4xl font-bold flex-1 text-white">
                We offer customers a wide range of{" "}
                <span className="text-green-500">commercial cars</span> and{" "}
                <span className="text-green-500">luxury cars</span> &nbsp; for
                any occasion.
              </h2>
              <p className="mt-4 text-base  flex-1 text-white leading-loose">
                At our car rental agency, we believe that everyone deserves the
                pleasure of driving a reliable and comfortable vehicle,
                regardless of the budget. We have created a diverse fleet with
                maintained cars, ranging from standard to prestigious, SUV to
                compact performance cars.
                <br />
                Our tailored services allow you an easy and convenient way to
                drive luxury vehicles. Whether you need transportation for a
                business event, vacation, emergency, or to enjoy a planned
                getaway, we have flexible rental options to suit.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10 text-white">
              <div className="text-center py-4 px-4 bg-slate-800 bg-opacity-30 rounded-md border">
                <h3 className="text-3xl font-bold ">1542</h3>
                <p className="text-sm text-white">Completed Orders</p>
              </div>
              <div className="text-center py-2 px-4 bg-slate-800 bg-opacity-30 rounded-md border">
                <h3 className="text-3xl font-bold">800</h3>
                <p className="text-sm text-white">Happy Customers</p>
              </div>
              <div className="text-center py-2 px-4 bg-slate-800 bg-opacity-30 rounded-md border">
                <h3 className="text-3xl font-bold">123</h3>
                <p className="text-sm text-white">Vehicles Fleet</p>
              </div>
              <div className="text-center py-2 px-4 bg-slate-800 bg-opacity-30 rounded-md border">
                <h3 className="text-3xl font-bold">5</h3>
                <p className="text-sm text-white">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f8f9fa] py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">Testimonials</h2>
          <div className="mt-8 md:grid md:grid-cols-3 gap-4">
            <blockquote className="p-4 bg-white">
              <p className="text-sm text-gray-600">
                &quot;Excellent Service! Car Rent Service! I have been using
                your service for many years and always get the same excellent
                service no matter who I deal with!&quot;
              </p>
              <footer className="mt-4">
                <p className="text-sm font-medium">John Doe</p>
              </footer>
            </blockquote>
            <blockquote className="p-4 bg-white">
              <p className="text-sm text-gray-600">
                &quot;Excellent Service! Car Rent Service! We have been using
                your service for many years and always get the same excellent
                service no matter who I deal with!&quot;
              </p>
              <footer className="mt-4">
                <p className="text-sm font-medium">Jane Smith</p>
              </footer>
            </blockquote>
            <blockquote className="p-4 bg-white">
              <p className="text-sm text-gray-600">
                &quot;Excellent Service! Car Rent Service! I have been using
                your service for many years and always get the same excellent
                service no matter who I deal with!&quot;
              </p>
              <footer className="mt-4">
                <p className="text-sm font-medium">Michael Johnson</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
      <footer className="bg-[#333] text-white">
        <div className="container mx-auto py-12 px-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold">Any Questions?</h3>
              <p className="mt-4 text-sm">
                Rental customer care is here to help you anytime.
              </p>
              <p className="mt-2 text-2xl font-bold">+254702018099</p>
              <button className="mt-4 bg-green-600 px-4 py-2">
                Contact Us
              </button>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold">About Carhub</h4>
                <nav className="mt-4 space-y-2 flex flex-col gap-2">
                  <Link className="text-sm" href="#">
                    About
                  </Link>
                  <Link className="text-sm" href="#">
                    Blog
                  </Link>
                  <Link className="text-sm" href="#">
                    Terms and Conditions
                  </Link>
                </nav>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Social Network</h4>
                <div className="mt-4 flex space-x-4">
                  <FacebookIcon />
                  <TwitterIcon />
                  <InstagramIcon />
                  <YoutubeIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-1 border-t border-gray-700">
            <p className="text-sm">Copyright 2023 - Carhub design by Donvine</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
