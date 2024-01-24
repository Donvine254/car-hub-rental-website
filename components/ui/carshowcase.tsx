import React from "react";

type Props = {};

export default function Carshowcase({}: Props) {
  return (
    <section className="h-full w-full bg-[#f8f9fa] py-4">
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
    </section>
  );
}
