"use server";
import { prisma } from "@/db/prisma";
import * as jose from "jose";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export async function verifyEmail(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);

    if (
      !payload.email ||
      !payload.userId ||
      typeof payload.email !== "string" ||
      typeof payload.userId !== "string"
    ) {
      throw new Error("Invalid token payload");
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(payload.userId) },
    });

    if (!user || user.email !== payload.email) {
      throw new Error("User not found or email mismatch");
    }
    const metadata = user.metadata
      ? JSON.parse(JSON.stringify(user.metadata))
      : {};
    // Update user's emailVerified status
    await prisma.user.update({
      where: { id: Number(payload.userId) },
      data: {
        metadata: {
          ...metadata,
          emailVerified: true,
        },
      },
    });
    return { success: true };
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      return { success: false, error: "Token has expired" };
    }
    return { success: false, error: "Invalid token" };
  }
}
