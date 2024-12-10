"use server";

import { prisma } from "@/db/prisma";
import { redirect } from "next/navigation";
export async function DeleteAccount(userId: number) {
  try {
    const result = await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });
    // await send email notification to confirm account deletion
    return { success: true, message: "User account deleted successfully." };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
