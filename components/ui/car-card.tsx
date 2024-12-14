import type { Car } from "@/lib/actions/car-actions/fetchCars";
import React from "react";
import CarModal from "../alerts/carModal";
import { isCarAvailable } from "@/lib/helpers";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CarFrontIcon, CarSeat, FuelPumpIcon, GearboxIcon } from "@/assets";
import { InfoIcon, MoveRightIcon, Star, BatteryCharging } from "lucide-react";
import { showModal } from "@/lib/utils";
type Props = {
  car: Car;
  key: number;
  handleBooking: (car: Car) => void;
};

export default function Carcard({ car, handleBooking, key }: Props) {
  const isAvailable = isCarAvailable(car.isRented, car.rentedUntill);
  return (
    <div key={key} className="w-fit border shadow bg-white rounded-md">
      <div className="p-2 relative">
        <Image
          alt={car.modelName}
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
        {isAvailable ? (
          <Badge variant="secondary" className="absolute top-3 left-3">
            &#x1F552; Booked
          </Badge>
        ) : (
          <Badge variant="success" className="absolute top-3 left-3">
            &#x2713; Available
          </Badge>
        )}
        <div className="flex items-center justify-between gap-4 pt-2 px-2">
          <h1 className="font-semibold text-xl text-gray-600 ">
            {car.modelName}
          </h1>
          <p className="flex items-center">
            <Star className="fill-amber-500 stroke-none" size={16} />
            {car.rating}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 px-4 py-1 my-1 group h-12">
        <div className="flex flex-col items-center gap-0.5 group-hover:hidden">
          <CarFrontIcon />
          <span className="capitalize">{car.bodyType}</span>
        </div>
        <div className="flex flex-col items-center gap-1 group-hover:hidden">
          <GearboxIcon />

          <span>{car.transmissionType}</span>
        </div>
        <div className="flex flex-col items-center gap-1 group-hover:hidden">
          <CarSeat />
          <span>{car.seats} Seats</span>
        </div>
        <div className="flex flex-col items-center gap-1 group-hover:hidden">
          {car.fuelType !== "electric" ? (
            <FuelPumpIcon />
          ) : (
            <BatteryCharging
              height="1.5em"
              width="1.5em"
              className="text-green-500"
            />
          )}
          <span>
            {car.fuelConsumption}
            {car.fuelType !== "electric" ? "Km/L" : "LDR"}
          </span>
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
      <div className="py-2 px-4">
        <button
          className={`
            px-4 py-2 rounded-md border font-semibold
            transition-all duration-300 ease-in-out w-full
            ${
              !isAvailable
                ? `
            bg-gradient-to-r from-green-400 to-blue-500
            hover:fancy-hover text-white
            hover:shadow-lg
          `
                : `
            bg-gray-200/70 text-gray-500
            cursor-not-allowed
          `
            }
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
            relative overflow-hidden
          `}
          onClick={() => handleBooking(car)}
          disabled={isAvailable}>
          {isAvailable ? "Unavailable" : `Book Now for $${car.pricePerDay}/Day`}
        </button>
      </div>
      <CarModal Car={car} />
    </div>
  );
}
