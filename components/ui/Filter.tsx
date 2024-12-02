import React from "react";
import { X } from "lucide-react";
import type { Car } from "@/lib/actions/fetchCars";
import PriceRangeFilter from "./Slider";
type Props = {
  Cars: Car[];
};

export default function FilterModal(props: Props) {
  const handleClose = () => {
    const modal = document.getElementById(
      `filter_modal`
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  return (
    <dialog id="filter_modal" className="rounded-md px-3 w-fit  border">
      <div className="py-3  relative ">
        <X
          onClick={handleClose}
          size={30}
          className="absolute top-1 right-1 bg-gray-100 p-1 rounded-md hover:text-red-500 cursor-pointer z-50"
        />
        <form className="px-4 mt-4">
          <h1 className="font-bold text-gray-600">Vehicle Type</h1>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center justify-start gap-1 md:gap-4">
              <input
                type="radio"
                name="model"
                value="Saloon"
                className="accent-[#1E7BAE]"
              />
              <span> Saloon</span>
            </div>
            <div className="flex items-center justify-start gap-1 md:gap-4">
              <input
                type="radio"
                name="model"
                value="SUV"
                className="accent-[#1E7BAE]"
              />
              <span> SUV</span>
            </div>
            <div className="flex items-center justify-start gap-1 md:gap-4">
              <input
                type="radio"
                name="model"
                value="Van"
                className="accent-[#1E7BAE]"
              />
              <span> Van</span>
            </div>
            <div className="flex items-center justify-start gap-1 md:gap-4">
              <input
                type="radio"
                name="model"
                value="Pickup"
                className="accent-[#1E7BAE]"
              />
              <span> Pickup</span>
            </div>
          </div>
          <div className="w-full">
            <h1 className="font-bold text-gray-600">Vehicle Make</h1>
            <select
              name="make"
              className="border rounded-md border-green-500 w-full my-2 py-1 outline-none">
              <option value="">Select a brand</option>
              {Array.from(
                new Set(props.Cars.map((car) => car.modelName.split(" ")[0]))
              ).map((modelName) => (
                <option
                  key={modelName}
                  value={modelName}
                  className="checked:bg-green-500">
                  {modelName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h1 className="font-bold text-gray-600">Location</h1>
            <select
              className="border rounded-md border-green-500 w-full my-2 py-1 outline-none"
              name="location"
              id="location">
              <option value="" hidden>
                Choose a Location
              </option>
              <option value="nairobi">Nairobi</option>
              <option value="kisumu">Kisumu</option>
              <option value="mombasa">Mombasa</option>
              <option value="thika">Thika</option>
              <option value="nakuru">Nakuru</option>
              <option value="eldoret">Eldoret</option>
            </select>
          </div>
          <div className=" ">
            <h1 className="font-bold text-gray-600">Car Seats</h1>
            <div className="flex items-center justify-start gap-1 md:gap-4">
              <input
                type="radio"
                name="seats"
                value={2}
                className="accent-[#1E7BAE]"
              />
              <span> 2 Seats</span>
            </div>
            <div className="flex items-center justify-start gap-1 md:gap-4">
              <input
                type="radio"
                name="seats"
                value={4}
                className="accent-[#1E7BAE]"
              />
              <span> 4 Seats</span>
            </div>
            <div className="flex items-center justify-start gap-1 md:gap-4">
              <input
                type="radio"
                name="seats"
                value={5}
                className="accent-[#1E7BAE]"
              />
              <span> 5 Seats</span>
            </div>
            <div className="flex items-center justify-start gap-1 md:gap-4">
              <input
                type="radio"
                name="seats"
                value=">6"
                className="accent-[#1E7BAE]"
              />
              <span> 6+ Seats</span>
            </div>
          </div>
          <PriceRangeFilter />
          <div className="flex items-center justify-between gap-5 ">
            <button
              type="submit"
              className="px-2  border border-green-500 hover:bg-green-600 hover:text-white  rounded-md"
              title="filter">
              Filter
            </button>
            <button
              type="reset"
              className="px-2  border border-green-500 hover:bg-green-600 hover:text-white  rounded-md"
              title="clear">
              Clear
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
