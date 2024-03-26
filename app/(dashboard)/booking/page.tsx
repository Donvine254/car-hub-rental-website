"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import fetchCars, { car } from "@/lib/fetchCars";
import { toast } from "sonner";
import { getSession } from "@/lib/loginstatus";
import Image from "next/image";
type Props = {
  Cars: car[];
};

import {
  CalendarCheck2Icon,
  CalendarDaysIcon,
  Car,
  MapPinIcon,
} from "lucide-react";
import Link from "next/link";
export default function BookingPage({}: Props) {
  const [selectedCar, setSelectedCar] = useState<car | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const model_name = searchParams.get("car_model");
  const today = new Date();
  const formattedDate = today.toISOString().substring(0, 10);
  useEffect(() => {
    async function redirectUser() {
      const Cars: car[] | null = await fetchCars();
      if (Cars) {
        const filteredCars = Cars.filter(
          (car) =>
            car.model_name.toLocaleLowerCase() ===
            model_name?.toLocaleLowerCase()
        );
        setSelectedCar(filteredCars[0] || null);
      }
      const session = await getSession();
      if (!session) {
        toast.error("Login required to perform this action! ", {
          position: "top-center",
        });
        setTimeout(() => {
          router.push("/login?post_login_redirect_url=/booking");
        }, 1000);
      }
    }
    redirectUser();
  }, [router, model_name]);

  return (
    <section className="bg-[url('/hero.jpg')] bg-cover bg-no-repeat bg-right py-5 h-full w-full flex flex-col items-center justify-center p-4">
      <h1 className=" text-center text-white md:text-start my-2 text-2xl md:text-4xl font-extrabold">
        Easy Booking
      </h1>
      <div className="px-4 py-4 border shadow bg-white xsm:w-full w-2/3 ">
        {/* div for two cards */}
        {/* first card */}

        <form
          className="flex flex-col gap-2 md:grid md:grid-cols-2  md:gap-4"
          action={`/booking?${FormData}`}>
          <div className="py-2">
            <label className="inline-flex font-bold" htmlFor="model">
              <Car fill="none" className="text-green-500" />
              <span> &nbsp; Car Details *</span>
            </label>

            <div
              className="flex h-fit bg-background text-base  w-full px-3 py-2 border border-gray-300 rounded-md items-center gap-2 font-bold"
              id="model">
              {selectedCar ? (
                <div>
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
                <Link
                  className=" bg-green-500 rounded-md border px-5 py-1 text-white"
                  href="/cars">
                  Select A Vehicle
                </Link>
              )}
            </div>
          </div>
          <div className="py-2">
            <label htmlFor="pickupLocation" className="inline-flex font-bold">
              <MapPinIcon fill="none" className="text-green-500" /> &nbsp; Pick
              Up Location
            </label>
            <select
              className="flex h-10 bg-background text-base  w-full px-3 py-2 border border-gray-300 rounded-md"
              name="pickup_location"
              id="pickupLocation"
              required>
              <option value="" hidden>
                Choose a Pickup Location
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
            <label htmlFor="dropLocation" className="inline-flex font-bold">
              <MapPinIcon fill="none" className="text-green-500" /> &nbsp;
              Drop-Off Location
            </label>
            <select
              className="flex h-10 bg-background text-base  w-full px-3 py-2 border border-gray-300 rounded-md"
              name="dropLocation"
              id="dropoff_location"
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
              <CalendarDaysIcon fill="none" className="text-green-500" /> &nbsp;
              Pickup Date and Time
            </label>
            <div className="flex items-center gap-0">
              <input
                type="date"
                id="pickupDate"
                name="pickup_date"
                required
                defaultValue={formattedDate}
                className="flex h-10 bg-white text-base  w-1/2 px-1 py-2 border-y border-l border-gray-300 rounded-l-md outline-none"
              />
              <input
                type="time"
                name="pickupTime"
                required
                defaultValue="08:00"
                className="h-10 w-1/2 bg-white text-base px-1 py-2 border-gray-300 rounded-r-md outline-none border"
              />
            </div>
          </div>
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
                required
                defaultValue={formattedDate}
                className="flex h-10 bg-white text-base  w-1/2 px-1 py-2 border-y border-l border-gray-300 rounded-l-md outline-none "
              />
              <input
                type="time"
                name="dropoff_time"
                required
                defaultValue="18:00"
                className="h-10 w-1/2  bg-white text-base px-1 py-2 border-gray-300 rounded-r-md outline-none border"
              />
            </div>
          </div>
          <div className="py-2 md:py-0 md:flex md:items-end md:justify-end md:pb-2 ">
            <button className="border shadow-xl px-3 h-10 py-2 w-full text-white bg-green-500 hover:bg-green-600 text-xl rounded-md flex items-center justify-center ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
