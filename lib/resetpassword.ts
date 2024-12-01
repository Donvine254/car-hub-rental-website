"use server";
import { prisma } from "@/db/prisma";
import { sendResetPasswordEmail } from "@/emails";
import { decodeData } from "./generatetoken";
import { hashPassword } from "./hashpassword";
export async function handleResetPassword(email: string) {
  const e = email.toLowerCase();
  try {
    const user = await prisma.user.findUnique({
      where: { email: e },
    });
    if (!user) {
      throw new Error("Oops! We couldn't find your account");
    }
    const result = await sendResetPasswordEmail(
      user.email,
      user.id,
      user.username
    );
    return result.message;
  } catch (error: any) {
    console.error(error);
    // Preserve specific error messages
    throw new Error(error.message || "Something went wrong");
  }
}

export async function resetPassword(token: string, password: string) {
  const decodedToken = decodeURIComponent(token);
  const hashedPassword = await hashPassword(password);
  try {
    const data = decodeData(decodedToken);
    if (!data) {
      throw new Error("Invalid or expired token");
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(data.id) },
    });
    if (!user) {
      throw new Error("User not found or email mismatch");
    }
    await prisma.user.update({
      where: { id: Number(data.id) },
      data: {
        password_digest: hashedPassword,
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  } finally {
    await prisma.$disconnect();
  }
}
