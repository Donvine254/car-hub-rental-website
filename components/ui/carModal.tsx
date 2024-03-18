import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { car } from "@/lib/fetchCars";
import CustomHeartIcon from "./HeartIcon";
interface CarModalProps {
  Car: car;
}

export default function CarModal({ Car }: CarModalProps) {
  const handleClose = () => {
    const modal = document.getElementById(
      `my_modal_${Car.id}`
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  if (!Car) {
    return null;
  }

  return (
    <dialog id={`my_modal_${Car.id}`} className="rounded-md  border px-4 ">
      <div className="w-fit max-w-lg  relative ">
        <X
          onClick={handleClose}
          size={30}
          className="absolute top-1 right-1 bg-gray-100 p-1 rounded-md hover:text-red-500 cursor-pointer z-50"
        />
        <div className="p-4 w-fit">
          <div className="w-full">
            <Image
              alt={Car.model_name}
              src={Car.image}
              width={600}
              height={600}
              style={{ width: "auto", height: "auto" }}
              placeholder="blur"
              blurDataURL="/vehicle-placeholder.png"
              priority
              className="rounded-md w-full italic bg-green-500 "
            />
          </div>

          <div className="md:flex md:items-center md:justify-between gap 2">
            <h1 className="text-bold text-2xl my-2 font-semibold">
              {Car.model_name}
            </h1>
            <CustomHeartIcon />
          </div>
          <h1 className="text-bold text-[18px]">Specifications</h1>
          <div className="text-gray-600 font-semibold py-2 divide divide-y divide-gray-200">
            <div className="flex items-center justify-between ">
              <p className="">Make</p>
              <p className="capitalize text-green-600">
                {Car.model_name?.split(" ")[0]}
              </p>
            </div>
            <div className="flex items-center justify-between ">
              <p className="">Body Type</p>
              <p className="capitalize text-green-600">
                {Car.body_type.toUpperCase()}
              </p>
            </div>

            <div className="flex items-center justify-between ">
              <p className="">No. of Seats</p>
              <p className="capitalize text-green-600">{Car.seats}</p>
            </div>
            <div className="flex items-center justify-between ">
              <p className="">Fuel Consumption</p>
              <p className="capitalize text-green-600">
                {Car.fuel_consumption} Km/L
              </p>
            </div>
            <div className="flex items-center justify-between ">
              <p className="">Fuel Type</p>
              <p className="capitalize text-green-600"> Petrol</p>
            </div>
            <div className="flex items-center justify-between ">
              <p className="">Transmission</p>
              <p className="capitalize text-green-600">{Car.transmission}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="">Year of Manufacture</p>
              <p className="capitalize text-green-600">2020</p>
            </div>
            <div className="flex items-center justify-between py-1">
              <p className="">Price Per Day</p>
              <p className="capitalize font-bold text-green-600 text-xl bg-gray-200 px-6 rounded-md">
                $ {Car.price_per_day}
              </p>
            </div>
          </div>
          <button className="p-2 rounded-md w-full bg-green-500 text-white  hover:bg-green-600">
            Book Now
          </button>
        </div>
      </div>
    </dialog>
  );
}
