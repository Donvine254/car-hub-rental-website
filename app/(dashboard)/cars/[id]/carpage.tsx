import React from "react";
import { Check, Star } from "lucide-react";

import Image from "next/image";
import { ReviewsComponent } from "./reviews";
import { Car, Review, User } from "@prisma/client";
import { isCarAvailable } from "@/lib/helpers";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
export interface ReviewWithUser extends Review {
  user: Pick<User, "id" | "username" | "image">;
}

export interface CarWithReviewsAndUser extends Car {
  reviews: ReviewWithUser[];
}
export interface CarPageProps {
  car: CarWithReviewsAndUser;
}

export default function Carpage({ car }: CarPageProps) {
  const isAvailable = isCarAvailable(car.isRented, car.rentedUntill);
  const { reviews } = car;
  const averageRating = reviews.length
    ? (
        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      ).toFixed(1)
    : "0.0";

  const ratingCounts = Array.from({ length: 5 }, (_, i) => {
    const count = reviews.filter((review) => review.rating === i + 1).length;
    return {
      stars: i + 1,
      count,
      percentage: reviews.length ? (count / reviews.length) * 100 : 0,
    };
  }).reverse();

  return (
    <div className="bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70">
      <div className="bg-[url('/subheader.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Vehicle Fleet
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto min-h-screen">
        <div className="rounded-xl shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 p-2 md:p-4">
            {/* Image Section */}
            <div className="md:sticky md:top-12 h-fit relative">
              <Image
                src={car.image}
                alt={car.modelName}
                width={300}
                height={300}
                className="w-full h-auto object-contain rounded-md"
              />
              {isAvailable ? (
                <Badge variant="secondary" className="absolute top-3 left-3">
                  &#x1F552; Booked
                </Badge>
              ) : (
                <Badge variant="success" className="absolute top-3 left-3">
                  &#x2713; Available
                </Badge>
              )}
            </div>
            {/* Details Section */}
            <div className="space-y-2 md:bg-white md:shadow md:rounded-lg p-2 md:p-4 ">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                  {car.modelName}
                </h1>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < car.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500">({car.rating}/5)</span>
                </div>
                <p className="text-gray-600">
                  This{" "}
                  <span className="capitalize font-semibold">
                    {car.modelName}
                  </span>{" "}
                  is a powerful{" "}
                  <span className="font-semibold">{car.fuelType}</span>{" "}
                  <span className="font-semibold">{car.bodyType}</span> that can
                  accommodate up to{" "}
                  <span className="font-semibold">{car.seats}</span> people. If
                  you&apos;re in{" "}
                  <span className="capitalize font-bold">{car.location}</span>{" "}
                  and looking for an eco-friendly {car.bodyType}, this{" "}
                  <span className="font-semibold">{car.year}</span>{" "}
                  <span className="capitalize font-bold">{car.modelName}</span>{" "}
                  is ideal for you. With its efficient{" "}
                  <span className="font-semibold">{car.fuelConsumption}</span>
                  {car.fuelType !== "electric"
                    ? "Km/L (Kilometers per litre)"
                    : "LDR (Kilometers per charge)"}{" "}
                  consumption and{" "}
                  <span className="font-semibold">{car.transmissionType}</span>{" "}
                  transmission, it offers a perfect blend of comfort and
                  sustainability.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-xl md:text-2xl">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 divide-y divide-gray-300">
                  <div className="grid grid-cols-2 py-1">
                    <span className="text-muted-foreground">Body Type</span>
                    <span className="capitalize font-semibold">
                      {car.bodyType === "suv"
                        ? car.bodyType.toUpperCase()
                        : car.bodyType}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 py-1">
                    <span className="text-muted-foreground">Seats</span>
                    <span className="font-semibold">{car.seats} seats</span>
                  </div>
                  <div className="grid grid-cols-2 py-1">
                    <span className="text-muted-foreground">Year</span>
                    <span className="font-semibold">{car.year}</span>
                  </div>
                  <div className="grid grid-cols-2 py-1">
                    <span className="text-muted-foreground">Location</span>
                    <span className="capitalize font-semibold">
                      {car.location}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 py-1">
                    <span className="text-muted-foreground">Transmission</span>
                    <span className="capitalize font-semibold">
                      {car.transmissionType}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 py-1">
                    <span className="text-muted-foreground">Fuel Type</span>
                    <span className="capitalize font-semibold">
                      {car.fuelType}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 py-1">
                    <span className="text-muted-foreground">Fuel Economy</span>
                    <span className="font-semibold">
                      {car.fuelConsumption}{" "}
                      {car.fuelType !== "electric" ? "Km/L" : "LDR"}
                    </span>
                  </div>
                </div>
              </div>
              <hr />
              <div className="mb-6">
                <h2 className="text-2xl font-semibold my-2">Features</h2>
                <ul className="flex gap-y-2 gap-x-4 flex-wrap items-center">
                  <li>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>Bluetooth</span>
                    </Badge>
                  </li>
                  <li>
                    <Badge variant="outline">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>Central Lock</span>
                    </Badge>
                  </li>
                  <li>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>Air Conditioning</span>
                    </Badge>
                  </li>
                  <li>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>Power Windows</span>
                    </Badge>
                  </li>
                  <li>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-2">
                      {" "}
                      <Check className="w-5 h-5 text-green-500" />
                      <span>GPS Navigation</span>
                    </Badge>
                  </li>
                  <li>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>Infotainment system</span>
                    </Badge>
                  </li>
                  <li>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>Spare Tyre</span>
                    </Badge>
                  </li>
                </ul>
              </div>
              {/* reviews card */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 ">
                <div className="w-full rounded-lg border bg-white p-6 shadow">
                  <div className="text-center space-y-1.5 mb-6">
                    <div>
                      <span className="text-4xl font-bold">
                        {averageRating}
                      </span>
                      <div className="flex justify-center gap-1 my-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 ${
                              i < Math.round(Number(averageRating))
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">
                        Based on {car.reviews.length} review
                        {car.reviews.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    {ratingCounts.map(({ stars, count, percentage }) => (
                      <div
                        key={stars}
                        className="grid grid-cols-[2rem_1fr_3rem]  items-center">
                        <div className="text-sm font-medium">{stars}</div>
                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="text-sm text-gray-500 text-right">
                          ({count})
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-green-100 border shadow p-6 rounded-lg flex flex-col justify-between gap-4 items-center">
                  <p className="text-base font-medium">Daily Rate</p>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-600">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(car.pricePerDay)}
                  </h3>

                  <Link
                    href={`/booking?id=${car.id}&car_model=${car.modelName}&price=${car.pricePerDay}`}
                    className="w-full"
                    passHref>
                    <button
                      className={`px-4 py-2 rounded-md border font-semibold transition-all duration-300 ease-in-out w-full mt-4 ${
                        !isAvailable
                          ? `bg-gradient-to-r from-green-400 to-blue-500 hover:fancy-hover text-white hover:shadow-lg`
                          : ` bg-gray-200/70 text-gray-500
            cursor-not-allowed
          `
                      }
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
            relative overflow-hidden
          `}
                      disabled={isAvailable}>
                      {isAvailable ? "Unavailable" : "Book Now"}
                    </button>
                  </Link>
                </div>
              </section>
            </div>
          </div>
          <hr />
          {/* Reviews Section */}
          <ReviewsComponent reviews={car.reviews} />
        </div>
      </div>
    </div>
  );
}
