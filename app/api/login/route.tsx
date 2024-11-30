import { prisma } from "@/db/prisma";
import * as jose from "jose";
import * as bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map();
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const ip = req.ip || req.headers.get("X-Forwarded-For");
  const limit = 3; // Limiting requests to 3 login attempts per minute per IP
  const windowMs = 60 * 1000; // 1 minute
  const suspensionMs = 5 * 60 * 1000; // 5 minutes

  // Rate limiting logic
  const now = Date.now();
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 0, lastReset: now, suspendedUntil: null });
  }

  const ipData = rateLimitMap.get(ip);
  // Check if the IP is currently suspended
  if (ipData.suspendedUntil && now < ipData.suspendedUntil) {
    return NextResponse.json(
      { error: "Too Many Requests. Try again after 5 minutes" },
      { status: 429 }
    );
  }

  if (now - ipData.lastReset > windowMs) {
    ipData.count = 0;
    ipData.lastReset = now;
  }

  if (ipData.count >= limit) {
    ipData.suspendedUntil = now + suspensionMs;
    return NextResponse.json(
      { error: "Too Many Requests. Try again after 5 minutes" },
      { status: 429 }
    );
  }

  ipData.count += 1;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No user with matching email found" },
        { status: 404 }
      );
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password_digest);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password, please try again!" },
        { status: 401 }
      );
    }

    // Generate a JWT token using `jose`
    const token = await new jose.SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("8h")
      .sign(JWT_SECRET);

    // Return user details and token
    const response = NextResponse.json({ user, token }, { status: 202 });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
