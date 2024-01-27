"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Cars } from "@/constants";
import Image from "next/image";

import { CarDoorIcon, CarSeat, FuelPumpIcon, SteeringWheel } from "@/assets";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {};

export default function Carshowcase({}: Props) {
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
      <Carousel
        className="md:max-w-[75%] mx-auto my-4 h-fit "
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 8000,
          }),
        ]}>
        <CarouselContent>
          {Cars.map((car, index) => (
            <CarouselItem
              key={index}
              className="xsm:w-full md:basis-1/2 lg:basis-1/3 px-2">
              <div className="w-fit border shadow bg-white rounded-md">
                <div className="p-2">
                  <Image
                    alt={car.model_name}
                    src={car.image}
                    width={300}
                    height={300}
                    style={{ width: "auto", height: "auto" }}
                    placeholder="blur"
                    blurDataURL="/cars/vehicle-placeholder.png"
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
                  <div className="flex  items-center gap-0.5">
                    <CarSeat />
                    <span>{car.seats}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <CarDoorIcon />
                    <span>4</span>
                  </div>
                  <div className="flex  items-center gap-0.5">
                    <SteeringWheel />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex  items-center gap-0.5">
                    <FuelPumpIcon />
                    <span>{car.fuel_consumption}L/km</span>
                  </div>
                </div>
                {/* div for actions */}
                <hr className="border border-gay-200" />
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
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
