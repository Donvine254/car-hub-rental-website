import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { EB_Garamond } from "next/font/google";
import NavigationMenu from "@/components/ui/navigationmenu";

import "../globals.css";
import Footer from "@/components/ui/Footer";
import { GoogleContextProvider } from "@/providers/google";
import { getUserData } from "@/lib/actions/decodetoken";
import { GoogleOneTapLogin } from "../(auth)/login/google-login";

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

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const User = (await getUserData()) as user | null;
  return (
    <html lang="en">
      <body className={eb_garamond.className}>
        <Toaster richColors closeButton theme="light" />
        <NavigationMenu />
        <GoogleContextProvider>
          <GoogleOneTapLogin session={User} />
          {children}
        </GoogleContextProvider>
        <Footer />
      </body>
    </html>
  );
}
