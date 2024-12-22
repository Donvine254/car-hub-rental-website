"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  BadgeDollarSign,
  BookUserIcon,
  CalendarCheck2Icon,
  CalendarDaysIcon,
  CarFront,
  CircleUser,
  InfoIcon,
  MailOpenIcon,
  MapPin,
  MapPinIcon,
  Phone,
} from "lucide-react";
import { fetchCar, Car } from "@/lib/actions/car-actions/fetchCars";
import { useSearchParams, useRouter } from "next/navigation";
import { PhoneInput } from "@/components/ui/phoneinput";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { isCarAvailable, toE164 } from "@/lib/helpers";
import Link from "next/link";
import CarModal from "@/components/alerts/carModal";
type Props = {
  User: any | null;
};

export default function BookingComponent({ User }: Props) {
  const [selectedCar, setSelectedCar] = useState<any | Car | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get("id");
  let price = (searchParams.get("price") as string) ?? selectedCar?.pricePerDay;

  useEffect(() => {
    async function redirectUser() {
      if (!carId) {
        toast.error("Kindly select a car first", {
          position: "top-center",
        });
        setTimeout(() => {
          router.push("/cars");
        }, 1000);
        return; // Exit early
      }
      try {
        const data = await fetchCar(carId);
        if (!data) {
          toast.error("Car not found. Redirecting...", {
            position: "top-center",
          });
          setTimeout(() => {
            router.push("/cars");
          }, 1000);
          return; // Exit early
        } else if (isCarAvailable(data?.isRented, data?.rentedUntill)) {
          toast.info("This car is not available for booking", {
            position: "top-center",
          });
          setTimeout(() => {
            router.push("/cars");
          }, 2000);
          return;
        }

        setSelectedCar(data);
      } catch (error) {
        console.error("Error fetching car:", error);
        toast.error("Something went wrong. Redirecting...", {
          position: "top-center",
        });
        setTimeout(() => {
          router.push("/cars");
        }, 1000);
      }
    }

    redirectUser();
  }, [carId, router]);

  //function to show modal
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
    <section className="bg-gradient-to-r from-green-50 via-slate-50 to-green-50">
      <div className="bg-[url('/subheader.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Complete your Booking
          </h1>
        </div>
      </div>
      {/* Info Alert */}
      <div className="w-full px-2 mb-8 bg-green-100 text-green-600 py-2">
        <div className="inline-flex gap-1 text-base md:text-xl w-full">
          <InfoIcon className="text-green-500 font-bold" aria-hidden="true" />
          <div>
            <span className="font-bold">
              Upon completing this booking form, you will receive:
            </span>
            <div className="text-sm md:text-base font-normal">
              Your car rental voucher to be produced on arrival at the rental
              desk and a toll-free customer support number.
            </div>
          </div>
        </div>
      </div>
      {/* add form */}
      <div className="container xsm:p-2">
        <form className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white rounded-md border px-2">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Details */}
            <div className="bg-white p-6 rounded-lg  space-y-4">
              <h2 className="text-xl font-semibold">Booking Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="pickupLocation"
                    className="inline-flex gap-1 font-bold text-gray-700">
                    Pickup Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="pickupLocation"
                    name="pickupLocation"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 capitalize focus:ring-green-500 focus:border-green-500"
                    disabled
                    aria-describedby="pickupLocationHelp">
                    <option>{selectedCar?.location}</option>
                  </select>
                  <p
                    id="pickupLocationHelp"
                    className="mt-1 text-sm text-gray-500">
                    Vehicles can only be picked up at its current location
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="dropLocation"
                    className="inline-flex gap1 font-bold text-gray-700">
                    Drop-off Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="dropLocation"
                    name="dropLocation"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required>
                    <option value="" hidden>
                      Choose a Drop-Off Location
                    </option>
                    <option value="nairobi">Nairobi</option>
                    <option value="kisumu">Kisumu</option>
                    <option value="mombasa">Mombasa</option>
                    <option value="thika">Thika</option>
                    <option value="eldoret">Eldoret</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="pickupDate"
                    className="inline-flex gap-1 font-bold text-gray-700">
                    Pickup Date & Time <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-0">
                    <input
                      type="date"
                      id="pickupDate"
                      name="startDate"
                      min={new Date().toISOString().split("T")[0]}
                      required
                      disabled={!selectedCar}
                      className="flex rounded-l-md  bg-white text-base w-1/2 border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <input
                      type="time"
                      name="pickupTime"
                      disabled={!selectedCar}
                      min="08:00"
                      max="18:00"
                      required
                      className=" w-1/2 bg-white text-base border-gray-300 rounded-r-md outline-none border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="dropDate"
                    className="inline-flex gap-1 font-bold text-gray-700">
                    Drop-off Date & Time <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-0">
                    <input
                      type="date"
                      id="dropDate"
                      name="startDate"
                      min={new Date().toISOString().split("T")[0]}
                      required
                      disabled={!selectedCar}
                      className="flex rounded-l-md  bg-white text-base w-1/2 border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <input
                      type="time"
                      name="dropTime"
                      disabled={!selectedCar}
                      min="08:00"
                      max="18:00"
                      required
                      className=" w-1/2 bg-white text-base border-gray-300 rounded-r-md outline-none border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg  space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <label
                    htmlFor="fullName"
                    className="inline-flex gap-1 font-bold text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="fullname"
                    value={User.username}
                    readOnly
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="inline-flex gap-1 font-bold text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    value={toE164(User?.phone)}
                    defaultCountry="KE"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="email"
                    className="inline-flex gap-1 font-bold text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email address"
                    value={User.email}
                    readOnly
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4 space-y-6">
              {/* Order Summary */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex gap-4 border shadow rounded-lg">
                  {selectedCar ? (
                    <>
                      <Image
                        src={selectedCar?.image}
                        alt={selectedCar?.modelName}
                        width={160}
                        height={90}
                        className="object-cover rounded-md cursor-pointer"
                        onClick={() => showModal(selectedCar?.id)}
                      />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {selectedCar?.modelName}
                        </h3>
                        <p className="text-gray-600">
                          ${selectedCar?.pricePerDay} per day
                        </p>
                        <div className="flex items-center gap-1 text-gray-600 mt-2">
                          <MapPin size={16} aria-hidden="true" />
                          <span className="capitalize">
                            {selectedCar?.location}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      className=" bg-green-500 rounded-md border px-5 py-1 text-white my-6 mx-auto"
                      href="/cars">
                      Select A Vehicle
                    </Link>
                  )}
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Price Details */}
              <div>
                <div className="flex gap-2 mb-6">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="24"
                        width="24"
                        className="h-6 w-6">
                        <path d="M21 5H3a1 1 0 00-1 1v4h.893c.996 0 1.92.681 2.08 1.664A2.001 2.001 0 013 14H2v4a1 1 0 001 1h18a1 1 0 001-1v-4h-1a2.001 2.001 0 01-1.973-2.336c.16-.983 1.084-1.664 2.08-1.664H22V6a1 1 0 00-1-1zM9 9a1 1 0 110 2 1 1 0 110-2zm-.8 6.4l6-8 1.6 1.2-6 8-1.6-1.2zM15 15a1 1 0 110-2 1 1 0 110 2z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Discount code"
                      className="w-full pl-10 rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Apply
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>$450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-$45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span>$40.50</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3 font-semibold">
                    <span>Total</span>
                    <span>$445.50</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className="rounded border-gray-300 focus:ring-2 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      rental terms and conditions
                    </a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-md mt-6 hover:bg-green-700 font-medium focus:outline-none h-10 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center">
                Confirm Booking
              </button>
            </div>
          </div>
        </form>
      </div>
      <CarModal Car={selectedCar} />
    </section>
  );
}
