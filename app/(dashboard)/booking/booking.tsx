"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchCar, Car } from "@/lib/actions/fetchCars";
import { toast } from "sonner";
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
  MapPinIcon,
  Phone,
} from "lucide-react";
import Link from "next/link";
import CarModal from "@/components/alerts/carModal";
import Script from "next/script";
import secureLocalStorage from "react-secure-storage";
import { createBooking, Booking } from "@/lib/actions/booking";

type Props = {
  User: any | null;
};
declare const confetti: any;
const today = new Date();
const formattedDate = today.toISOString().substring(0, 10);
export default function BookingPage({ User }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get("id");
  const defaultData = secureLocalStorage.getItem("react_booking_form_data") as
    | (Booking & { pickupTime?: string })
    | null;
  const [selectedCar, setSelectedCar] = useState<any | Car | null>(null);
  let price = (searchParams.get("price") as string) ?? selectedCar?.pricePerDay;
  const [formData, setFormData] = useState<Booking & { pickupTime?: string }>({
    userId: User?.id || 0,
    carId: selectedCar?.id || 0,
    startDate: defaultData?.startDate || formattedDate,
    endDate: defaultData?.endDate || formattedDate,
    pickupLocation: defaultData?.pickupLocation || selectedCar?.location || "",
    dropLocation: defaultData?.dropLocation || "",
    phoneNumber: User?.phone,
    totalPrice: parseInt(price) || 0,
    status: "scheduled",
    pickupTime: defaultData?.pickupTime || "08:00",
  });

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
        } else if (data.isRented) {
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

  // effect to update the price dynamically
  useEffect(() => {
    if (defaultData?.startDate && defaultData?.endDate && selectedCar) {
      calculateTotalCost(defaultData.startDate, defaultData.endDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultData, selectedCar]);
  // function to handle input changes
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "startDate" || name === "endDate") {
      const updatedStartDate =
        name === "startDate" ? value : formData.startDate;
      const updatedEndDate = name === "endDate" ? value : formData.endDate;
      calculateTotalCost(updatedStartDate, updatedEndDate);
    }
  }

  //   function to handle bookings
  async function handleBooking(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedCar) {
      toast.error("Kindly select a car first");
      return;
    }
    const startDateTime = new Date(
      `${formData.startDate}T${formData.pickupTime}:00`
    ).toISOString();
    const endDateTime = new Date(
      `${formData.endDate}T${formData.pickupTime}:00`
    ).toISOString();
    const bookingData = {
      carId: selectedCar.id,
      userId: User.id,
      phoneNumber: parseInt(User.phone, 10),
      pickupLocation: selectedCar.location,
      dropLocation: formData.dropLocation,
      startDate: startDateTime,
      endDate: endDateTime,
      status: "scheduled",
      totalPrice: formData.totalPrice,
    };
    try {
      const result = await createBooking(bookingData);
      confetti({
        particleCount: 1000,
        spread: 100,
        origin: { y: 0.3 },
      });
      toast.success("Check your email address to confirm your booking", {
        position: "top-center",
      });
      secureLocalStorage.removeItem("react_booking_form_data");
      setTimeout(() => {
        router.push("/me/orders?new_order=true");
      }, 2000);
    } catch (error) {
      console.error("Failed to create booking:", error);
      toast.error("Failed to create booking. Please try again.");
    }
  }

  function calculateTotalCost(startDate: string, endDate: string) {
    if (!selectedCar) return;
    try {
      const pickupDateObj = new Date(startDate);
      const dropoffDateObj = new Date(endDate);
      // Check if endDate is before startDate
      if (dropoffDateObj < pickupDateObj) {
        setFormData((prev) => ({
          ...prev,
          totalPrice: parseInt(price),
        }));
        return;
      }
      const timeDiff = dropoffDateObj.getTime() - pickupDateObj.getTime();
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) || 1;

      const totalCost = days * parseInt(price);
      setFormData((prev) => ({
        ...prev,
        totalPrice: totalCost,
      }));
    } catch (error) {
      console.error("Error parsing dates:", error);
    }
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
    <section className=" bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70  py-5 h-full w-full flex flex-col items-center justify-center p-4 relative ">
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
      <h1 className="text-center md:text-start my-4 text-2xl md:text-4xl font-extrabold">
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
                <span>{selectedCar?.modelName} &#8212; </span>
                <span>${selectedCar?.pricePerDay} Per Day</span>
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
                  <CarFront fill="none" className="text-green-500" />
                  <span className="text-xl"> &nbsp; Car Details *</span>
                </label>
                <div className="py-2">
                  <label
                    htmlFor="pickupLocation"
                    className="inline-flex font-bold">
                    <MapPinIcon fill="none" className="text-green-500" /> &nbsp;
                    Pick-Up Location
                  </label>
                  {/* a car can only be picked in its location */}
                  <select
                    className="flex h-10 bg-white text-base w-full px-3 py-2 border border-gray-300 rounded-md capitalize"
                    name="pickupLocation"
                    id="pickupLocation"
                    value={formData.pickupLocation} // Bind to formData
                    aria-readonly
                    title="Vehicles can only be picked in their location. You can request for a delivery at an additional fee."
                    disabled>
                    <option value="" hidden>
                      {selectedCar?.location}
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
                    className="flex h-10 bg-white text-base w-full px-3 py-2 border border-gray-300 rounded-md"
                    name="dropLocation"
                    id="dropoffLocation"
                    value={formData.dropLocation} // Bind to formData
                    onChange={handleInputChange}
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
                      name="startDate"
                      value={formData.startDate}
                      min={new Date().toISOString().split("T")[0]}
                      required
                      disabled={!selectedCar}
                      onChange={handleInputChange}
                      className="flex h-10 bg-white text-base w-1/2 px-1 py-2 border"
                    />
                    <input
                      type="time"
                      name="pickupTime"
                      disabled={!selectedCar}
                      min="08:00"
                      max="18:00"
                      required
                      value={formData.pickupTime}
                      onChange={handleInputChange}
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
                      id="dropDate"
                      name="endDate"
                      value={formData.endDate}
                      min={formData.startDate}
                      required
                      disabled={!selectedCar}
                      onChange={handleInputChange}
                      className="flex h-10 bg-white text-base w-1/2 px-1 py-2 border"
                    />
                    <input
                      type="time"
                      name="dropoffTime"
                      disabled
                      aria-readonly
                      value={formData.pickupTime}
                      title="Booking runs for 24hrs and cars must be returned at the same time as they were picked up"
                      className="h-10 w-1/2 bg-white text-base px-1 py-2 border-gray-300 rounded-r-md outline-none border"
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
                      defaultValue={User.username}
                      className="flex h-10 bg-white text-base  w-full px-1 py-2 border border-gray-300 rounded-md outline-none capitalize"
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
                      name="phoneNumber"
                      id="phone"
                      minLength={10}
                      maxLength={12}
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
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
                      &nbsp; Total Price
                    </label>
                    <input
                      type="text"
                      name="totalPrice"
                      id="cost"
                      readOnly
                      value={price ? `$${formData.totalPrice}` : "$--"}
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
                Rent Car
              </button>
            </div>
          </form>
        </div>
      </div>
      <CarModal Car={selectedCar} />
    </section>
  );
}
