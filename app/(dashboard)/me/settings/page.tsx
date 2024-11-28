import React from "react";
import type { Metadata } from "next";
import SideNav from "@/components/ui/sidenav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationsTab from "./notifications";
import ProfileTab from "./profile-tab";
export const metadata: Metadata = {
  title: "Car Hub - Update Your Profile ",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
type Props = {};

const user = {
  username: "johndoe",
  name: "John Doe",
  phone: "+1234567890",
  image_url: "/placeholder.svg?height=100&width=100",
  language: "en",
};
export default async function Settings({}: Props) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();
  const User = {
    username:
      data?.user?.user_metadata.username || data?.user?.user_metadata.name,
    email: data?.user?.email || "you@example.com",
    image_url:
      data?.user?.user_metadata.avatar_url ||
      data?.user?.user_metadata.imageUrl,
    phone: data?.user?.phone ?? "+1234567890",
    language: "en",
  };
  return (
    <section>
      <div className="bg-[url('/hero.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Settings
          </h1>
        </div>
      </div>

      <section className="bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70 p-2">
        <div className="w-full min-h-[400px] mx-auto px-8 mt:24 md:mt-6 ">
          <div className="flex flex-col gap-2 md:flex-row  md:items-start md:gap-4 relative">
            {/* first card */}
            <SideNav pathname="settings" />
            {/* second div */}
            <section>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile" className="text-lg font-bold">
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="text-lg font-bold">
                    Notifications
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                  <ProfileTab user={User} />
                </TabsContent>
                <TabsContent value="notifications">
                  <NotificationsTab />
                </TabsContent>
              </Tabs>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}
