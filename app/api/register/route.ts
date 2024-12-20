"use server";

import { NextRequest, NextResponse } from "next/server";
import { registerUsers } from "@/lib/actions/user-actions/register";

interface Data {
  username: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
  imageUrl?: string;
  metadata?: {};
}

export async function POST(req: NextRequest) {
  let user;
  try {
    const params = (await req.json()) as Data;
    if (
      !params.username ||
      !params.email ||
      !params.password ||
      !params.phone
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    user = await registerUsers(params);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    console.error("Registration error:", error.message || error);
    const statusCode = error.message.includes("exists") ? 409 : 500;
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: statusCode }
    );
  }
}
