import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    title: "Perfect for city driving",
    body: "The Kia Niro was exactly what I needed for my trip in Nairobi. Super comfortable and the electric powertrain made it very economical.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=60&h=60&q=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4.5,
    title: "Great electric SUV",
    body: "Very spacious and comfortable. The range was more than enough for my needs. Would definitely rent again.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=60&h=60&q=80",
  },
];

export const Reviews: React.FC = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={review.image}
                alt={review.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{review.name}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <h4 className="font-medium mb-2">{review.title}</h4>
            <p className="text-gray-600">{review.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
