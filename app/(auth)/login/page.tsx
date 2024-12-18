"use client";
import React, { useState, useEffect } from "react";
import { FacebookIcon } from "@/assets";
import { InfoIcon, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession } from "@/lib/actions/session";
import { toast } from "sonner";
import Link from "next/link";
import axios from "axios";
import TurnstileComponent from "@/components/ui/turnstile";
import verifyTurnstileToken from "@/lib/actions/verifycaptcha";
import GoogleLoginButton from "./google-login";
import FacebookLoginButton from "./facebook-login";
import Script from "next/script";
type Props = {};
declare const window: any; // To handle 'fbAsyncInit'
declare let FB: any; // For Facebook SDK object
interface FormData {
  email: string;
  password: string;
}

export default function Login({}: Props) {
  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("post_login_redirect_url") ?? "/";
  const isDev = process.env.NODE_ENV === "development";
  //function for onChange event handler
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    //verify token
    const isHuman = await verifyTurnstileToken(token);
    if (!isHuman) {
      toast.error("Kindly complete the recaptcha challenge");
    }
    // post to /api/login
    try {
      const response = await axios.post("/api/login", {
        email: data.email,
        password: data.password,
      });
      const user = await response.data;
      toast.success("Logged in successfully", {
        position: "bottom-center",
      });
      router.replace(redirect);
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      toast.error(error?.response?.data?.error, {
        position: "bottom-center",
      });
    }
  };
  //check if users are already logged in to prevent unnecessary db calls
  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session) {
        setIsLoggedIn(true);
      }
    })();
  }, []);

  //handle Logout function
  async function handleLogout() {
    await fetch("/api/logout");
    toast.success("Logged out successfully", {
      position: "top-center",
    });
    setIsLoggedIn(false);
  }
  if (isLoggedIn) {
    return (
      <section className="w-full h-screen flex items-center justify-center bg-[#f8f9fa]">
        <Script
          src="https://connect.facebook.net/en_US/sdk.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (window.FB) {
              window.fbAsyncInit = function () {
                FB.init({
                  appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
                  cookie: true,
                  xfbml: false,
                  version: "v19.0",
                });
              };
            }
          }}
        />
        <div
          id="login_modal"
          className="rounded-md flex flex-col gap-5 items-center justify-center py-10 border px-4 bg-white xsm:mx-2">
          <InfoIcon className="text-green-500" size={60} />
          <h1 className="font-semibold text-gray-600 text-xl xsm:text-center">
            You are Already Logged In. Would you like to logout?
          </h1>
          <div className="flex items-center justify-between gap-5 py-4">
            <button
              onClick={handleLogout}
              title="logout"
              className="px-4 py-1 rounded-md border border-green-500 hover:bg-green-500 hover:text-white">
              Logout
            </button>
            <Link
              href="/"
              className="px-4 py-1 rounded-md border bg-green-500 text-white">
              Return Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <form
      className="w-full bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70"
      onSubmit={handleSignIn}>
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-4">
        <div
          className="border text-card-foreground w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white"
          data-v0-t="card">
          <div className="flex flex-col space-y-1.5 px-6 py-4 relative">
            <h3 className="font-semibold tracking-tight text-2xl text-center">
              Login to Your Account
            </h3>
            <p className="text-base  text-center">
              Schedule bookings and manage your account.
            </p>
          </div>
          <div className="px-6 space-y-2">
            <div className="space-y-2 group">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="email">
                Email
              </label>
              <input
                className="flex h-10 bg-background text-base  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
                id="email"
                name="email"
                value={data.email}
                type="email"
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="password">
                Password
              </label>
              <input
                className="flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
                id="password"
                name="password"
                value={data.password}
                placeholder="*******"
                minLength={8}
                onChange={handleChange}
                required
                type={showPassword ? "text" : "password"}
              />
            </div>
            <div className="xsm:text-[10px] flex items-center justify-between gap-1 md:gap-4">
              <div className="flex items-center justify-start gap-1 md:gap-4">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span> {!showPassword ? "Show" : "Hide"} Password</span>
              </div>
              <div>
                <a
                  className="hover:text-blue-500 underline underline-offset-2 cursor-pointer"
                  href="/reset">
                  Forgot Password?
                </a>
              </div>
            </div>
            {!loading && (
              <TurnstileComponent onVerify={(token) => setToken(token)} />
            )}
          </div>

          <div className="items-center px-6 py-1 flex flex-col space-y-4">
            <button
              className="inline-flex items-center justify-center text-xl font-medium border disabled:pointer-events-none disabled:bg-green-50 disabled:text-black  h-10 px-4 py-2 w-full bg-green-500 hover:bg-green-600 text-white rounded-md"
              type="submit"
              disabled={loading || !token}
              title="login">
              {!loading ? (
                "Login"
              ) : (
                <Loader
                  className="animate-spin text-green-500"
                  fill="#22C55E"
                />
              )}
            </button>
            {/* beginning of social logins */}
            <div className="flex items-center gap-2 w-full ">
              <hr className="border border-gray-200 w-full" />
              <div className="text-sm flex-1 w-fit whitespace-nowrap">
                Or Login With
              </div>
              <hr className="border border-gray-200 w-full" />
            </div>
            <div className="flex items-center justify-between gap-2 xsm:gap-1 pb-4 px-1 w-full ">
              <GoogleLoginButton router={router} origin_url={redirect} />
              <FacebookLoginButton router={router}  />
            </div>
          </div>
        </div>
        <div className="mt-2 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            prefetch
            className="text-green-600 hover:underline border px-2 py-0.5 bg-white rounded-md"
            href="register">
            Register Here
          </Link>
        </div>
      </div>
    </form>
  );
}
