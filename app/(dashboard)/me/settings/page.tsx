import React from "react";
import type { Metadata } from "next";
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
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile" className="text-lg font-bold">
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-lg font-bold">
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
  );
}
