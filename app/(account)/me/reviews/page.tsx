import { getUserData } from "@/lib/actions/decodetoken";
import { redirect } from "next/navigation";
import { prisma } from "@/db/prisma";
import React from "react";
import { NotFound } from "@/components/ui/notfound";
import { Star } from "lucide-react";
import Image from "next/image";
type Props = {};

export default async function page({}: Props) {
  const user = await getUserData();
  if (!user) {
    return redirect(`/login?post_login_redirect_url=me`);
  }
  const reviews = await prisma.review.findMany({
    where: {
      userId: user.id,
    },
    include: {
      car: {
        select: {
          modelName: true,
          image: true,
          year: true,
        },
      },
    },
  });
  console.log(reviews);
  return (
    <section className="md:p-2 lg:p-4 md:bg-gray-50 md:shadow md:rounded-md md:border">
      <h2 className="font-bold my-2 text-xl md:text-2xl">My Reviews</h2>
      {reviews && reviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border rounded-lg p-4 flex flex-col">
              {/* Rating and Date */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{review.title}</h3>
              <p className="text-gray-600 mb-4">{review.body}</p>
              <div className="flex items-center bg-gray-100 rounded-md p-2">
                <Image
                  src={review.car.image || "/car-placeholder.png"}
                  alt={review.car.modelName}
                  width={120}
                  height={67.5}
                  className="rounded-md bg-white object-contain"
                />
                <p className="ml-3 md:inline-flex md:gap-2 text-gray-700 font-medium truncate w-full">
                  <span className="hidden md:block">{review.car.year} </span>
                  {review.car.modelName}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NotFound
          title="No reviews yet!"
          description="Looks like you have not written any reviews"
        />
      )}
    </section>
  );
}
