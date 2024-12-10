"use server";
import { prisma } from "@/db/prisma";
import { sendResetPasswordEmail } from "@/emails";
import { decodeData } from "../../utils/generatetoken";
import { hashPassword } from "../../utils/hashpassword";
export async function handleResetPassword(email: string) {
  const e = email.toLowerCase();
  try {
    const user = await prisma.user.findUnique({
      where: { email: e },
    });
    if (!user) {
      // throw new Error("Oops! We couldn't find your account");
      return { success: false, error: "Oops! We couldn't find your account" };
    }
    const result = await sendResetPasswordEmail(
      user.email,
      user.id,
      user.username
    );
    return { success: true, message: result.message };
  } catch (error: any) {
    console.error(error);
    // throw new Error(error.message || "Something went wrong");
    return { success: false, error: error.message || "Something went wrong" };
  }
}
//return the errors for production purposes
//create error handler function

export async function resetPassword(token: string, password: string) {
  const decodedToken = decodeURIComponent(token);
  const hashedPassword = await hashPassword(password);
  try {
    const data = decodeData(decodedToken);
    if (!data) {
      return { success: false, error: "Invalid or expired token" };
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(data.id) },
    });
    if (!user) {
      // errors are suppressed in production. Instead of throwing errors, i should return them
      return { success: false, error: "User not found or email mismatch" };
    }
    await prisma.user.update({
      where: { id: Number(data.id) },
      data: {
        password_digest: hashedPassword,
      },
    });
    return { success: true, message: "Password reset successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  } finally {
    await prisma.$disconnect();
  }
}
