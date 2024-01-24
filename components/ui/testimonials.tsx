"use client";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/constants";
import { QuoteIcon } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

export default function Testimonials() {
  return (
    <section className="bg-[#f8f9fa] py-4">
      <div className="flex flex-col items-center justify-center mx-auto">
        <p className="text-xl font-bold text-center text-green-500 py-1 px-4 border bg-gray-200 w-fit">
          What Customers Say
        </p>
        <h2 className="text-4xl font-bold text-center">Testimonials</h2>
      </div>
      <Carousel
        className="md:max-w-[75%] mx-auto my-4 h-fit"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}>
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center px-6">
                    <blockquote className="px-2 bg-white">
                      <p className="text-sm text-gray-600 inline-block">
                        <QuoteIcon
                          fill="none"
                          className="text-green-500 "
                          size={30}
                        />
                        {testimonial.description}
                      </p>
                      <p className="text-amber-500">★★★★★</p>
                      <hr className="my-2" />
                      <p className="text-sm font-medium capitalize my-2">
                        {testimonial.name}
                      </p>
                    </blockquote>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
