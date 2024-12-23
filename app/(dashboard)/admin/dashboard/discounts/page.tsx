import React from "react";
import fetchCars, { Car } from "@/lib/actions/car-actions/fetchCars";
import CreateDiscountForm from "./discount-form";
type Props = {};

export default async function page({}: Props) {
  const cars = (await fetchCars()) as Car[];
  return (
    <section className="bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70">
      <div className="bg-[url('/subheader.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Create Coupon
          </h1>
        </div>
      </div>
      <CreateDiscountForm cars={cars} />
    </section>
  );
}
