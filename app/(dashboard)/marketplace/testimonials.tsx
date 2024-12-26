import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Car Buyer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    content:
      "Found my dream car within days! The search process was incredibly smooth, and the detailed listings helped me make an informed decision.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Car Seller",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
    content:
      "Sold my car faster than I expected. The platform made it easy to showcase my vehicle and connect with serious buyers.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Car Enthusiast",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
    content:
      "The variety of cars available is impressive. I appreciate how detailed the search filters are - makes finding exactly what you want so much easier.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div className="bg-[#f8f9fa] py-4 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Image
                  height={48}
                  width={48}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
