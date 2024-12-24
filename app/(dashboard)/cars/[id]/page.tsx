import React from "react";
import { prisma } from "@/db/prisma";
import { redirect } from "next/navigation";
import Carpage from "./carpage";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const car = await prisma.car.findUnique({
    where: { id: Number(params.id) },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
        },
      },
    },
  });
  if (!car) {
    redirect("/cars");
  }
  return (
    <section>
      <Carpage car={car} />
    </section>
  );
}
