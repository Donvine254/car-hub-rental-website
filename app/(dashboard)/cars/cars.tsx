"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { CarFrontIcon, CarSeat, FuelPumpIcon, GearboxIcon } from "@/assets";
import {
  FilterIcon,
  InfoIcon,
  MoveRightIcon,
  RefreshCwIcon,
  Search,
} from "lucide-react";
import ScrollToTopButton from "@/components/ui/scrollButton";
import CarModal from "@/components/ui/carModal";
import FilterModal from "@/components/ui/Filter";
import Script from "next/script";
import { handleGuessCar, showModal } from "@/lib/utils";
import type { car } from "@/lib/fetchCars";
import { getSession } from "@/lib/loginstatus";
import CustomHeartIcon from "@/components/ui/HeartIcon";
type Props = {
  Cars: car[];
};

export default function Carspage({ Cars }: Props) {
  const [CarsToRender, setCarsToRender] = useState<car[]>(Cars);
  const [displayCount, setDisplayCount] = useState(10);
  // state for the game car
  const [carImage, setCarImage] = useState(
    "https://res.cloudinary.com/dipkbpinx/image/upload/v1706619929/cars/q6pgnwhxjkux22illdpm.png"
  );
  const [attempts, setAttempts] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const model = searchParams.get("model");
  const brand = searchParams.get("make");
  const price = searchParams.get("price");
  const seats = searchParams.get("seats");
  //use effect to handle when there is a model in search params
  useEffect(() => {
    let filteredCars = Cars;

    // Filter by model
    if (model) {
      filteredCars = filteredCars.filter((car) =>
        car.body_type.toLowerCase().includes(model.toLowerCase())
      );
    }

    // Filter by brand (make)
    if (brand) {
      filteredCars = filteredCars.filter((car) =>
        car.model_name.toLowerCase().includes(brand.toLowerCase())
      );
    }

    // Filter by price
    if (price) {
      filteredCars = filteredCars.filter(
        (car) => car.price_per_day <= parseInt(price)
      );
    }

    // Filter by seats
    if (seats) {
      if (seats === ">6") {
        filteredCars = filteredCars.filter((car) => car.seats >= 6);
      } else {
        filteredCars = filteredCars.filter(
          (car) => car.seats === parseInt(seats)
        );
      }
    }

    setCarsToRender(filteredCars);
  }, [model, brand, price, seats, Cars]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    const filteredCars = Cars.filter((car) =>
      car.model_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCarsToRender(filteredCars);
    setDisplayCount(10);
  };

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => {
      const newCount = prevCount + 10;
      return Math.min(newCount, CarsToRender.length);
    });
  };

  

  const showFilterModal = async () => {
    const filterModal = document.getElementById(
      `filter_modal`
    ) as HTMLDialogElement | null;
    if (filterModal) {
      filterModal.showModal();
    } else {
      console.log("modal not found");
    }
  };

  async function handleBooking(car: car) {
    const session = await getSession();
    if (!session) {
      toast.error("Login required to perform this action! ", {
        position: "top-center",
      });
      setTimeout(() => {
        router.push(`/login?post_login_redirect_url=/booking?car_model=${car.model_name}`);
      }, 1000);
    } else {
      router.push(`/booking?car_model=${car.model_name}&price=${car.price_per_day}`);
    }
  }

  return (
    <section className="bg-[#f8f9fa] relative">
      <Script
        async
        defer
        src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <div className="bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 md:py-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Car Collection
          </h1>
        </div>
      </div>
      <div className="min-h-screen mx-2  md:w-3/4 md:mx-auto p-2 ">
        <form
          className="flex items-center justify-center gap-2 relative"
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <input
            type="search"
            placeholder="Search by model name"
            onInput={handleSearch}
            maxLength={20}
            className="rounded-md h-10 px-3 py-1 pl-8  flex-1 outline-none border focus:border-green-500 border-gray-300 shadow"
          />
          <Search width={20} height={20} className="absolute left-2" />
          <button
            className="px-3  border border-green-500 hover:bg-green-600 hover:text-white h-10 rounded-md"
            title="filter"
            onClick={showFilterModal}>
            {" "}
            <FilterIcon width={20} height={20} />
          </button>
        </form>

        {CarsToRender && CarsToRender.length > 0 ? (
          <section className=" grid gap-4 md:grid-cols-2 lg:grid-cols-3 py-2 ">
            {CarsToRender.slice(0, displayCount).map((car) => (
              <div
                key={car.id}
                className="w-fit border shadow bg-white rounded-md">
                <div className="p-2">
                  <Image
                    alt={car.model_name}
                    src={car.image}
                    width={300}
                    height={300}
                    placeholder="blur"
                    blurDataURL="/vehicle-placeholder.png"
                    className="rounded-md hover:scale-y-105 cursor-pointer"
                    style={{ width: "auto", height: "auto" }}
                    onClick={() => showModal(car.id)}
                    priority
                  />

                  <div className="flex items-center justify-between gap-4 pt-2 px-2">
                    <h1 className="font-semibold text-xl text-gray-600 ">
                      {car.model_name}
                    </h1>
                    <p className="flex items-center">
                      <CustomHeartIcon />
                      {car.rating}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 px-4 py-1 my-1 group h-12">
                  <div className="flex flex-col items-center gap-0.5 group-hover:hidden">
                    <CarFrontIcon />
                    <span className="capitalize">{car.body_type}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 group-hover:hidden">
                    <GearboxIcon />

                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 group-hover:hidden">
                    <CarSeat />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 group-hover:hidden">
                    <FuelPumpIcon />
                    <span>{car.fuel_consumption}Km/L</span>
                  </div>
                  <button
                    className="hidden group-hover:flex items-center justify-between  w-full h-full bg-green-500 text-white group  rounded-md p-2 "
                    onClick={() => showModal(car.id)}>
                    <InfoIcon />
                    <span className="font-medium flex item-center gap-0.5">
                      View More
                    </span>
                    <MoveRightIcon className="bg-green-300 self-end p-1 rounded-md  " />
                  </button>
                </div>
                <hr className="border border-gay-200" />
                {/* div for actions */}
                <div className="px-4 pt-1 pb-2 flex items-center justify-between  gap-4">
                  <p className="text-sm">
                    Daily Rate From <br />
                    <span className="text-2xl font-semibold">
                      ${car.price_per_day}
                    </span>
                  </p>
                  <button
                    className="px-2 py-1 border hover:shadow-2xl bg-green-500 text-white hover:bg-green-600 rounded-md flex-1"
                    onClick={() => handleBooking(car)}>
                    Book Now
                  </button>
                </div>
                <CarModal Car={car} />
              </div>
            ))}
          </section>
        ) : (
          <div className="p-4">
            <h1 className="text-gray-600 text-center text-[18px] my-2 ">
              😢 No Car Matched Your Search
            </h1>
            <p className="md:text-center my-2 leading-loose">
              Nothing to worry about, play the game below and receive 10%
              discount on your car booking!
            </p>

            <div className="xsm:w-full md:w-fit  border shadow bg-[#f8f9fa] rounded-md">
              <div className="p-2">
                <Image
                  alt="model car"
                  src={carImage}
                  width={300}
                  height={300}
                  className="rounded-md  cursor-pointer"
                  style={{ width: "auto", height: "auto" }}
                  priority
                />
                <p>Which car type is this?</p>
                <form onSubmit={(e) => handleGuessCar(e, setCarImage)}>
                  <div className="grid grid-cols-2 gap-2 my-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="carType"
                        value="toyota"
                        className="mr-2"
                      />
                      TOYOTA
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="carType"
                        value="lexus"
                        className="mr-2"
                      />
                      LEXUS
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="carType"
                        value="range rover"
                        className="mr-2"
                      />
                      Range Rover
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="carType"
                        value="kia"
                        className="mr-2"
                      />
                      KIA
                    </label>
                  </div>
                  <button
                    type="submit"
                    onClick={() => setAttempts((prev) => prev + 1)}
                    disabled={attempts > 3}
                    title={
                      attempts > 3 ? "Maximum attempts reached" : "Guess Car"
                    }
                    className=" w-full bg-green-500 disabled:bg-gray-200 disabled:text-gray-400  text-white group  rounded-md p-2 ">
                    Guess the Car
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center py-2">
        <button
          className="group px-2 py-1 bg-gray-200 text-green-500 border inline-flex items-center gap-2 rounded-md disabled:text-gray-400 disabled:bg-opacity-50 disabled:pointer-events-none"
          onClick={handleLoadMore}
          disabled={displayCount >= CarsToRender.length}>
          <span>Load More</span>
          <RefreshCwIcon
            className="text-green-500 group-hover:animate-spin "
            fill="none"
            size={14}
          />
        </button>
      </div>
      <ScrollToTopButton />
      <FilterModal Cars={Cars} />
    </section>
  );
}
