"use client";
import React, { useState } from "react";
import { GoogleIcon, FacebookIcon } from "@/assets";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";
import Link from "next/link";
type Props = {};

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  //function for onChange event handler
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const supabase = createClientComponentClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (response.error !== null) {
      setLoading(false);
      toast.error(response.error.message, {
        position: "bottom-center",
      });

      return false;
    } else {
      setLoading(false);
      toast.success("Logged in successfully", {
        position: "bottom-center",
      });
      router.replace("/");
    }
  };
  return (
    <form className="w-full " onSubmit={handleSignIn}>
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 font-poppins">
        <div
          className="border text-card-foreground w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white"
          data-v0-t="card">
          <div className="flex flex-col space-y-1.5 px-6 py-4 font-poppins relative">
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
            <div className="xsm:text-sm flex items-center justify-between gap-1 md:gap-4">
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
                  href="/reset?action=unsafe&not-recommended">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>

          <div className="items-center p-6 flex flex-col space-y-4">
            <button
              className="inline-flex items-center justify-center text-xl font-medium border disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black  h-10 px-4 py-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              type="submit"
              disabled={loading}
              title="login">
              {!loading ? (
                "Login"
              ) : (
                <Loader className="animate-spin delay-1000" fill="gray-600" />
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
            <div className="flex items-center justify-between gap-2 xsm:gap-1 py-2 px-1 w-full ">
              <button
                className="rounded-md text-base font-medium  border  hover:bg-blue-600 hover:text-white  h-10 px-4 py-2 w-full flex justify-center items-center space-x-2"
                type="button"
                onClick={() => {
                  toast.info("Login with Google is not supported yet!");
                }}>
                <GoogleIcon />
                <span>Google</span>
              </button>
              <button
                className="rounded-md text-base font-medium  border  hover:bg-blue-600 hover:text-white  h-10 px-4 py-2 w-full flex justify-center items-center space-x-2"
                type="button"
                onClick={() => {
                  toast.info("Login with Facebook is not supported yet!");
                }}>
                <FacebookIcon />
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            prefetch
            className="text-blue-500 hover:underline border px-2 py-0.5 bg-white rounded-md"
            href="register">
            Register Here
          </Link>
        </div>
      </div>
    </form>
  );
}
