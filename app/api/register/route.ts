"use server";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/hashpassword";
import { supabase } from "@/db/supabase";
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
  const response = await supabase.auth.signUp({
    email: params.email,
    password: params.password, // Use encrypted password
    phone: params.phone,
    options: {
      data: {
        username: params.username,
        imageUrl: `https://ui-avatars.com/api/?background=random&name=${params.username}`,
      },
    },
  });
  if (response.error !== null) {
    throw new Error(response.error.message);
  } else {
    // registerUsers(params);
    return NextResponse.json(response.data);
  }
}
