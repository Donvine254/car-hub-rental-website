"use client";
import { Car } from "@/lib/actions/car-actions/fetchCars";
import { useRouter } from "next/navigation";
import React from "react";

import Carcard from "@/components/ui/car-card";
import { NotFound } from "@/components/ui/notfound";
type Props = {
  Cars: Car[];
};

export default function Favorites({ Cars }: Props) {
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
        <div className="flex xsm:flex-col flex-wrap gap-2 mx-auto ">
          {Cars.map((car) => (
            <Carcard key={car.id} car={car} handleBooking={handleBooking} />
          ))}
        </div>
      ) : (
        <NotFound
          title="You have no favorite cars yet"
          description="Save your memorable vehicles here to remind yourself of the experience you shared with them!"
        />
      )}
    </section>
  );
}
