import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
type Props = {};

export default async function Profile({}: Props) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  if (error?.status === 401) {
    redirect("/login");
  }

  return (
    <div className="mx-4 mt-18 ">
      <div className="flex items-center justify-center md:mx-auto"></div>
      <p>Welcome {data?.user?.user_metadata.username}</p>
    </div>
  );
}
