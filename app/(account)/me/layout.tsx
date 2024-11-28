import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { EB_Garamond } from "next/font/google";
import NavigationMenu from "@/components/ui/navigationmenu";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import "../../globals.css";
import Footer from "@/components/ui/Footer";
import SideNav from "@/components/ui/sidenav";
import ProfileHeroComponent from "@/components/ui/profile-hero";

const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Car Hub",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
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
  if (error?.status === 401 || !data) {
    redirect("/login?post_login_redirect_url=me");
  }
  return (
    <html lang="en">
      <body className={eb_garamond.className}>
        <Toaster richColors closeButton theme="light" />
        <NavigationMenu />
        {/* how to pass the User object to children? */}
        <section>
          <ProfileHeroComponent />
          <section className="bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70 p-2">
            <div className="w-full min-h-[400px] mx-auto px-8 mt:24 md:mt-6 ">
              <div className="flex flex-col gap-2 md:flex-row  md:items-start md:gap-4 relative">
                <SideNav user={User} />
                {children}
              </div>
            </div>
          </section>
        </section>
        <Footer />
      </body>
    </html>
  );
}
