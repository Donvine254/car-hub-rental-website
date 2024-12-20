import React from "react";
import { prisma } from "@/db/prisma";
import { toast } from "sonner";
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
    toast.error("Car to update not found");
    redirect("/admin");
  }
  return (
    <section>
      <EditForm car={car} />
    </section>
  );
}
