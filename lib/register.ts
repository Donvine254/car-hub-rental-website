"use server";

import { prisma } from "@/db/prisma";
import { hashPassword } from "./hashpassword";

interface Data {
  username: string;
  email: string;
  password: string;
  role?: string;
  image?: string;
  phone: string;
}

export async function registerUsers(data: Data) {
  const hashedPassword = await hashPassword(data.password);
  try {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        phone: data.phone,
        password_digest: hashedPassword, // Use encrypted password
        role: "user",
        image: `https://ui-avatars.com/api/?background=random&name=${data.username}`,
      },
    });
    return user;
  } catch (error) {
    if ( error.code === "P2002" // Unique constraint violation
    ) {
      throw new Error("Email or Phone number already exists.");
    }
    throw new Error("An unexpected error occurred during registration.");
  }
}



