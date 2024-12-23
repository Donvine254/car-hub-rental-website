"use server";
import { prisma } from "@/db/prisma";

export interface DiscountData {
  code: string;
  percent: number;
  description: string;
  expiresAt: string;
  carId?: number;
  min_amount?: number;
  max_amount?: number;
}
export async function createNewCoupon(formData: DiscountData | any) {
  try {
    const coupon = await prisma.discount.create({
      data: {
        ...formData,
        expiresAt: new Date(formData.expiresAt).toISOString(),
      },
    });
    return { success: true, message: "Coupon created successfully", coupon };
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return { success: false, error: "Coupon code already exists" };
    } else return { success: false, error: "Something went wrong" };
  } finally {
    await prisma.$disconnect();
  }
}
