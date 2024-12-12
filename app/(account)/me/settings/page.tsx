import React from "react";
import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationsTab from "./notifications";
import ProfileTab from "./profile-tab";
import { getUserData } from "@/lib/actions/decodetoken";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Car Hub - Update Your Profile ",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
type Props = {};
interface user {
  id: number;
  username: string;
  email: string;
  phone: number;
  role: string;
  image: string;
}

export default async function Settings({}: Props) {
  const User = (await getUserData()) as user | null;
  if (!User) {
    return redirect(`/login?post_login_redirect_url=me`);
  }
  return (
    <section>
      <Tabs defaultValue="profile" className="w-full bg-white p-2 only:md:p-6">
        <TabsList className="flex justify-start gap-2 md:gap-4 overflow-x-auto w-full border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="profile"
            className="font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6">
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6">
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
