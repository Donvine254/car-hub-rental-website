"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { car } from "@/lib/fetchCars";
import { toast } from "sonner";
import Image from "next/image";
import {
  CalendarCheck2Icon,
  CalendarDaysIcon,
  Car,
  CircleUser,
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
  const [cost, setCost] = useState(0);
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
        setCost(selectedCar?.price_per_day || 0);
      }
    }
    redirectUser();
  }, [model_name, Cars, selectedCar?.price_per_day]);
  //   function to handle bookings
  function handleBooking(e: React.FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const pickupDateInput = form.pickupDate as HTMLInputElement;
    const dropoffDateInput = form.dropDate as HTMLInputElement;
    const today = new Date().toISOString().split("T")[0];
    const pickupDate = pickupDateInput.value;
    const dropoffDate = dropoffDateInput.value;
    if (!selectedCar) {
      toast.error("kindly select a car first");
      return false;
    }

    if (new Date(pickupDate) <= new Date(today)) {
      toast.error(
        "Pickup date cannot be in the past. Please choose today or a future date.",
        {
          position: "top-center",
        }
      );
      return false;
    } else if (new Date(dropoffDate) < new Date(pickupDate)) {
      toast.error(
        "Drop-off date cannot be before pickup date. Please choose a valid date range.",
        {
          position: "top-center",
        }
      );
      return false;
    } else
      toast.success("Check your email address to confirm your booking", {
        position: "top-center",
      });

    form.reset();
    setTimeout(() => {
      router.push("/me/profile");
    }, 1000);
  }

  function calculateTotalCost() {
    if (!selectedCar) {
      return null;
    }
    const pickupDateInput = document.getElementById(
      "pickupDate"
    ) as HTMLInputElement;
    const dropoffDateInput = document.getElementById(
      "dropDate"
    ) as HTMLInputElement;

    // Get selected dates
    const pickupDate = pickupDateInput.value;
    const dropoffDate = dropoffDateInput.value;
    // Calculate difference in days (handle potential errors)

    let days = 1;
    try {
      const pickupDateObj = new Date(pickupDate);
      const dropoffDateObj = new Date(dropoffDate);

      if (dropoffDateObj <= pickupDateObj) {
        toast.error(
          "Drop-off date cannot be before pickup date. Please choose a valid date range."
        );
        return;
      }

      const timeDiff = dropoffDateObj.getTime() - pickupDateObj.getTime();
      days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    } catch (error) {
      console.error("Error parsing dates:", error);
      return;
    }

    const totalCost = days * selectedCar?.price_per_day;

    setCost(totalCost);
  }

  return (
    <section className="bg-[url('/hero.jpg')] bg-cover bg-no-repeat bg-right py-5 h-full w-full flex flex-col items-center justify-center p-4">
      <h1 className=" text-center text-white md:text-start my-2 text-2xl md:text-4xl font-extrabold">
        Easy Booking
      </h1>
      <div className="px-4 py-4 border shadow bg-white xsm:w-full w-2/3 ">
        <div className="py-2">
          {selectedCar ? (
            <div className="md:flex xsm:h-fit h-20  text-base  w-full px-3 py-2 border border-gray-300 rounded-md items-center gap-2 font-bold">
              <Image
                src={selectedCar?.image || ""}
                width={120}
                height={120}
                alt="car_image"
              />
              <span>{selectedCar?.model_name} &#8212; </span>
              <span>${selectedCar?.price_per_day} Per Day</span>
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
        <form
          className="flex flex-col gap-2 md:grid md:grid-cols-2  md:gap-4"
          onSubmit={handleBooking}>
          {/* div for two cards */}
          {/* first card */}
          <div>
            <label className="inline-flex font-bold" htmlFor="model">
              <Car fill="none" className="text-green-500" />
              <span className="text-xl"> &nbsp; Car Details *</span>
            </label>
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
                  min={new Date().toISOString().split("T")[0]}
                  required
                  defaultValue={formattedDate}
                  onChange={calculateTotalCost}
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

            <div className="py-2">
              <label htmlFor="dropDate" className="inline-flex font-bold">
                <CalendarCheck2Icon fill="none" className="text-green-500" />{" "}
                &nbsp; Drop-Off Date and Time
              </label>
              <div className="flex items-center gap-0">
                <input
                  type="date"
                  name="dropDate"
                  id="dropDate"
                  disabled={!selectedCar}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={calculateTotalCost}
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
          </div>
          {/* second card */}
          <div>
            <label className="inline-flex font-bold" htmlFor="model">
              <CircleUser fill="none" className="text-green-500" />
              <span className="text-xl"> &nbsp; Contact Details *</span>
            </label>
            <div className="">
              <label htmlFor="name" className="inline-flex font-bold py-2">
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

              <div className="py-2 mt-1">
                <label htmlFor="email" className="inline-flex font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  defaultValue={User?.email ?? "you@example.com"}
                  className="flex h-10 bg-white text-base  w-full px-1 py-2 mt-2 border border-gray-300 rounded-md outline-none "
                />
              </div>
              <div className="py-2">
                <label htmlFor="phone" className="inline-flex font-bold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  placeholder="+254********"
                  className="flex h-10 bg-white text-base  w-full px-1 py-2 mt-2 border border-gray-300 rounded-md outline-none "
                />
              </div>
              <div className="py-2">
                <label htmlFor="cost" className="inline-flex font-bold py-1">
                  Total Cost
                </label>
                <input
                  type="text"
                  name="cost"
                  id="cost"
                  readOnly
                  defaultValue={"$" + cost ?? "$--"}
                  className="flex h-10 bg-white text-base  w-full px-1 py-2 border border-gray-300 rounded-md outline-none "
                />
              </div>
            </div>
          </div>
        </form>
        <div className="py-2 md:py-0 md:flex md:items-end md:justify-end md:pb-2 ">
          <button className="border shadow-xl px-3 h-10 py-2 w-full text-white bg-green-500 hover:bg-green-600 text-xl rounded-md flex items-center justify-center ">
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}
