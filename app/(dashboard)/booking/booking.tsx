"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { car } from "@/lib/fetchCars";
import { toast } from "sonner";
import Image from "next/image";
import {
  BadgeDollarSign,
  BookUserIcon,
  CalendarCheck2Icon,
  CalendarDaysIcon,
  Car,
  CircleUser,
  InfoIcon,
  MailOpenIcon,
  MapPinIcon,
  Phone,
} from "lucide-react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import CarModal from "@/components/ui/carModal";
import Script from "next/script";
import secureLocalStorage from "react-secure-storage";

type Props = {
  Cars: car[] | null;
  User: User | null;
};
type FormData = {
  model: string;
  pickup_location: string;
  dropLocation: string;
  pickup_date: string;
  pickupTime: string;
  dropoff_date: string;
  dropoff_time: string;
};
declare const confetti: any;
export default function BookingPage({ Cars, User }: Props) {
  const defaultData = secureLocalStorage.getItem(
    "react_booking_form_data"
  ) as FormData | null;

  const [selectedCar, setSelectedCar] = useState<car | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const model_name = searchParams.get("car_model");
  const price =
    (searchParams.get("price") as string) ?? selectedCar?.price_per_day;
  const [cost, setCost] = useState(price ? parseInt(price) : 0);

  const today = new Date();
  const formattedDate = today.toISOString().substring(0, 10);
  useEffect(() => {
    async function redirectUser() {
      if (!model_name) {
        toast.error("Kindly select a car first", {
          position: "top-center",
        });
        setTimeout(() => {
          router.push("/cars"), 1000;
        });
      } else if (Cars) {
        const filteredCars = Cars.filter(
          (car) =>
            car.model_name.toLocaleLowerCase() ===
            model_name?.toLocaleLowerCase()
        );
        setSelectedCar(filteredCars[0] || null);
      }
    }
    redirectUser();
  }, [model_name, Cars, User, selectedCar, router]);

  //   function to handle bookings
  function handleBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!User) {
      toast.error("Login required to perform this action");
      router.push(
        `/login?post_login_redirect_url=/booking?car_model=${selectedCar?.model_name}&price=${selectedCar?.price_per_day}`
      );
    } else {
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

      if (new Date(pickupDate) < new Date(today)) {
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
      } else {
        confetti({
          particleCount: 10000,
          spread: 100,
          origin: { y: 0.3 },
        });
        toast.success("Check your email address to confirm your booking", {
          position: "top-center",
        });
        //send email to the user
        secureLocalStorage.removeItem("react_booking_form_data");
      }

      form.reset();
      setTimeout(() => {
        router.push("/me/orders?new_order=true");
      }, 2000);
    }
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

      if (dropoffDateObj < pickupDateObj) {
        toast.error(
          "Drop-off date cannot be before pickup date. Please choose a valid date range.",
          {
            position: "top-center",
          }
        );
        return;
      }

      const timeDiff = dropoffDateObj.getTime() - pickupDateObj.getTime();
      days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    } catch (error) {
      console.error("Error parsing dates:", error);
      return;
    }

    setCost(days * parseInt(price));
  }
  //function to show car details
  const showModal = async (id: number) => {
    const modal = document.getElementById(
      `my_modal_${id}`
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    } else {
      console.log("modal not found");
    }
  };

  return (
    <section className="bg-[url('/hero.jpg')] bg-cover bg-no-repeat bg-right py-5 h-full w-full flex flex-col items-center justify-center p-4 relative ">
      <Script
        async
        defer
        src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <div className="absolute top-0 xsm:hidden bg-amber-100 border border-amber-400 w-full ">
        <p className=" flex flex-wrap gap-1 items-center justify-center  text-amber-600 font-bold">
          <InfoIcon />
          <span>
            Before completing booking, kindly read our{" "}
            <a href="/terms" className="hover:underline">
              rental terms and conditions
            </a>
          </span>
        </p>
      </div>
      <h1 className=" text-center text-white md:text-start my-4 text-2xl md:text-4xl font-extrabold">
        Easy Booking
      </h1>
      <div className=" border bg-white  xsm:w-full  rounded-md shadow-md w-2/3">
        <div className="bg-green-500 h-fit z-50 text-white  w-full">
          <h1 className="text-2xl text-center font-extrabold mb-1">
            Complete Reservation
          </h1>
          <div className="w-full px-2 bg-green-100 text-green-600 py-2">
            <div className="inline-flex gap-1 text-xl font-bold w-full ">
              <InfoIcon className="text-green-500" />
              <span>Upon completing this booking form, you will receive:</span>
            </div>
            <p>
              Your car rental voucher to be produced on arrival at the rental
              desk and a toll-free customer support number.
            </p>
          </div>
        </div>
        <div className="px-4 py-4">
          <div className="py-2">
            {selectedCar ? (
              <div className="md:flex h-fit md:h-20  text-base  w-full px-3 py-2 border border-gray-300 rounded-md items-center gap-2 font-bold">
                <Image
                  src={selectedCar?.image || ""}
                  width={120}
                  height={120}
                  alt="car_image"
                />
                <span>{selectedCar?.model_name} &#8212; </span>
                <span>${selectedCar?.price_per_day} Per Day</span>
                <button
                  className="py-1 px-2 rounded-md bg-green-500 border text-white"
                  onClick={() => showModal(selectedCar?.id)}>
                  View More Details
                </button>
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

          <form onSubmit={handleBooking}>
            <section className="flex flex-col gap-2 md:grid md:grid-cols-2  md:gap-4">
              {/* div for two cards */}
              {/* first card */}
              <div>
                <label className="inline-flex font-bold" htmlFor="model">
                  <Car fill="none" className="text-green-500" />
                  <span className="text-xl"> &nbsp; Car Details *</span>
                </label>
                <div className="py-2">
                  <label
                    htmlFor="pickupLocation"
                    className="inline-flex font-bold">
                    <MapPinIcon fill="none" className="text-green-500" /> &nbsp;
                    Pick Up Location
                  </label>
                  <select
                    className="flex h-10 bg-background text-base  w-full px-3 py-2 border border-gray-300 rounded-md "
                    name="pickup_location"
                    id="pickupLocation"
                    defaultValue={defaultData?.pickup_location}
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
                  <label
                    htmlFor="dropLocation"
                    className="inline-flex font-bold">
                    <MapPinIcon fill="none" className="text-green-500" /> &nbsp;
                    Drop-Off Location
                  </label>
                  <select
                    className="flex h-10 bg-background text-base  w-full px-3 py-2 border border-gray-300 rounded-md"
                    name="dropLocation"
                    id="dropoff_location"
                    defaultValue={defaultData?.dropLocation}
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
                      defaultValue={defaultData?.pickup_date ?? formattedDate}
                      onChange={(e) => {
                        const dropOffDateInput = document.getElementById(
                          "dropDate"
                        ) as HTMLInputElement | null;
                        if (dropOffDateInput) {
                          dropOffDateInput.min = e.target.value;
                          if (
                            new Date(dropOffDateInput.value) <
                            new Date(e.target.value)
                          ) {
                            dropOffDateInput.value = e.target.value; // Reset if invalid
                          }
                          calculateTotalCost();
                        }
                      }}
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
                    <CalendarCheck2Icon
                      fill="none"
                      className="text-green-500"
                    />{" "}
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
                      defaultValue={defaultData?.dropoff_date ?? formattedDate}
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
                    <BookUserIcon fill="none" className="text-green-500" />{" "}
                    &nbsp; Your Name
                  </label>
                  <div className="flex items-center gap-0">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      readOnly
                      required
                      defaultValue={User?.user_metadata?.username ?? "john doe"}
                      className="flex h-10 bg-white text-base  w-full px-1 py-2 border border-gray-300 rounded-md outline-none "
                    />
                  </div>

                  <div className="py-2 ">
                    <label
                      htmlFor="email"
                      className="inline-flex font-bold py-1">
                      <MailOpenIcon fill="none" className="text-green-500" />{" "}
                      &nbsp; Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      readOnly
                      required
                      defaultValue={User?.email ?? "you@example.com"}
                      className="flex h-10 bg-white text-base  w-full px-1 py-2  border border-gray-300 rounded-md outline-none "
                    />
                  </div>
                  <div className="py-2">
                    <label htmlFor="phone" className="inline-flex font-bold">
                      <Phone fill="none" className="text-green-500" /> &nbsp;
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      minLength={10}
                      maxLength={12}
                      title="valid phone number must have 10 digits."
                      pattern="0?[0-9]{9}"
                      inputMode="numeric"
                      required
                      placeholder="**********"
                      className="flex h-10 bg-white text-base  w-full px-1 py-2  border border-gray-300 rounded-md outline-none "
                    />
                  </div>
                  <div className="py-2">
                    <label htmlFor="cost" className="inline-flex font-bold ">
                      <BadgeDollarSign fill="none" className="text-green-500" />{" "}
                      &nbsp; Total Cost
                    </label>
                    <input
                      type="text"
                      name="cost"
                      id="cost"
                      readOnly
                      defaultValue={cost ? `$${cost}` : "$--"}
                      className="flex h-10 bg-white text-base  w-full px-1 py-2 border border-gray-300 rounded-md outline-none "
                    />
                  </div>
                </div>
              </div>
            </section>
            <div className="py-2 md:py-0 flex md:items-end md:justify-end md:pb-2 gap-2">
              <button
                className="border  px-3 h-10 py-2 w-full  border-green-500 hover:bg-red-100 hover:border-red-300 text-xl rounded-md flex items-center justify-center "
                type="reset">
                Clear
              </button>
              <button
                className="border  px-3 h-10 py-2 w-full text-white bg-green-500 hover:bg-green-600 text-xl rounded-md flex items-center justify-center "
                type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <CarModal Car={selectedCar} />
    </section>
  );
}
