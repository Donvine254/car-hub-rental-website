"use server";
import { generateToken } from "@/lib/generatetoken";
const user = {
  email: "donvinemugendi@gmail.com",
  id: "2",
};

export async function sendVerificationEmail(email: string, userId: string) {
  const url = generateToken(user.email, user.id);
  
}
