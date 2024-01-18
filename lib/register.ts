"use server";
import { prisma } from "@/db/prisma";
import { hashPassword } from "./hashpassword";
//function to register users

interface Data {
  username: string;
  email: string;
  password: string;
  role?: string;
  imageUrl?: string;
}
export async function registerUsers(data: Data) {
  const hashedPassword = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      passwordHash: hashedPassword, // Use encrypted password
      role: "user",
      imageUrl: `https://ui-avatars.com/api/?background=random&name=${data.username}`,
    },
  });
  console.log(user);
}
