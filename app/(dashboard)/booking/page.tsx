"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import fetchCars, { car } from "@/lib/fetchCars";
import { toast } from "sonner";
import { getSession } from "@/lib/loginstatus";
type Props = {
  Cars: car[];
};

import {
  CalendarCheck2Icon,
  CalendarDaysIcon,
  Car,
  MapPinIcon,
} from "lucide-react";
export default function BookingPage({}: Props) {
  const [selectedCar, setSelectedCar] = useState<car | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const model_name = searchParams.get("car_model");
  useEffect(() => {
    async function redirectUser() {
      const Cars: car[] | null = await fetchCars();
      if (Cars) {
        const filteredCars = Cars.filter(
          (car) =>
            car.model_name.toLocaleLowerCase() ===
            model_name?.toLocaleLowerCase()
        );
        setSelectedCar(filteredCars[0] || null);
      }
      const session = await getSession();
      if (!session) {
        toast.error("Login required to perform this action! ", {
          position: "top-center",
        });
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    }
    redirectUser();
  }, [router, model_name]);

  return <div>{selectedCar?.body_type}</div>;
}
