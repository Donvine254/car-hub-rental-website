"use client";
import React, { useState } from "react";
import { Cars } from "@/constants";
import Image from "next/image";
import { toast } from "sonner";
import { CarDoorIcon, CarSeat, FuelPumpIcon, SteeringWheel } from "@/assets";
import { FilterIcon, HeartIcon, RefreshCwIcon, Search } from "lucide-react";
import ScrollToTopButton from "@/components/ui/scrollButton";
type Props = {};

export default function Carspage({}: Props) {
  const [CarsToRender, setCarsToRender] = useState(Cars);
  const [displayCount, setDisplayCount] = useState(10); // Initial number of items to display

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
      return Math.min(newCount, Cars.length);
    });
  };

  return (
    <section className="bg-[#f8f9fa] relative">
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
            onClick={() => {
              toast.info("Coming soon feature!", {
                position: "top-right",
                style: { backgroundColor: "#22C55E", color: "white" },
              });
            }}>
            {" "}
            <FilterIcon width={20} height={20} />
          </button>
        </form>
        <section className=" grid gap-4 md:grid-cols-2 lg:grid-cols-3 py-2 ">
          {CarsToRender.slice(0, displayCount).map((car, index) => (
            <div
              key={index}
              className="w-fit border shadow bg-white rounded-md">
              <div className="p-2">
                <Image
                  alt={car.model_name}
                  src={car.image}
                  width={300}
                  height={300}
                  style={{ width: "auto", height: "auto" }}
                  priority
                  className="rounded-md hover:scale-105"
                />

                <div className="flex items-center justify-between gap-4 pt-2 px-2">
                  <h1 className="text-bold text-xl ">{car.model_name}</h1>
                  <p className="flex items-center">
                    <HeartIcon
                      className="text-gray-300 cursor-pointer hover:text-red-600"
                      fill="currentColor"
                      size={16}
                    />
                    {Math.floor(Math.random() * 91) + 10}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 px-4 py-1">
                <div className="flex items-center gap-1">
                  <CarSeat />
                  <span>{car.seats}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <CarDoorIcon />
                  <span>4</span>
                </div>
                <div className="flex items-center gap-1">
                  <SteeringWheel />
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FuelPumpIcon />
                  <span>{car.fuel_consumption}L/km</span>
                </div>
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
                  onClick={() => toast.info("feature coming soon!")}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </section>
        <div className="flex items-center justify-center">
          <button
            className="group px-2 py-1 bg-gray-200 text-green-500 border inline-flex items-center gap-2 rounded-md disabled:text-gray-400 disabled:bg-opacity-50 disabled:pointer-events-none"
            onClick={handleLoadMore}
            disabled={displayCount >= Cars.length}>
            <span>Load More</span>
            <RefreshCwIcon
              className="text-green-500 group-hover:animate-spin "
              fill="none"
              size={14}
            />
          </button>
        </div>
      </div>
      <ScrollToTopButton />
    </section>
  );
}
