import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { Dispatch } from "react";
import { Booking } from "@prisma/client";
import fetchCars from "../actions/car-actions/fetchCars";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

declare const confetti: any;
type SetCarImageType = Dispatch<React.SetStateAction<string>>;


export const handleGuessCar = (
  e: React.FormEvent,
  setCarImage: SetCarImageType
) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  const cars = [
    {
      model: "toyota",
      image:
        "https://res.cloudinary.com/dipkbpinx/image/upload/v1706566325/cars/nycmvwu03dz1hcr3uwlh.png",
    },
    {
      model: "lexus",
      image:
        "https://www.madebydesignesia.com/themes/rentaly/images/cars/lexus.jpg",
    },
    {
      model: "range rover",
      image:
        "https://www.madebydesignesia.com/themes/rentaly/images/cars/range-rover.jpg",
    },
    {
      model: "kia",
      image:
        "https://res.cloudinary.com/dipkbpinx/image/upload/v1706566323/cars/ocavzqiw0tolgl8dsohy.png",
    },
  ];

  const trialData = getCookie("carGuessTrials");
  const today = new Date().toISOString().split("T")[0];

  if (trialData) {
    const { date, trials } = JSON.parse(trialData);
    if (date === today) {
      if (trials >= 3) {
        toast.error("You have already used all your attempts for today!", {
          position: "top-center",
        });
        return;
      }
    } else {
      // Reset attempts for a new day
      setCookie("carGuessTrials", "", -1); // Clear cookie
    }
  }

  const formData = new FormData(form);
  const selectedCarType = formData.get("carType") as string;

  const randomModel = cars[Math.floor(Math.random() * cars.length)];

  if (selectedCarType.toLowerCase() === randomModel.model) {
    confetti({
      particleCount: 1000,
      spread: 100,
      origin: { y: 0.3 },
    });
    setCarImage(randomModel.image);
    toast.success(
      "Congratulations! You guessed correctly. You will receive 10% on your checkout!",
      {
        position: "top-center",
      }
    );

    // Set cookie to prevent further attempts
    setCookie(
      "carGuessTrials",
      JSON.stringify({ date: today, trials: 3 }),
      1
    );

    if (typeof window !== undefined)
      setTimeout(() => {
        window.location.href = "/cars";
      }, 5000);
  } else {
    toast.error(
      `Sorry, the correct answer was ${randomModel.model}. Try again!`,
      {
        position: "top-center",
      }
    );
    const currentTrials = trialData
      ? JSON.parse(trialData).trials + 1
      : 1;
    setCookie(
      "carGuessTrials",
      JSON.stringify({ date: today, trials: currentTrials }),
      1
    );
  }
};


export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(";").shift() : null;
};

export const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/;`;
};

export const showModal = async (id: number) => {
  const modal = document.getElementById(
    `my_modal_${id}`
  ) as HTMLDialogElement | null;
  if (modal) {
    modal.showModal();
  } else {
    console.log("modal not found");
  }
};

export type BookingWithCar = Booking & {
  car: {
    id: number;
    modelName: string;
  };
};
