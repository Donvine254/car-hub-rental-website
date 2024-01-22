"use server";

import { prisma } from "@/db/prisma";
import { hashPassword } from "./hashpassword";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
//function to register users

interface Data {
  username: string;
  user_id: string;
  email: string;
  password: string;
  role?: string;
  imageUrl?: string;
  phone: string;
}
export async function registerUsers(data: Data) {
  const hashedPassword = await hashPassword(data.password);
  try {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        user_id: data.user_id,
        email: data.email,
        phone: data.phone,
        password: hashedPassword, // Use encrypted password
        role: "user",
        imageUrl: `https://ui-avatars.com/api/?background=random&name=${data.username}`,
      },
    });
    return user;
  } catch (error) {
    return new Error(
      "Registration failed: Email or Phone number already exists"
    );
  }
}

// import { hashPassword } from "./hashpassword";
// import { supabase } from "@/db/supabase";
// //function to register users

// interface Data {
//   username: string;
//   email: string;
//   password: string;
//   phone: string;
//   role?: string;
//   imageUrl?: string;
// }

// export async function registerUsers(params: Data) {
//   const hashedPassword = await hashPassword(params.password);
//   const { data, error } = await supabase.auth.signUp({
//     email: params.email,
//     password: hashedPassword, // Use encrypted password
//     phone: params.phone,

//     options: {
//       data: {
//         username: params.username,
//         imageUrl: `https://ui-avatars.com/api/?background=random&name=${params.username}`,
//       },
//     },
//   });
//   if (error !== null) {
//     return error;
//   } else {
//     return data;
//   }
// }
