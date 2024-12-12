"use server";

import { prisma } from "@/db/prisma";
import { sendAccountDeletionEmail } from "@/emails";
import { hashPassword } from "@/lib/utils/hashpassword";
import * as jose from "jose";
import * as bcrypt from "bcrypt";
import { cookies } from "next/headers";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export async function UpdateAccountDetails(data: {
  userId: number;
  username?: string;
  currentPassword?: string;
  newPassword?: string;
  image?: string;
}) {
  const cookieStore = await cookies();
  let hashedPassword;
  if (data.currentPassword && data.newPassword) {
    const isValidPassword = await comparePassword(
      data.userId,
      data.currentPassword
    );
    if (!isValidPassword) {
      return { success: false, error: "Invalid password, please try again" };
    } else hashedPassword = await hashPassword(data.newPassword);
  }
  try {
    const updateData: Partial<{
      username: string;
      image: string;
      password_digest: string;
    }> = {};

    if (data.username !== undefined) updateData.username = data.username;
    if (data.image !== undefined) updateData.image = data.image;
    if (hashedPassword) updateData.password_digest = hashedPassword;
    const user = await prisma.user.update({
      where: {
        id: data.userId,
      },
      data: updateData,
    });
    const token = await new jose.SignJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("8h")
      .sign(JWT_SECRET);
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      sameSite: "strict",
    });
    return { success: true, message: "User updated successfully" };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
}

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

async function comparePassword(userId: number, current_password: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (user) {
    const isPasswordValid = await bcrypt.compare(
      current_password,
      user.password_digest
    );
    return isPasswordValid;
  } else return false;
}
