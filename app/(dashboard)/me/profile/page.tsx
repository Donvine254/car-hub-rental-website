import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutGrid,
  CarFront,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";
import { Stats } from "@/components/ui/stats";
import { RecentOrders } from "@/components/ui/recentorders";
import { Favorites } from "@/components/ui/favorites";

type Props = {};

export default async function Profile({}: Props) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  if (error?.status === 401) {
    redirect("/login?post_login_redirect_url=me/profile");
  }

  return (
    <section className="bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70 p-2">
      <div className="w-full min-h-[400px] mx-auto px-8 mt:24 md:mt-6 ">
        <div className="flex flex-col gap-2 md:flex-row  md:items-start md:gap-4 relative">
          {/* first card */}
          
          {/* second div */}
          <section>
            <Stats />
            <RecentOrders />
            <Favorites />
          </section>
        </div>
      </div>
    </section>
  );
}
