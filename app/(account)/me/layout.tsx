import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { EB_Garamond } from "next/font/google";
import NavigationMenu from "@/components/ui/navigationmenu";
import { redirect } from "next/navigation";
import "../../globals.css";
import Footer from "@/components/ui/Footer";
import SideNav from "@/components/ui/sidenav";
import ProfileHeroComponent from "@/components/ui/profile-hero";
import { getUserData } from "@/lib/actions/decodetoken";

export const dynamic = "force-dynamic";

const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Car Hub",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
interface user {
  id: number;
  username: string;
  email: string;
  phone: number | null;
  role: string;
  image: string | null;
}
export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const User = (await getUserData()) as user;
  if (!User) {
    return redirect(`/login?post_login_redirect_url=me`);
  }
  return (
    <html lang="en">
      <body className={eb_garamond.className}>
        <Toaster richColors closeButton theme="light" />
        <NavigationMenu />
        <section>
          <ProfileHeroComponent />
          <section className="bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70 p-2 ">
            <div className="w-full min-h-[500px] mx-auto px-2 md:px-8 mt:24 md:mt-6 ">
              <div className="md:flex gap-2 md:items-start md:gap-4 relative">
                <SideNav user={User} />
                <section className="md:flex-1"> {children}</section>
              </div>
            </div>
          </section>
        </section>
        <Footer />
      </body>
    </html>
  );
}
