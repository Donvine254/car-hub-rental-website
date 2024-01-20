import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
type Props = {};

export default async function Profile({}: Props) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  if (error?.status === 401) {
    redirect("/login?post_login_redirect_url=me/profile");
  }

  return (
    <div className="w-full min-h-[400px] mx-auto px-8 md:w-3/4 mt:24 md:mt-6 ">
      <div className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-start lg:gap-5 ">
        {/* first card */}
        <div className="lg:w-1/3 p-6 bg-gray-50 border shadow rounded-md hover:bg-gray-100">
          <Image
            src={
              data?.user?.user_metadata.avatar_url ??
              data?.user?.user_metadata.imageUrl
            }
            height={120}
            width={120}
            alt="User Profile"
            className="w-[120px] h-[120px] rounded-full m-auto ring-offset-4 ring-2 ring-green-600 ring-offset-white"
          />

          <p className="text-gray-700 font-semibold my-2">
            {data?.user?.user_metadata.username}
          </p>
          <p className="text-gray-700 mb-2 break-words">{data?.user?.email}</p>
          <p className="text-gray-700 font-semibold mb-2">Phone</p>
          <p className="text-gray-700 mb-2">
            {data?.user?.phone === ""
              ? "Update your Phone Number"
              : data?.user?.phone}
          </p>

          <Link
            href="/me/settings"
            className="text-green-500 hover:underline my-3 font-bold ">
            Edit Profile
          </Link>
        </div>
        {/* second div */}
      </div>
    </div>
  );
}
