"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import { CarSeat, CarFrontIcon, FuelPumpIcon, GearboxIcon } from "@/assets";

import { toast } from "sonner";
import type { Car } from "@/lib/fetchCars";
import { getSession } from "@/lib/session";
import CustomHeartIcon from "./HeartIcon";
import CarModal from "./carModal";
import { showModal } from "@/lib/utils";
import { Star } from "lucide-react";
type Props = {
  Cars: Car[];
};

export default function CarCarousel({ Cars }: Props) {
  const router = useRouter();
  async function handleBooking(car: Car) {
    const session = await getSession();
    if (!session) {
      toast.error("Login required to perform this action! ", {
        position: "top-center",
      });
      setTimeout(() => {
        router.push(`/login?post_login_redirect_url=/booking?id=${car.id}`);
      }, 1000);
    } else {
      router.push(`/booking?id=${car.id}`);
    }
  }

  return (
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
        {Cars.map((car) => (
          <CarouselItem
            key={car.id}
            className="xsm:w-full md:basis-1/2 lg:basis-1/3 px-2">
            <div className="w-fit border shadow bg-white rounded-md">
              <div className="p-2">
                <Image
                  alt={car.modelName}
                  src={car.image}
                  width={300}
                  height={300}
                  style={{ width: "auto", height: "auto" }}
                  placeholder="blur"
                  blurDataURL="/vehicle-placeholder.png"
                  priority
                  className="rounded-md hover:scale-105 cursor-pointer"
                  onClick={() => showModal(car?.id)}
                />

                <div className="flex items-center justify-between gap-4 pt-2 px-2">
                  <h1 className="text-bold text-xl ">{car.modelName}</h1>
                  <p className="flex items-center">
                    <Star className="fill-amber-500 stroke-none" size={16} />
                    {car.rating}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 px-4 py-1">
                <div className="flex flex-col items-center gap-0.5">
                  <CarFrontIcon />
                  <span className="capitalize">{car.bodyType}</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <GearboxIcon />
                  <span>{car.transmissionType}</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <CarSeat />
                  <span>{car.seats} Seats</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <FuelPumpIcon />
                  <span>{car.fuelConsumption}Km/L</span>
                </div>
              </div>
              {/* div for actions */}
              <hr className="border border-gay-200" />
              <div className="px-4 pt-1 pb-2 flex items-center justify-between  gap-4">
                <p className="text-sm">
                  Daily Rate From <br />
                  <span className="text-2xl font-semibold">
                    ${car.pricePerDay}
                  </span>
                </p>
                <button
                  className="px-2 py-1 border hover:shadow-2xl bg-green-500 text-white hover:bg-green-600 rounded-md flex-1 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                  onClick={() => handleBooking(car)}
                  disabled={car.isRented}>
                  {car.isRented ? "Unavailable" : "Book Now"}
                </button>
              </div>
            </div>
            <CarModal Car={car} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
