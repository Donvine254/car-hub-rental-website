import { supabase } from "@/db/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const response = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  console.log(response);
  if (response.error !== null) {
    return NextResponse.json(response.error, { status: 401 });
  } else {
    return NextResponse.json(response.data, { status: 200 });
  }
}
