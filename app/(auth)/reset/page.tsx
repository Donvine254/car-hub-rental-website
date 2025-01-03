"use client";
import { useState } from "react";
import { Loader, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handleResetPassword } from "@/lib/actions/user-actions/resetpassword";
import TurnstileComponent from "@/components/ui/turnstile";
import verifyTurnstileToken from "@/lib/actions/verifycaptcha";
import DialogComponent from "@/components/alerts/success-dialog";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();
  //
  const isDev = process.env.NODE_ENV === "development";
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      toast.error("Invalid email address", {
        position: "bottom-center",
      });
      setLoading(false);
      return false;
    }
    //verify captcha first
    if (!isDev) {
      const result = await verifyTurnstileToken(token);
      if (!result) {
        toast.error("Failed to validate captcha");
        setLoading(false);
        return false;
      }
    }

    try {
      const response = await handleResetPassword(email);
      if (response.success) {
        setIsOpen(true);
        setLoading(false);
        setTimeout(() => {
          router.push("/login");
        }, 4000);
      } else {
        toast.error(response.error, {
          position: "top-center",
        });
        setLoading(false);
      }
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
                className="w-full px-4 pl-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
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
            {!loading && !isDev && (
              <TurnstileComponent onVerify={(token) => setToken(token)} />
            )}
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition duration-200 ease-in-out disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black "
              disabled={loading || !isDev ? !token : false}>
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
              This page is protected by Cloudflare, and subject to the
              Cloudflare{" "}
              <Link
                href="https://www.cloudflare.com/privacypolicy"
                className="text-emerald-600 hover:text-emerald-700">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="https://www.cloudflare.com/website-terms"
                className="text-emerald-600 hover:text-emerald-700">
                Terms of Service
              </Link>
              .
            </p>
            <DialogComponent
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              title="Email Sent Successfully"
              description={`We have sent password reset instructions to ${email}. Kindly check your email to reset your password.`}
            />
          </form>
        </div>

        <p className="text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-emerald-600 hover:text-emerald-700 font-medium">
            Get started
          </Link>
        </p>
      </div>
    </main>
  );
}
