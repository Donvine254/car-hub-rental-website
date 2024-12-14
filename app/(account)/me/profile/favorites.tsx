"use client";
import { Car } from "@/lib/actions/car-actions/fetchCars";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import Image from "next/image";
import { NotFound } from "@/components/ui/notfound";
import { isCarAvailable } from "@/lib/helpers";
type Props = {
  Cars: Car[];
};

export default function Favorites({ Cars }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };
  const router = useRouter();
  async function handleBooking(car: Car) {
    router.push(
      `/booking?id=${car.id}&car_model=${car.modelName}&price=${car.pricePerDay}`
    );
  }
  return (
    <section className="space-y-8 my-2">
      <h2 className="text-2xl font-bold tracking-tight">My Favorite Cars</h2>

      {Cars && Cars.length > 0 ? (
        <>
          {Cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-lg border overflow-hidden flex items-center flex-wrap p-4 ">
              <Image
                alt={car.modelName}
                src={car.image || "/vehicle-placeholder.png"}
                width={300}
                height={200}
                placeholder="blur"
                blurDataURL="/vehicle-placeholder.png"
                className="rounded-md hover:scale-105 transition-transform cursor-pointer"
              />
              <div className="flex-1 px-6 space-y-4 ">
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
                  <div className="flex items-center lg:block gap-4 space-y-2">
                    <div className="md:text-center">
                      <p className="text-sm font-medium text-gray-500">
                        Daily rate from
                      </p>
                      <p className="text-2xl md:text-3xl my-1 font-bold text-green-600">
                        ${car.pricePerDay}
                      </p>
                    </div>
                    <button
                      onClick={() => handleBooking(car)}
                      className="mt-4 bg-green-500 text-center text-white px-4 py-1 rounded-md hover:bg-green-600 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                      disabled={isCarAvailable(car.isRented, car.rentedUntill)}>
                      {isCarAvailable(car.isRented, car.rentedUntill)
                        ? "Unavailable"
                        : "Book Now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <NotFound
          title="You have no favorite cars yet"
          description="Save your memorable vehicles here to remind yourself of the experience you shared with them!"
        />
      )}
    </section>
  );
}
