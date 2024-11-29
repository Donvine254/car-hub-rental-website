"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/lib/fetchCars";
import { Heart, X } from "lucide-react";
import { toast } from "sonner";
type Props = {
  Cars: Car[];
};

export default function FavoriteCars({ Cars }: Props) {
  const [carsToRender, setCarsToRender] = useState(Cars);

  function handleUnfavorite(id: number) {
    setCarsToRender((prev) => prev.filter((c) => c.id !== id));
    toast.success("Car removed from favorites", {
      position: "top-right",
    });
  }
  return (
    <div className="space-y-6">
      {carsToRender && carsToRender.length > 0 ? (
        carsToRender.map((car: Car) => (
          <div
            key={car.id}
            className="bg-white rounded-lg shadow-lg border overflow-hidden flex items-center flex-wrap p-4 relative">
            <button
              className="absolute right-2 top-2 hover:text-red-500"
              title="remove from favorites"
              onClick={() => handleUnfavorite(car.id)}>
              {" "}
              <X />
            </button>
            <Image
              alt={car.modelName}
              src={car.image || "/vehicle-placeholder.png"}
              width={300}
              height={200}
              placeholder="blur"
              blurDataURL="/vehicle-placeholder.png"
              className="rounded-md hover:scale-105 transition-transform cursor-pointer"
            />
            <div className="flex-1 px-6 space-y-4">
              <h3 className="text-xl font-bold">{car.modelName}</h3>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="grid grid-cols-2 gap-4 lg:gap-x-8 text-sm">
                  <div>
                    <p className="font-medium">Seats:</p>
                    <p className="text-muted-foreground">{car.seats}</p>
                  </div>
                  <div>
                    <p className="font-medium">Fuel Type:</p>
                    <p className="text-muted-foreground">Petrol</p>
                  </div>
                  <div>
                    <p className="font-medium">Fuel Consumption:</p>
                    <p className="text-muted-foreground">
                      {car.fuelConsumption} L/100km
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Transmission:</p>
                    <p className="text-muted-foreground">
                      {car.transmissionType}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Body Type:</p>
                    <p className="text-muted-foreground capitalize">
                      {car.bodyType}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Ratings:</p>
                    <p className="text-muted-foreground">{car.rating}</p>
                  </div>
                </div>
                <div className="flex items-center lg:block gap-4 ">
                  <div className="md:text-center">
                    <p className="text-sm font-medium text-gray-500">
                      Daily rate from
                    </p>
                    <p className="text-2xl md:text-3xl my-1 font-bold text-green-600">
                      ${car.pricePerDay}
                    </p>
                  </div>
                  <Link
                    href={`/booking?car_model=${car.modelName}&price=${car.pricePerDay}`}
                    className="mt-4 bg-green-500 text-center text-white px-4 py-1 rounded-md hover:bg-green-600">
                    Rent Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-6 space-y-4 ">
          <div className="flex items-center justify-center py-1 ">
            {" "}
            <Image
              src="https://res.cloudinary.com/dipkbpinx/image/upload/v1706566325/cars/dusl0mvwvodod8jcz4hz.png"
              alt="placeholder"
              height={250}
              width={450}
              style={{
                width: "450px",
                height: "auto",
                aspectRatio: "16 / 9",
              }}
            />
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 leading-loose tracking-wide text-center">
            You have no favorite cars yet.
          </h2>
          <p className="xsm:text-sm text-center ">
            Save your memorable vehicles here to remind yourself you the
            experience you shared with them!
          </p>
        </div>
      )}
    </div>
  );
}
