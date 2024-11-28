"use server";
import { NextRequest, NextResponse } from "next/server";
import { registerUsers } from "@/lib/register";
//function to register users

interface Data {
  username: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
  imageUrl?: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const params = (await req.json()) as Data;
  return true;
}
