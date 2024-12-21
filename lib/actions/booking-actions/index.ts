"use server";
// All functions related to booking CRUD operations
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

type Status = "ongoing" | "cancelled" | "completed";
export async function UpdateOrderStatus(
  id: number,
  status: Status,
  carId: number
) {
  let isErrored = false;
  try {
    await prisma.booking.update({
      where: { id },
      data: {
        status: status,
      },
    });
    return { success: true, message: "Booking status updated successfully!" };
  } catch (error) {
    console.error(error);
    isErrored = true;
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  } finally {
    //let this run at the end of the request to improve response time
    if (!isErrored && status !== "ongoing") {
      await prisma.car.update({
        where: { id: carId },
        data: { isRented: false, rentedUntill: null },
      });
      revalidatePath("/cars", "page");
      revalidatePath("/admin", "layout");
    }
    await prisma.$disconnect();
  }
}
