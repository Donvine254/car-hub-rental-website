import React from "react";
type Props = {};
import type { Metadata } from "next";
import FavoriteCars from "./favoritecars";
import { Car } from "@prisma/client";
import { getUserData } from "@/lib/actions/decodetoken";
import { redirect } from "next/navigation";
import { prisma } from "@/db/prisma";

export const metadata: Metadata = {
  title: "Car Hub - Favorite Cars ",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
interface user {
  id: number;
  username: string;
  email: string;
  phone: number;
  role: string;
  image: string;
}
export default async function FavoriteCarS({}: Props) {
  const User = (await getUserData()) as user | null;
  if (!User) {
    return redirect(`/login?post_login_redirect_url=me`);
  }
  const favoritecars = (
    await prisma.favorite.findMany({
      where: {
        userId: User.id,
      },
      select: {
        car: true,
      },
    })
  ).map((favorite) => favorite.car) as Car[];
  return (
    <section>
      <FavoriteCars Cars={favoritecars} userId={User.id} />
    </section>
  );
}
