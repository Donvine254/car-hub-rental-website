"use server";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jose.jwtVerify(token, JWT_SECRET);
    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export async function getSession() {
  // decode the session cookie and return the user data
  return null;
}
