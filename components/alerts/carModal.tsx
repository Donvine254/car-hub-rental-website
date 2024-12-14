import React from "react";
import Image from "next/image";
import { Star, X } from "lucide-react";
import type { Car } from "@/lib/actions/car-actions/fetchCars";
import { getSession } from "@/lib/actions/session";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatDate, isCarAvailable } from "@/lib/helpers";
interface CarModalProps {
  Car: Car | null;
}

export default function CarModal({ Car }: CarModalProps) {
  const router = useRouter();
  const handleClose = () => {
    const modal = document.getElementById(
      `my_modal_${Car?.id}`
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };
  async function handleBooking(Car: Car) {
    const session = await getSession();
    if (!session) {
      toast.error("Login required to perform this action! ", {
        position: "top-center",
      });
      setTimeout(() => {
        router.push(
          `/login?post_login_redirect_url=/booking?id=${Car.id}&car_model=${Car.modelName}&price=${Car.pricePerDay}`
        );
      }, 1000);
    } else {
      router.push(
        `/booking?id=${Car.id}&car_model=${Car.modelName}&price=${Car.pricePerDay}`
      );
    }
  }

  if (!Car) {
    return null;
  }

  return (
    <dialog id={`my_modal_${Car.id}`} className="rounded-md  border px-4 ">
      <div className="w-fit max-w-lg  relative ">
        <X
          onClick={handleClose}
          size={30}
          className="absolute top-1 right-1 bg-gray-100 p-1 rounded-md hover:text-red-500 cursor-pointer z-50"
        />
        <div className="p-4 w-fit">
          <div className="w-full">
            <Image
              alt={Car.modelName}
              src={Car.image}
              width={600}
              height={600}
              style={{ width: "auto", height: "auto" }}
              placeholder="blur"
              blurDataURL="/vehicle-placeholder.png"
              priority
              className="rounded-md w-full italic bg-green-500 "
            />
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h1 className="text-bold text-2xl my-2 font-semibold">
              {Car.modelName}
            </h1>
            <p className="flex items-center">
              <Star className="fill-amber-500 stroke-none" size={16} />
              {Car.rating}
            </p>
          </div>
          <h1 className="text-bold text-[18px] text-green-700">
            Specifications
          </h1>
          <div className="text-gray-600 font-semibold py-2 divide divide-y divide-gray-200">
            <div className="flex items-center justify-between ">
              <p className="">Make</p>
              <p className="capitalize text-green-600">
                {Car.modelName?.split(" ")[0]}
              </p>
            </div>
            <div className="flex items-center justify-between ">
              <p className="">Body Type</p>
              <p className="capitalize text-green-600">
                {Car.bodyType.toUpperCase()}
              </p>
            </div>

            <div className="flex items-center justify-between ">
              <p className="">No. of Seats</p>
              <p className="capitalize text-green-600">{Car.seats}</p>
            </div>
            <div className="flex items-center justify-between ">
              <p className="">Fuel Consumption</p>
              <p className="capitalize text-green-600">
                {Car.fuelConsumption} Km/L
              </p>
            </div>
            <div className="flex items-center justify-between ">
              <p className="">Fuel Type</p>
              <p className="capitalize text-green-600"> {Car.fuelType}</p>
            </div>
            <div className="flex items-center justify-between ">
              <p className="">Transmission</p>
              <p className="capitalize text-green-600">
                {Car.transmissionType}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="">Year of Manufacture</p>
              <p className="capitalize text-green-600">2020</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="">Location</p>
              <p className="capitalize  text-green-600 ">{Car.location}</p>
            </div>
            <div className="flex items-center justify-between py-1">
              <p className="">Price Per Day</p>
              <p className="capitalize font-bold text-green-600 text-xl bg-gray-200 px-6 rounded-md">
                $ {Car.pricePerDay}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleBooking(Car)}
            className="px-2 py-1 border rounded-md flex-1 bg-green-500 text-white hover:shadow-2xl hover:bg-green-600 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed xsm:w-full"
            disabled={isCarAvailable(Car.isRented, Car.rentedUntill)}>
            {isCarAvailable(Car.isRented, Car.rentedUntill)
              ? `Booked till ${formatDate(Car?.rentedUntill ?? "")}`
              : "Book Now"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
