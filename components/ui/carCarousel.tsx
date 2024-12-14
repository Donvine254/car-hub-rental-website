"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { toast } from "sonner";
import type { Car } from "@/lib/actions/car-actions/fetchCars";
import { getSession } from "@/lib/actions/session";
import CarModal from "../alerts/carModal";
import Carcard from "./car-card";
type Props = {
  Cars: Car[];
};

export default function CarCarousel({ Cars }: Props) {
  const router = useRouter();
  async function handleBooking(car: Car) {
    const session = await getSession();
    if (!session) {
      toast.error("Login required to perform this action! ", {
        position: "top-center",
      });
      setTimeout(() => {
        router.push(
          `/login?post_login_redirect_url=/booking?id=${car.id}&car_model=${car.modelName}&price=${car.pricePerDay}`
        );
      }, 1000);
    } else {
      router.push(
        `/booking?id=${car.id}&car_model=${car.modelName}&price=${car.pricePerDay}`
      );
    }
  }

  return (
    <Carousel
      className="md:max-w-[75%] mx-auto my-4 h-fit "
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 8000,
        }),
      ]}>
      <CarouselContent>
        {Cars.map((car) => (
          <CarouselItem
            key={car.id}
            className="xsm:w-full md:basis-1/2 lg:basis-1/3 px-2">
            <Carcard car={car} key={car.id} handleBooking={handleBooking} />
            <CarModal Car={car} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
