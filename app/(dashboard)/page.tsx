import Link from "next/link";

import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/assets";
import Homebooking from "@/components/ui/homebooking";

export default function Home() {
  return (
    <div className="pt-32 md:pt-0">
      <section className="relative bg-[url('https://watermark.lovepik.com/photo/20211208/large/lovepik-forest-road-highway-picture_501669994.jpg')] bg-cover bg-no-repeat bg-right py-5 h-full ">
        <div className="h-screen w-full  px-4 py-2 md:flex md:items-center md:justify-center md:gap-4 ">
          <div className="flex-1 bg-black rounded-md bg-opacity-40 p-2">
            <h1 className="text-white text-4xl md:text-6xl font-semibold leading-loose tracking-wide ">
              Explore the world with comfortable car
            </h1>
            <h3 className="text-gray-100 text-xl  font-semibold  my-2 leading-loose">
              Embark on unforgettable adventures and discover the world in
              unparalleled comfort and style with our fleet of exceptionally
              comfortable cars.
            </h3>
          </div>
          <div className="flex-1 w-full md:w-1/2">
            <Homebooking />
          </div>
          {/* delete upto here */}
        </div>
      </section>
      <section className="container mx-auto my-12">
        <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-between gap-2">
          <div className="flex-1">
            <h1 className="text-6xl font-extrabold text-gray-600">01</h1>
            <h2 className="text-2xl font-bold">Choose a vehicle</h2>
            <p className="mt-2 text-sm text-gray-600">
              Our vehicles come in various shapes, sizes, and brands, ensuring
              comfort and reliability.
            </p>
          </div>
          <div className="flex-1">
            <h1 className="text-6xl font-extrabold text-gray-600">02</h1>
            <h2 className="text-2xl font-bold">Pick location & date</h2>
            <p className="mt-2 text-sm text-gray-600">
              Pick your location carefully and give us the date as well.
            </p>
          </div>
          <div className="flex-1">
            <h1 className="text-6xl font-extrabold text-gray-600">03</h1>
            <h2 className="text-2xl font-bold">Make a booking</h2>
            <p className="mt-2 text-sm text-gray-600">
              We&apos;ll help you to complete the booking process.
            </p>
          </div>
          <div className="flex-1">
            <h1 className="text-6xl font-extrabold text-gray-600">04</h1>
            <h2 className="text-2xl font-bold">Sit back & relax</h2>
            <p className="mt-2 text-sm text-gray-600">
              We&apos;ll take care of every detail.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#f8f9fa] py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-bold text-center text-green-500 py-1 px-4 border bg-gray-200 w-fit">
              Why Choose Us
            </p>
            <h1 className="text-4xl font-bold text-center ">Our Features</h1>
          </div>

          <div className="mt-8 flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-xl font-semibold">First class services</h3>
              <p className="mt-2 text-sm text-gray-600">
                Experience convenience, safety, and customization, paving the
                way for unforgettable adventures and seamless mobility
                solutions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                Quality & Maximum Efficiency
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Uncompromising quality and efficiency with maximum comfort while
                ensuring brilliant transportation solutions to make the most of
                your car rental experience.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">24/7 road assistance</h3>
              <p className="mt-2 text-sm text-gray-600">
                Reliable support when you need it most, keeping you on the move
                with confidence and peace of mind.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Free Pick-Up & Drop-Off</h3>
              <p className="mt-2 text-sm text-gray-600">
                Enjoy free pickup and drop-off services, adding an extra layer
                of ease to your car rental experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto my-12 px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            We offer customers a wide range of commercial cars and luxury cars
            for any occasion.
          </h2>
          <p className="mt-4 text-sm text-gray-600">
            At our car rental agency, we believe that everyone deserves the
            pleasure of driving a reliable and comfortable vehicle, regardless
            of the budget. We have created a diverse fleet with maintained cars,
            ranging from standard to prestigious, SUV to compact performance
            cars. Our tailored services allow you an easy and convenient way to
            drive luxury vehicles. Whether you need transportation for a
            business event, vacation, emergency, or to enjoy a planned getaway,
            we have flexible rental options to suit.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-4 gap-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold">15425</h3>
            <p className="text-sm text-gray-600">Completed Orders</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold">8745</h3>
            <p className="text-sm text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold">235</h3>
            <p className="text-sm text-gray-600">Vehicles Fleet</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold">15</h3>
            <p className="text-sm text-gray-600">Years Experience</p>
          </div>
        </div>
      </section>
      <section className="bg-[#e5e5e5] py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">Enjoy Your Ride</h2>
          <p className="mt-4 text-center text-sm text-gray-600">
            Driving your dreams to reality with an exquisite fleet of versatile
            vehicles for unforgettable journeys.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Let&apos;s Your Adventure Begin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  First Class Services with every rental, ensuring exceptional
                  experiences and exceeding your every expectation.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>24/7 roadside assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  A dedicated team ready to help with roadside assistance and
                  customer care around the clock.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Free Pick-Up & Drop-Off</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  We provide convenient pick-up and drop-off services near our
                  rental locations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">Testimonials</h2>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <blockquote className="p-4 bg-white">
              <p className="text-sm text-gray-600">
                &quot;Excellent Service! Car Rent Service! I have been using
                your service for many years and always get the same excellent
                service no matter who I deal with!&quot;
              </p>
              <footer className="mt-4">
                <p className="text-sm font-medium">John Doe</p>
              </footer>
            </blockquote>
            <blockquote className="p-4 bg-white">
              <p className="text-sm text-gray-600">
                &quot;Excellent Service! Car Rent Service! We have been using
                your service for many years and always get the same excellent
                service no matter who I deal with!&quot;
              </p>
              <footer className="mt-4">
                <p className="text-sm font-medium">Jane Smith</p>
              </footer>
            </blockquote>
            <blockquote className="p-4 bg-white">
              <p className="text-sm text-gray-600">
                &quot;Excellent Service! Car Rent Service! I have been using
                your service for many years and always get the same excellent
                service no matter who I deal with!&quot;
              </p>
              <footer className="mt-4">
                <p className="text-sm font-medium">Michael Johnson</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
      <footer className="bg-[#333] text-white">
        <div className="container mx-auto py-12 px-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold">Any Questions?</h3>
              <p className="mt-4 text-sm">
                Rental customer care is here to help you anytime.
              </p>
              <p className="mt-2 text-2xl font-bold">+254702018099</p>
              <button className="mt-4 bg-green-600 px-4 py-2">
                Contact Us
              </button>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold">About Carhub</h4>
                <nav className="mt-4 space-y-2 flex flex-col gap-2">
                  <Link className="text-sm" href="#">
                    About
                  </Link>
                  <Link className="text-sm" href="#">
                    Blog
                  </Link>
                  <Link className="text-sm" href="#">
                    Terms and Conditions
                  </Link>
                </nav>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Social Network</h4>
                <div className="mt-4 flex space-x-4">
                  <FacebookIcon />
                  <TwitterIcon />
                  <InstagramIcon />
                  <YoutubeIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-1 border-t border-gray-700">
            <p className="text-sm">Copyright 2023 - Carhub design by Donvine</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
