"use client";
import { useState } from "react";
import { Loader, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handleResetPassword } from "@/lib/resetpassword";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await handleResetPassword(email);
      toast.success(response);
      setLoading(false);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
      });
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70 ">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo.svg"
            alt="CarHub Logo"
            width={118}
            height={18}
            className="object-contain"
            priority
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">
              Reset Your Password
            </h1>
            <p className="text-gray-600 mb-6">
              In order to get instructions to reset your password, please enter
              your email address associated with your CarHub account
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 pl-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 disabled:cursor-not-allowed disabled:opacity-50 "
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid email address"
                disabled={loading}
                autoFocus
                required
              />
              <MailIcon
                className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
            {/* <div className="">
              {error ? (
                <p className="text-orange-600 text-sm  ">
                  <span>{error}</span>
                </p>
              ) : null}
            </div> */}
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition duration-200 ease-in-out disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black "
              disabled={loading}>
              {!loading ? (
                "Send Reset Email"
              ) : (
                <Loader
                  className="animate-spin text-green-500"
                  fill="#22C55E"
                />
              )}
            </button>
            <p className="text-sm text-center text-gray-500">
              This page is protected by reCAPTCHA, and subject to the Google{" "}
              <Link
                href="https://policies.google.com/privacy"
                className="text-emerald-600 hover:text-emerald-700">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="https://policies.google.com/terms"
                className="text-emerald-600 hover:text-emerald-700">
                Terms of Service
              </Link>
              .
            </p>
          </form>
        </div>

        <p className="text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-emerald-600 hover:text-emerald-700 font-medium">
            Get started
          </Link>
        </p>
      </div>
    </main>
  );
}
