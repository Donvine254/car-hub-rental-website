import React from "react";
import fetchCars from "@/lib/actions/fetchCars";
import { Car } from "@/lib/actions/fetchCars";
type Props = {};
import type { Metadata } from "next";
import FavoriteCars from "./favoritecars";

export const metadata: Metadata = {
  title: "Car Hub - Favorite Cars ",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
export default async function FavoriteCarS({}: Props) {
  const cars = (await fetchCars()) as Car[];
  // Shuffle the cars array and select the first three cars
  const randomCars = cars
    ? [...cars].sort(() => 0.5 - Math.random()).slice(0, 5)
    : [];

  return (
    <section>
      <FavoriteCars Cars={randomCars} />
    </section>
  );
}
