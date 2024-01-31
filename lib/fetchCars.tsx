"use server";

export type car = {
  id: number;
  model_name: string;
  seats: number;
  fuel_consumption: number;
  transmission: string;
  image: string;
  price_per_day: number;
  rating: number;
  body_type: string;
};

export default async function fetchCars() {
  try {
    const response = await fetch(
      "https://basalt-equatorial-paw.glitch.me/cars",
      {
        next: {
          revalidate: 300,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data as car[];
  } catch (error) {
    console.error(error);
    return null;
  }
}
