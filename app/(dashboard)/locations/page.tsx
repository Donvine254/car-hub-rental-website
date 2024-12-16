import React from "react";
import { Metadata } from "next";
import LocationsPage from "./locations";
import fetchCars, { Car } from "@/lib/actions/car-actions/fetchCars";
export const metadata: Metadata = {
  title: "Car Hub - Explore Our Locations",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};

export default async function Locations() {
  const Cars = (await fetchCars()) as Car[];
  return (
    <section className="bg-[#f8f9fa] relative">
      <div className="bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black flex items-center space-y-6 justify-center  bg-opacity-60 px-6 py-10 md:py-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Our Locations
          </h1>
        </div>
      </div>
      <LocationsPage Cars={Cars} />
    </section>
  );
}
