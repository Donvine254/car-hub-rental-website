import {
  CalendarCheck2Icon,
  CalendarDaysIcon,
  Car,
  Locate,
  MapPinIcon,
} from "lucide-react";
import React from "react";
import Link from "next/link";

type Props = {};

export default function Homebooking({}: Props) {
  const today = new Date();
  const formattedDate = today.toISOString().substring(0, 10);
  return (
    <div className="px-4 py-4 border shadow bg-white ">
      {/* div for two cards */}
      {/* first card */}
      <h1 className=" text-center md:text-start text-2xl font-extrabold">
        Book A Car
      </h1>
      <form className="flex flex-col gap-2 md:grid md:grid-cols-2  md:gap-4">
        <div className="py-2">
          <label className="inline-flex font-bold">
            <Car fill="none" className="text-green-500" />
            <span> &nbsp; Select Your Car Type *</span>
          </label>
          <select
            className="flex h-10 bg-background text-base  w-full px-3 py-2 border border-gray-300 rounded-md"
            required>
            <option value="">Select Your Car Type</option>
            <option value="Saloon">Saloon</option>
            <option value="SUV">SUV</option>
            <option value="Pickup">Pickup</option>
            <option value="Van">Van</option>
          </select>
        </div>
        <div className="py-2">
          <label className="inline-flex font-bold">
            <MapPinIcon fill="none" className="text-green-500" /> &nbsp; Pick Up
            Location
          </label>
          <input
            placeholder="Enter Pick Up Location"
            type="text"
            className="flex h-10 bg-background text-base  w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="py-2">
          <label className="inline-flex font-bold">
            <MapPinIcon fill="none" className="text-green-500" /> &nbsp;
            Drop-Off Location
          </label>
          <input
            placeholder="Enter Drop Off Location"
            type="text"
            className="flex h-10 bg-background text-base  w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="py-2">
          <label className="inline-flex font-bold">
            <CalendarDaysIcon fill="none" className="text-green-500" /> &nbsp;
            Pickup Date
          </label>
          <input
            type="date"
            required
            defaultValue={formattedDate}
            className="flex h-10 bg-white text-base  w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="py-2">
          <label className="inline-flex font-bold">
            <CalendarCheck2Icon fill="none" className="text-green-500" /> &nbsp;
            Drop-Off Date
          </label>
          <input
            type="date"
            defaultValue={formattedDate}
            required
            className="flex h-10 bg-white text-base  w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="py-2 md:py-0 md:flex md:items-end md:justify-end md:pb-2 ">
          <Link
            href="/cars"
            className="border shadow-xl px-3 h-10 py-2 w-full text-white bg-green-500 hover:bg-green-600 text-xl rounded-md flex items-center justify-center ">
            Find A Vehicle
          </Link>
        </div>
      </form>
    </div>
  );
}
