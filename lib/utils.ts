import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { Dispatch } from "react";
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
  const formData = new FormData(form);
  const selectedCarType = formData.get("carType") as string;

  let randomModel = cars[Math.floor(Math.random() * cars.length)];

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
  }
  randomModel = cars[Math.floor(Math.random() * cars.length)];
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
