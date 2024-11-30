"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { InfoIcon, MailIcon, MailCheck, MailX } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

type Props = {};
type VerificationStatus = "loading" | "success" | "error";
export default function VerificationPage({}: Props) {
  const [status, setStatus] = useState<VerificationStatus>("error");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  useEffect(() => {
    if (!token) {
      toast.error("No verification token provided");
      setTimeout(() => router.push("/login"), 3000);
    }
  }, [token, router]);

  return (
    <section className="flex flex-col items-center justify-center w-full min-h-screen px-4">
      <div
        className="border text-card-foreground w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white"
        data-v0-t="card">
        <div className="flex flex-col justify-center items-center p-4 gap-4 bg-gray-100">
          <Image width={118} height={18} src="/logo.svg" alt="carhub logo" />
          <p className="text-sm text-gray-600 text-center">
            Only one step left to become part of the carhub family. Hang on as
            we verify your email address.
          </p>
        </div>
        <div className="flex items-center justify-between w-full p-10 ">
          {/* first child */}
          <div className="h-20 w-20 rounded-full shadow shadow-gray-400 flex items-center justify-center">
            <MailIcon size={60} className="fill-green-500 stroke-white" />
          </div>
          {/* second child */}
          <div className="flex items-center flex-1 ">
            <hr className="border border-gray-500 border-dotted  w-full" />
            <div className="w-fit whitespace-nowrap ">
              {status === "error" ? (
                <svg viewBox="0 0 512 512" fill="none" height="30" width="30">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    stroke="white"
                    className="text-red-500"
                    d="M175 175c9.4-9.3 24.6-9.3 33.1 0l47 47.1L303 175c9.4-9.3 24.6-9.3 33.1 0 10.2 9.4 10.2 24.6 0 33.1l-46.2 47 46.2 47.9c10.2 9.4 10.2 24.6 0 33.1-8.5 10.2-23.7 10.2-33.1 0l-47.9-46.2-47 46.2c-8.5 10.2-23.7 10.2-33.1 0-9.3-8.5-9.3-23.7 0-33.1l47.1-47.9-47.1-47c-9.3-8.5-9.3-23.7 0-33.1zm337 81c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256zM256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"
                  />
                </svg>
              ) : (
                <svg fill="none" viewBox="0 0 15 15" height="30" width="30">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    stroke="white"
                    className="text-green-500"
                    d="M0 7.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm7.072 3.21l4.318-5.398-.78-.624-3.682 4.601L4.32 7.116l-.64.768 3.392 2.827z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <hr className="border border-gray-500 border-dotted w-full" />
          </div>
          {/* third child */}
          <div className="h-20 w-20 rounded-full p-2 bg-[#222222] shadow shadow-gray-400">
            {" "}
            <Image
              src="/logo.svg"
              height={50}
              width={50}
              alt="carhub"
              className="w-[95%] h-[95%] rounded-full italic"
              priority
            />
          </div>
        </div>
        {status === "loading" ? (
          <div className="flex flex-col items-center space-y-3 gap-2 p-6">
            <div className="loader"></div>
            <p>Verifying Email Address...</p>
          </div>
        ) : status === "success" ? (
          <div className="flex flex-col items-center space-y-3 gap-2 p-6">
            <MailCheck size="60" className="text-green-500" />
            <p>Verification successful!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3 gap-2 p-6">
            <MailX size="60" className=" text-red-500" />
            <p>Verification Failed!</p>
          </div>
        )}
        <div className="py-4 bg-green-500 flex items-center justify-center gap-2">
          <InfoIcon className="text-white" size={16} />
          <p className="text-center text-white text-sm">
            Have a question or trouble logging in?{" "}
            <a href="/help" className="underline hover:text-blue-600">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
