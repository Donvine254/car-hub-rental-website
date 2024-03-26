"use client";
import React, { ReactEventHandler, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { car } from "@/lib/fetchCars";
import { toast } from "sonner";
import Image from "next/image";
import {
  CalendarCheck2Icon,
  CalendarDaysIcon,
  Car,
  MapPinIcon,
} from "lucide-react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

type Props = {
  Cars: car[] | null;
  User: User | null;
};

export default function BookingPage({ Cars, User }: Props) {
  const [selectedCar, setSelectedCar] = useState<car | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const model_name = searchParams.get("car_model");
  const today = new Date();
  const formattedDate = today.toISOString().substring(0, 10);
  useEffect(() => {
    async function redirectUser() {
      if (Cars) {
        const filteredCars = Cars.filter(
          (car) =>
            car.model_name.toLocaleLowerCase() ===
            model_name?.toLocaleLowerCase()
        );
        setSelectedCar(filteredCars[0] || null);
      }
    }
    redirectUser();
  }, [model_name, Cars]);
  //   function to handle bookings
  function handleBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCar) {
      toast.error("kindly select a car first");
      return false;
    } else
      toast.success("Check your email address to confirm your booking", {
        position: "top-center",
      });
    const form = e.target as HTMLFormElement;
    form.reset();
    router.push("/me/profile");
  }

  return (
    <section className="bg-[url('/hero.jpg')] bg-cover bg-no-repeat bg-right py-5 h-full w-full flex flex-col items-center justify-center p-4">
      <h1 className=" text-center text-white md:text-start my-2 text-2xl md:text-4xl font-extrabold">
        Easy Booking
      </h1>
      <div className="px-4 py-4 border shadow bg-white xsm:w-full w-2/3 ">
        {/* div for two cards */}

        <form
          className="flex flex-col gap-2 md:grid md:grid-cols-2  md:gap-4"
          onSubmit={handleBooking}>
          {/* first card */}
          <div>
            <div className="py-2">
              <label className="inline-flex font-bold" htmlFor="model">
                <Car fill="none" className="text-green-500" />
                <span className="text-xl"> &nbsp; Car Details *</span>
              </label>

              {selectedCar ? (
                <div className="flex h-20 bg-green-100 text-base  w-full px-3 py-2 border border-gray-300 rounded-md items-center gap-2 font-bold">
                  <Image
                    src={selectedCar?.image || ""}
                    width={80}
                    height={80}
                    alt="car_image"
                  />
                  <span>{selectedCar?.model_name} &#8212; </span>
                  <span>${selectedCar?.price_per_day}</span>
                </div>
              ) : (
                <div className="h-20 px-3 py-2 border border-gray-300 rounded-md bg-background">
                  <Link
                    className=" bg-green-500 rounded-md border px-5 py-1 text-white"
                    href="/cars">
                    Select A Vehicle
                  </Link>
                </div>
              )}
            </div>
            <div className="py-2">
              <label htmlFor="pickupLocation" className="inline-flex font-bold">
                <MapPinIcon fill="none" className="text-green-500" /> &nbsp;
                Pick Up Location
              </label>
              <select
                className="flex h-10 bg-background text-base  w-full px-3 py-2 border border-gray-300 rounded-md "
                name="pickup_location"
                id="pickupLocation"
                disabled={!selectedCar}
                required>
                <option value="" hidden>
                  Choose a Pickup Location
                </option>
                <option value="nairobi" className="checked:bg-green-500">
                  Nairobi
                </option>
                <option value="kisumu" className="checked:bg-green-500">
                  Kisumu
                </option>
                <option value="mombasa" className="checked:bg-green-500">
                  Mombasa
                </option>
                <option value="thika" className="checked:bg-green-500">
                  Thika
                </option>
                <option value="nakuru" className="checked:bg-green-500">
                  Nakuru
                </option>
                <option value="eldoret" className="checked:bg-green-500">
                  Eldoret
                </option>
              </select>
            </div>
            <div className="py-2">
              <label htmlFor="dropLocation" className="inline-flex font-bold">
                <MapPinIcon fill="none" className="text-green-500" /> &nbsp;
                Drop-Off Location
              </label>
              <select
                className="flex h-10 bg-background text-base  w-full px-3 py-2 border border-gray-300 rounded-md"
                name="dropLocation"
                id="dropoff_location"
                disabled={!selectedCar}
                required>
                <option value="" hidden>
                  Choose a Drop-Off Location
                </option>
                <option value="nairobi">Nairobi</option>
                <option value="kisumu">Kisumu</option>
                <option value="mombasa">Mombasa</option>
                <option value="thika">Thika</option>
                <option value="nakuru">Nakuru</option>
                <option value="eldoret">Eldoret</option>
              </select>
            </div>
            <div className="py-2">
              <label htmlFor="pickupDate" className="inline-flex font-bold">
                <CalendarDaysIcon fill="none" className="text-green-500" />{" "}
                &nbsp; Pickup Date and Time
              </label>
              <div className="flex items-center gap-0">
                <input
                  type="date"
                  id="pickupDate"
                  name="pickup_date"
                  disabled={!selectedCar}
                  required
                  defaultValue={formattedDate}
                  className="flex h-10 bg-white text-base  w-1/2 px-1 py-2 border-y border-l border-gray-300 rounded-l-md outline-none"
                />
                <input
                  type="time"
                  name="pickupTime"
                  disabled={!selectedCar}
                  min="08:00"
                  max="18:00"
                  required
                  defaultValue="08:00"
                  className="h-10 w-1/2 bg-white text-base px-1 py-2 border-gray-300 rounded-r-md outline-none border"
                />
              </div>
            </div>
          </div>
          {/* second card */}
          <div>
            <div className="py-2">
              <label htmlFor="drop-offDate" className="inline-flex font-bold">
                <CalendarCheck2Icon fill="none" className="text-green-500" />{" "}
                &nbsp; Drop-Off Date and Time
              </label>
              <div className="flex items-center gap-0">
                <input
                  type="date"
                  name="dropoff_date"
                  id="drop-offDate"
                  disabled={!selectedCar}
                  required
                  defaultValue={formattedDate}
                  className="flex h-10 bg-white text-base  w-1/2 px-1 py-2 border-y border-l border-gray-300 rounded-l-md outline-none "
                />
                <input
                  type="time"
                  name="dropoff_time"
                  min="08:00"
                  max="18:00"
                  disabled={!selectedCar}
                  required
                  defaultValue="18:00"
                  className="h-10 w-1/2  bg-white text-base px-1 py-2 border-gray-300 rounded-r-md outline-none border"
                />
              </div>
            </div>

            <div className="py-2">
              <h1 className="text-xl font-bold">Confirm Contact Details *</h1>
              <label htmlFor="name" className="inline-flex font-bold">
                Your Name
              </label>
              <div className="flex items-center gap-0">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  defaultValue={User?.user_metadata?.username ?? "john doe"}
                  className="flex h-10 bg-white text-base  w-full px-1 py-2 border border-gray-300 rounded-md outline-none "
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="inline-flex font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  defaultValue={User?.email ?? "you@example.com"}
                  className="flex h-10 bg-white text-base  w-full px-1 py-2 border border-gray-300 rounded-md outline-none "
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="inline-flex font-bold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  placeholder="+254********"
                  className="flex h-10 bg-white text-base  w-full px-1 py-2 border border-gray-300 rounded-md outline-none "
                />
              </div>
            </div>
            <div className="py-2 md:py-0 md:flex md:items-end md:justify-end md:pb-2 ">
              <button className="border shadow-xl px-3 h-10 py-2 w-full text-white bg-green-500 hover:bg-green-600 text-xl rounded-md flex items-center justify-center ">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
