"use server";
import { prisma } from "@/db/prisma";
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
    console.error(error);
    return { success: false, error: "Something went wrong" };
  } finally {
    if (!isErrored) revalidatePath("/cars", "page");
    await prisma.$disconnect();
  }
}

type ReviewFormData = {
  carId: number;
  userId: number;
  rating: number;
  title: string;
  body: string;
  recommend: boolean;
};
export async function addCarReview(formData: ReviewFormData) {
  try {
    const review = await prisma.review.create({
      data: formData,
    });
    return { success: true, message: "review added successfully" };
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return { success: false, error: "You have already reviewed this car." };
    }
    return { success: false, error: error.message || "Something went wrong" };
  } finally {
    await prisma.$disconnect();
  }
}

export async function isReviewed(carId: number, userId: number) {
  try {
    const review = await prisma.review.findUnique({
      where: {
        userId_carId: {
          userId,
          carId,
        },
      },
    });
    if (review) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error checking review:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}
