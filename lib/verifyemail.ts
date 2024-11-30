"use server";
import { prisma } from "@/db/prisma";

// Decode base64 string to JSON
function decodeData(encodedData: string) {
  try {
    const decodedData = atob(encodedData);
    const parsedData = JSON.parse(decodedData);
    console.log("parsed data:" + parsedData);
    return parsedData;
  } catch (error) {
    return null; // If decoding fails, return null
  }
}
export async function verifyEmail(token: string) {
  const decodedToken = decodeURIComponent(token);
  try {
    const data = decodeData(decodedToken);
    console.log(data);
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
    await prisma.user.update({
      where: { id: Number(data.id) },
      data: {
        metadata: {
          ...metadata,
          emailVerified: true,
        },
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Invalid token" };
  }
}
