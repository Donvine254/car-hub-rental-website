import React from "react";
import Link from "next/link";
import fetchCars, { Car } from "@/lib/actions/fetchCars";
import CarCarousel from "./carCarousel";

export default async function Carshowcase() {
  const Cars = (await fetchCars()) as Car[];

  return (
    <section className="h-full w-full bg-[#f8f9fa] py-4 p-2 overflow-x-hidden">
      <div className="flex flex-col items-center justify-center mx-auto">
        <p className="text-xl font-bold text-center text-green-500 py-1 px-4 border bg-gray-200 w-fit">
          Enjoy Your Ride
        </p>
        <h2 className="text-4xl font-bold text-center">Our Vehicle Fleet</h2>
        <p>
          Driving your dreams to reality with an exquisite fleet of versatile
          vehicles for unforgettable journeys.
        </p>
      </div>
      {Cars && <CarCarousel Cars={Cars} />}
      <div className="flex items-center justify-center mx-auto">
        <Link
          href="/cars"
          prefetch
          className="rounded-md px-4 bg-gray-200 text-green-500 font-bold py-1 border  hover:bg-green-500 hover:text-white hover:shadow-xl">
          View All
        </Link>
      </div>
    </section>
  );
}
