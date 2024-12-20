import React from "react";
import { prisma } from "@/db/prisma";
import { redirect } from "next/navigation";
import EditForm from "./editform";
type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const car = await prisma.car.findUnique({
    where: { id: Number(params.id) },
  });
  if (!car) {
    redirect("/admin");
  }
  return (
    <section>
      <EditForm car={car} />
    </section>
  );
}
