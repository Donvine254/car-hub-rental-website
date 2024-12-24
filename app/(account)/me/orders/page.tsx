import React from "react";
import type { Metadata } from "next";
import { Orders } from "./orders";
import { prisma } from "@/db/prisma";
import { getUserData } from "@/lib/actions/decodetoken";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Car Hub - My Orders ",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
type Props = {};
interface user {
  id: number;
  username: string;
  email: string;
  phone: number;
  role: string;
  image: string;
}
export default async function OrdersPage({}: Props) {
  const User = (await getUserData()) as user | null;
  if (!User) {
    return redirect(`/login?post_login_redirect_url=me`);
  }
  const orders = await prisma.booking.findMany({
    where: {
      userId: User.id,
    },
    include: {
      car: {
        select: {
          modelName: true,
          id: true,
          image: true,
          location: true,
        },
      },
    },
  });
  return (
    <section className="md:w-full">
      <Orders orders={orders} currentUser={User} />
    </section>
  );
}
