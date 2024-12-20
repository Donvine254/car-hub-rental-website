"use server";
import { prisma } from "@/db/prisma";
import type { Car } from "./fetchCars";
import { revalidatePath } from "next/cache";

export async function createNewCar(Data: any) {
  let isErrored = false;
  try {
    await prisma.car.create({
      data: { ...Data },
    });
    return { success: true, message: "Car created successfully" };
  } catch (error: any) {
    isErrored = true;
    if (
      error.code === "P2002" // Unique constraint violation
    ) {
      return { success: false, error: "Car already exists" };
    }
    return { success: false, error: "Something went wrong" };
  } finally {
    if (!isErrored) revalidatePath("/cars", "page");
    await prisma.$disconnect();
  }
}

export async function updateCarDetails(id: number, data: any) {
  let isErrored = false;
  try {
    await prisma.car.update({
      where: {
        id: id,
      },
      data: { ...data },
    });
    return { success: true, message: "Car updated successfully" };
  } catch (error: any) {
    isErrored = true;
    return { success: false, error: "Something went wrong" };
  } finally {
    if (!isErrored) revalidatePath("/cars", "page");
    await prisma.$disconnect();
  }
}
