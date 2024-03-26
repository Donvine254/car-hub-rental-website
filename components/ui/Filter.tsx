import React from "react";
import { X } from "lucide-react";
import type { car } from "@/lib/fetchCars";
type Props = {
  Cars: car[];
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
    <dialog
      id="filter_modal"
      className="rounded-md px-3 md:min-w-[500px]  border">
      <div className="py-3 min-w-fit max-w-lg  relative ">
        <X
          onClick={handleClose}
          size={30}
          className="absolute top-1 right-1 bg-gray-100 p-1 rounded-md hover:text-red-500 cursor-pointer z-50"
        />
        <form className="px-4 mt-4 w-fit">
          <div className=" ">
            <h1 className="font-bold text-gray-600">Vehicle Type</h1>
            <div className="flex items-center justify-start gap-1 md:gap-4">
              <input type="radio" name="vehicleType" value="Saloon" />
              <span> Saloon</span>
            </div>
            <div className="flex items-center justify-start gap-1 md:gap-4">
              <input type="radio" name="vehicleType" value="SUV" />
              <span> SUV</span>
            </div>
            <div className="flex items-center justify-start gap-1 md:gap-4">
              <input type="radio" name="vehicleType" value="Van" />
              <span> Van</span>
            </div>
            <div className="flex items-center justify-start gap-1 md:gap-4">
              <input type="radio" name="vehicleType" value="Pickup" />
              <span> Pickup</span>
            </div>
          </div>
          <button
            type="submit"
            className="px-2  border border-green-500 hover:bg-green-600 hover:text-white  rounded-md"
            title="filter">
            Filter
          </button>
        </form>
      </div>
    </dialog>
  );
}
