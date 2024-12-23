"use server";
import { prisma } from "@/db/prisma";
export type Booking = {
  userId: number;
  carId: number;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropLocation: string;
  phoneNumber: number;
  totalPrice: number;
  status: string;
};
export async function createBooking(formData: Booking | any) {
  let error = false;
  try {
    // Create a new booking
    const newBooking = await prisma.booking.create({
      data: formData,
    });
    return newBooking;
  } catch (error) {
    console.error("Error creating booking:", error);
    error = true;
    throw new Error("Failed to create booking");
  } finally {
    if (!error) {
      try {
        // Update car's isRented status to true
        await prisma.car.update({
          where: { id: Number(formData.carId) },
          data: { isRented: true, rentedUntill: formData.endDate },
        });
      } catch (updateError) {
        console.error("Error updating car's isRented status:", updateError);
      }
    }
    await prisma.$disconnect();
  }
}
