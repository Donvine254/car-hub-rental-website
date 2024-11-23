"use server";

import { prisma } from "@/db/prisma";
import { hashPassword } from "./hashpassword";
interface Data {
  username: string;
  email: string;
  password: string;
  role?: string;
  imageUrl?: string;
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
        imageUrl: `https://ui-avatars.com/api/?background=random&name=${data.username}`,
      },
    });
    return user;
  } catch (error) {
    return new Error(
      "Registration failed: Email or Phone number already exists"
    );
  }
}


