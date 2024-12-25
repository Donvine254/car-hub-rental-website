import React from "react";
import Image from "next/image";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { Review, User } from "@prisma/client";
import { NotFound } from "@/components/ui/notfound";
interface ReviewWithUser extends Review {
  user: Pick<User, "id" | "username" | "image">;
}
type Props = {
  reviews: ReviewWithUser[];
};
export const ReviewsComponent = ({ reviews }: Props) => {
  return (
    <div className="my-2 px-2 md:px-4 pb-4 ">
      <h2 className="text-2xl font-bold mb-4">
        Customer Reviews ({reviews.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg p-6 shadow border flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src={review.user.image || "/placeholder.png"}
                    alt={review.user.username}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="space-y-1">
                    <h3 className="font-semibold">{review.user.username}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-green-500 text-sm font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500">
                    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                  Verified
                </span>
              </div>
              <h4 className="font-semibold text-lg capitalize mb-2">
                {review.title}
              </h4>
              <p className="text-gray-600 pb-4">{review.body}</p>
              {/* Spacer */}
              <div className="flex-grow"></div>
              {/* Footer */}
              <div className="flex items-center justify-between text-sm border-t pt-4 mt-auto font-medium">
                <div className="flex items-center">
                  {review.recommend ? (
                    <ThumbsUp className="w-4 h-4 mr-2 text-green-500" />
                  ) : (
                    <ThumbsDown className="w-4 h-4 mr-2 text-red-500" />
                  )}
                  <span
                    className={
                      review.recommend ? "text-green-600" : "text-red-500"
                    }>
                    {review.recommend
                      ? "Recommends this vehicle"
                      : "Does not recommend this vehicle"}
                  </span>
                </div>
                <span className="text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="cols-span-2">
            <NotFound
              title="No reviews yet"
              description="This car does not have any reviews yet. Check back later."
            />
          </div>
        )}
      </div>
    </div>
  );
};
