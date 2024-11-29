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
export type Car = {
  id: number;
  modelName: string;
  image: string;
  year: number;
  pricePerDay: number;
  transmissionType: string;
  bodyType: string;
  fuelConsumption: string;
  seats: number;
  fuelType: string;
  isRented: boolean;
  rating?: number;
  location?: string;
  createdAt?: string;
  reviews?: [];
  bookings?: [];
  favorites?: [];
};

export default async function fetchCars() {
  try {
    const response = await fetch(
      "https://basalt-equatorial-paw.glitch.me/cars",
      {
        next: {
          revalidate: 3600,
        },
      }
    );
    const data = await response.json();
    return data as car[];
  } catch (error) {
    console.error(error);
    return null;
  }
}
