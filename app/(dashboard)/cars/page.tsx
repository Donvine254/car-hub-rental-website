import React from "react";
import Carspage from "./cars";
import type { Metadata } from "next";
import fetchCars, { car } from "@/lib/fetchCars";

export const metadata: Metadata = {
  title: "Car Hub - Explore Cars",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};

type Props = {};

export default async function Page({}: Props) {
  const Cars: car[] | null = await fetchCars();

  if (Cars === null) {
    console.error("Failed to fetch cars data");
    return <div>Loading..</div>;
  }
  return (
    <main>
      <Carspage Cars={Cars} />
    </main>
  );
}
