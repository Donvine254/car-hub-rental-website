import React from "react";
import Image from "next/image";
import {
  Calendar,
  CarIcon,
  MapPin,
  ShoppingCart,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchForm from "./search-form";
import fetchCars, { Car } from "@/lib/actions/car-actions/fetchCars";
import { CarFrontIcon, CarSeat, FuelPumpIcon, GearboxIcon } from "@/assets";
import Testimonials from "./testimonials";
import Link from "next/link";
type Props = {};

export default async function Marketplace({}: Props) {
  const cars = (await fetchCars()) as Car[];
  return (
    <section className="min-h-screen bg-[#F8F9FA]">
      <div className="relative min-h-[600px] bg-gradient-to-r from-green-100 via-gray-100 to-green-200 md:bg-white scroll-smooth">
        <div
          className="absolute inset-0 bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/t_hiring-banner/v1735231060/cars/l42d8a4tnco2pilgxh9j.webp')] bg-no-repeat bg-right bg-contain md:block hidden"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-lg ">
            <h1 className="text-6xl font-bold tracking-tight md:text-gray-900  md:text-7xl lg:mt-4">
              Find & sell your best car easily
            </h1>
            <p className="mt-4 text-xl  text-muted-foreground z-20">
              Whether you&apos;re looking to buy your dream car or sell your
              current ride, we make it simple, secure, and hassle-free.
            </p>
            <div className="my-10 flex gap-4">
              <Link href="#showcase" passHref scroll>
                <Button
                  className="justify-start shadow-sm text-white bg-green-500 hover:bg-green-600"
                  variant="secondary">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy a Car
                </Button>
              </Link>
              {/* show dialog for users to enter details */}
              <Button variant="default" className="justify-start">
                <CarFrontIcon className="mr-2 h-5 w-5" />
                Sell Your Car
              </Button>
            </div>
            <div className="flex mt-10">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-8 h-8 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="mt-4 text-3xl font-bold">
              12k+ <span className="text-muted-foreground">Good Reviews</span>
            </p>
          </div>
        </div>
      </div>
      <SearchForm />
      {/* show features */}
      <section className="py-16 bg-green-400 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Quality Choice</h3>
                <p className="text-muted">
                  We provide several quality car option for you so you
                  don&apos;t have to worry about the quality.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Exclusive Service For You
                </h3>
                <p className="text-muted">
                  We are ready to help find your dream car for your daily needs
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Fast and Safe Transaction
                </h3>
                <p className="text-muted">
                  Transaction process is completed within 24 hours (SSL
                  encrypted)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* show car lists */}
      <div
        className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-tr from-green-100 via-gray-100 to-green-100"
        id="showcase">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Browse Our Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.slice(0, 21).map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="">
                <Image
                  alt={car.modelName}
                  src={car.image}
                  width={300}
                  height={300}
                  placeholder="blur"
                  blurDataURL="/vehicle-placeholder.png"
                  className="cursor-pointer"
                  style={{ width: "100%", height: "auto" }}
                  priority
                />
              </div>
              <div className="px-6 pt-2 pb-4 space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {car.modelName}
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="capitalize">{car.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CarSeat className="h-5 w-5 mr-2" />
                    <span>{car.seats} seats</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CarFrontIcon className="h-5 w-5 mr-2" />
                    <span className="capitalize">{car.bodyType}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <GearboxIcon className="h-5 w-5 mr-2" />
                    <span className="capitalize">{car.transmissionType}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FuelPumpIcon className="h-5 w-5 mr-2" />
                    <span className="capitalize">{car.fuelType}</span>
                  </div>
                </div>
                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="justify-center sm:justify-start gap-1 bg-green-500 text-white  hover:bg-green-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1.5em"
                      width="1.5em">
                      <path d="M13 19.92c1.8-.22 3.35-.97 4.65-2.27 1.3-1.3 2.05-2.85 2.27-4.65h-3c-.22 1-.68 1.84-1.38 2.54-.7.7-1.54 1.16-2.54 1.38v3M10 8h4l3 3h2.92c-.25-1.95-1.13-3.62-2.65-5C15.76 4.66 14 4 12 4c-2 0-3.76.66-5.27 2-1.52 1.38-2.4 3.05-2.65 5H7l3-3m1 11.92v-3c-1-.22-1.84-.68-2.54-1.38-.7-.7-1.16-1.54-1.38-2.54h-3c.22 1.77.97 3.3 2.27 4.6 1.3 1.3 2.85 2.07 4.65 2.32M12 2c2.75 0 5.1 1 7.05 2.95C21 6.9 22 9.25 22 12s-1 5.1-2.95 7.05C17.1 21 14.75 22 12 22s-5.1-1-7.05-2.95C3 17.1 2 14.75 2 12s1-5.1 2.95-7.05C6.9 3 9.25 2 12 2z" />
                    </svg>{" "}
                    Book Test Drive
                  </Button>
                  <Button className="border-2 bg-transparent border-green-500 text-green-500  hover:bg-green-500 hover:text-white ">
                    Make an Offer
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* show testimonials */}
      <Testimonials />
    </section>
  );
}
