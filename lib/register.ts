"use server";
import { hashPassword } from "./hashpassword";
import { supabase } from "@/db/supabase";
//function to register users

interface Data {
  username: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
  imageUrl?: string;
}

export async function registerUsers(params: Data) {
  const hashedPassword = await hashPassword(params.password);
  const { data, error } = await supabase.auth.signUp({
    email: params.email,
    password: hashedPassword, // Use encrypted password
    phone: params.phone,

    options: {
      data: {
        username: params.username,
        imageUrl: `https://ui-avatars.com/api/?background=random&name=${params.username}`,
      },
    },
  });
  console.log(data);
  console.log(error);
}
