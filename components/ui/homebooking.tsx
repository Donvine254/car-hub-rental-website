import {
  CalendarCheck2Icon,
  CalendarDaysIcon,
  Car,
  MapPinIcon,
} from "lucide-react";
import React from "react";

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
      <form
        className="flex flex-col gap-2 md:grid md:grid-cols-2  md:gap-4"
        action={`/cars?${FormData}`}>
        <div className="py-2">
          <label className="inline-flex font-bold" htmlFor="model">
            <Car fill="none" className="text-green-500" />
            <span> &nbsp; Select Your Car Type *</span>
          </label>
          <select
            className="flex h-10 bg-background text-base  w-full px-3 py-2 border border-gray-300 rounded-md"
            name="model"
            id="model"
            required>
            <option value="" hidden>
              Select Your Car Type
            </option>
            <option value="Saloon">Saloon</option>
            <option value="SUV">SUV</option>
            <option value="Pickup">Pickup</option>
            <option value="Van">Van</option>
          </select>
        </div>
        <div className="py-2">
          <label htmlFor="pickupLocation" className="inline-flex font-bold">
            <MapPinIcon fill="none" className="text-green-500" /> &nbsp; Pick Up
            Location
          </label>
          <select
            className="flex h-10 bg-background text-base  w-full px-3 py-2 border border-gray-300 rounded-md"
            name="pickup_location"
            id="pickupLocation"
            required>
            <option value="" hidden>
              Choose a Pickup Location
            </option>
            <option value="nairobi">Nairobi</option>
            <option value="kisumu">Kisumu</option>
            <option value="mombasa">Mombasa</option>
            <option value="thika">Thika</option>
            <option value="nakuru">Nakuru</option>
            <option value="eldoret">Eldoret</option>
          </select>
        </div>
        <div className="py-2">
          <label htmlFor="dropLocation" className="inline-flex font-bold">
            <MapPinIcon fill="none" className="text-green-500" /> &nbsp;
            Drop-Off Location
          </label>
          <select
            className="flex h-10 bg-background text-base  w-full px-3 py-2 border border-gray-300 rounded-md"
            name="dropLocation"
            id="dropoff_location"
            required>
            <option value="" hidden>
              Choose a Drop-Off Location
            </option>
            <option value="nairobi">Nairobi</option>
            <option value="kisumu">Kisumu</option>
            <option value="mombasa">Mombasa</option>
            <option value="thika">Thika</option>
            <option value="nakuru">Nakuru</option>
            <option value="eldoret">Eldoret</option>
          </select>
        </div>
        <div className="py-2">
          <label htmlFor="pickupDate" className="inline-flex font-bold">
            <CalendarDaysIcon fill="none" className="text-green-500" /> &nbsp;
            Pickup Date and Time
          </label>
          <div className="flex items-center gap-0">
            <input
              type="date"
              id="pickupDate"
              name="pickup_date"
              required
              defaultValue={formattedDate}
              className="flex h-10 bg-white text-base  w-1/2 px-3 py-2 border-y border-l border-gray-300 rounded-l-md outline-none"
            />
            <input
              type="time"
              name="pickupTime"
              required
              defaultValue="08:00"
              className="h-10 w-1/2 bg-white text-base px-1 py-2 border-gray-300 rounded-r-md outline-none border"
            />
          </div>
        </div>
        <div className="py-2">
          <label htmlFor="drop-offDate" className="inline-flex font-bold">
            <CalendarCheck2Icon fill="none" className="text-green-500" /> &nbsp;
            Drop-Off Date and Time
          </label>
          <div className="flex items-center gap-0">
            <input
              type="date"
              name="dropoff_date"
              id="drop-offDate"
              required
              defaultValue={formattedDate}
              className="flex h-10 bg-white text-base  w-1/2 px-3 py-2 border-y border-l border-gray-300 rounded-l-md outline-none "
            />
            <input
              type="time"
              name="dropoff_time"
              required
              defaultValue="18:00"
              className="h-10 w-1/2  bg-white text-base px-1 py-2 border-gray-300 rounded-r-md outline-none border"
            />
          </div>
        </div>
        <div className="py-2 md:py-0 md:flex md:items-end md:justify-end md:pb-2 ">
          <button className="border shadow-xl px-3 h-10 py-2 w-full text-white bg-green-500 hover:bg-green-600 text-xl rounded-md flex items-center justify-center ">
            Find A Vehicle
          </button>
        </div>
      </form>
    </div>
  );
}
