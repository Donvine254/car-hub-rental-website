"use server";

import { prisma } from "@/db/prisma";
import { hashPassword } from "../../utils/hashpassword";
import { sendVerificationEmail } from "@/emails";
interface Data {
  username: string;
  email: string;
  password: string;
  role?: string;
  image?: string;
  phone: string;
  metadata?: {};
}

export async function registerUsers(data: Data) {
  const hashedPassword = await hashPassword(data.password);
  let user;
  let error = false;
  try {
    user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email.toLowerCase(),
        phone: data.phone,
        password_digest: hashedPassword,
        role: "user",
        image:
          data.image ||
          `https://ui-avatars.com/api/?background=random&name=${data.username}`,
        metadata: data.metadata || {
          provider: "email",
          emailVerified: false,
          phoneVerified: false,
        },
      },
    });
    return user;
  } catch (error: any) {
    error = true;
    if (
      error.code === "P2002" // Unique constraint violation
    ) {
      throw new Error("Email or Phone number already exists.");
    }
    throw new Error("An unexpected error occurred during registration.");
  } finally {
    if (user && !error) {
      await sendVerificationEmail(user.email, user.id, user.username);
    }
    await prisma.$disconnect();
  }
}

