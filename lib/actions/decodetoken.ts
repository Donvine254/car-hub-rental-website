"use server";

import { prisma } from "@/db/prisma";
import { getSession } from "./session";

export const getUserData = async () => {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      console.error("No active session or userId found");
      return null;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: Number(session.userId),
      },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        role: true,
        phone: true,
      },
    });

    if (!user) {
      console.error("User not found in the database");
      return null;
    }

    return user;
  } catch (error: any) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
};
