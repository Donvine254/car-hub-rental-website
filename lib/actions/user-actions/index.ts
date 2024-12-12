"use server";

import { prisma } from "@/db/prisma";
import { sendAccountDeletionEmail } from "@/emails";
import { hashPassword } from "@/lib/utils/hashpassword";

export async function UpdateAccountDetails(data: {
  userId: number;
  username: string;
  currentPassword?: string;
  newPassword?: string;
  image: string;
}) {}

export async function DeleteAccount(
  userId: number,
  email: string,
  name: string
) {
  try {
    const result = await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });
    // await send email notification to confirm account deletion
    await sendAccountDeletionEmail(email, name);
    return { success: true, message: "User account deleted successfully." };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
