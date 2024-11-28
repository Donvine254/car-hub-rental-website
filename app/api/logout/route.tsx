
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  // delete the auth cookie

  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    status: 301,
  });
}
