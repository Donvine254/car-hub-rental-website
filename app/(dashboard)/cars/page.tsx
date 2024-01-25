"use client";
import React, { useState } from "react";
import { Cars } from "@/constants";
import Image from "next/image";

import { CarDoorIcon, CarSeat, FuelPumpIcon, SteeringWheel } from "@/assets";
import { HeartIcon, Search } from "lucide-react";
type Props = {};

export default function Carspage({}: Props) {
  const [CarsToRender, setCarsToRender] = useState(Cars);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    const filteredCars = Cars.filter((car) =>
      car.model_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCarsToRender(filteredCars);
  };

  return (
    <section className="bg-[#f8f9fa]">
      <div className="bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 md:py-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Car Collection
          </h1>
        </div>
      </div>
      <div className="min-h-screen mx-2  md:w-3/4 md:mx-auto p-2 ">
        <form
          className="flex items-center justify-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <input
            type="search"
            placeholder="Search by model name"
            onInput={handleSearch}
            className="rounded-md h-10 px-3 py-1  flex-1 outline-none border focus:border-green-500 border-gray-300 shadow"
          />
          <button className="px-3  border border-green-500 hover:bg-green-600 hover:text-white h-10 rounded-md ">
            <Search width={20} height={20} />
          </button>
        </form>
        <section className=" grid gap-4 md:grid-cols-2 lg:grid-cols-3 py-2 ">
          {CarsToRender.map((car, index) => (
            <div
              key={index}
              className="w-fit border shadow bg-white rounded-md">
              <div className="p-2">
                <Image
                  alt={car.model_name}
                  src={car.image}
                  width={300}
                  height={300}
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
                <button className="px-2 py-1 border hover:shadow-2xl bg-green-500 text-white hover:bg-green-600 rounded-md flex-1">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
