"use server";
import { prisma } from "@/db/prisma";
import { decodeData } from "../utils/generatetoken";
import { sendWelcomeEmail } from "@/emails";

// Decode base64 string to JSON

export async function verifyEmail(token: string) {
  const decodedToken = decodeURIComponent(token);
  try {
    const data = decodeData(decodedToken);
    if (!data) {
      throw new Error("Invalid token data");
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(data.id) },
    });

    if (!user || user.email !== data.email) {
      throw new Error("User not found or email mismatch");
    }
    const metadata = user.metadata
      ? JSON.parse(JSON.stringify(user.metadata))
      : {};
    // Update user's emailVerified status
    const userdata = await prisma.user.update({
      where: { id: Number(data.id) },
      data: {
        metadata: {
          ...metadata,
          emailVerified: true,
        },
      },
    });
    await sendWelcomeEmail(userdata.email, userdata.username);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Invalid token" };
  }
}
