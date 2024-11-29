import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const response = NextResponse.redirect(`${requestUrl.origin}/login`, {
    status: 301,
  });
  response.cookies.delete("token");
  return response;
}
