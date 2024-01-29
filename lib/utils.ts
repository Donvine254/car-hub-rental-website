import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

declare const confetti: any;

export const handleGuessCar = (e: React.FormEvent) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const models = ["toyota", "lexus", "range rover", "kira"];
  const formData = new FormData(form);
  const selectedCarType = formData.get("carType") as string;

  let randomModel = models[Math.floor(Math.random() * models.length)];

  if (selectedCarType.toLowerCase() === randomModel) {
    confetti({
      particleCount: 1000,
      spread: 100,
      origin: { y: 0.3 },
    });

    toast.success(
      "Congratulations! You guessed correctly. You will receive 10% on your checkout!",
      {
        position: "top-center",
      }
    );
    if (typeof window !== undefined) window.location.href = "/cars";
  } else {
    toast.error(`Sorry, the correct answer was ${randomModel}. Try again!`, {
      position: "top-center",
    });
  }
  randomModel = models[Math.floor(Math.random() * models.length)];
};
