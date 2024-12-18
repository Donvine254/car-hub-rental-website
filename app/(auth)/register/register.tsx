"use client";
import React, { useState } from "react";
import { GoogleIcon, FacebookIcon } from "@/assets";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { toast } from "sonner";
import Script from "next/script";
import Axios from "axios";
import Link from "next/link";
import { PhoneInput } from "@/components/ui/phoneinput";
import { isValidPhoneNumber } from "react-phone-number-input";
import { GoogleSignupButton } from "../login/google";

type Props = {};
interface FormData {
  username: string;
  email: string;
  password: string;
  phone: string;
}
declare const confetti: any;

export default function Register({}: Props) {
  const [data, setData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
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
  function validateFormData(data: FormData): string | null {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      return "Invalid email address";
    }
    if (!isValidPhoneNumber(data.phone)) {
      return "Invalid phone number";
    }
    if (
      !/^(?=.*[0-9])(?=.*[a-zA-Z])(?!12345678|password|abcdefgh).{9,}$/.test(
        data.password
      )
    ) {
      return "Kindly use a strong password";
    }
    return null;
  }
  //function to handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    //check for errors in the form
    const errorMessage = validateFormData(data);
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
      });
      return false;
    }
    {
      setLoading(true);
      try {
        const response = await Axios.post("/api/register", data);
        const responseData = await response.data;
        setLoading(false);
        setAlert(true);
        confetti({
          particleCount: 700,
          spread: 100,
          origin: { y: 0.3 },
        });
        setData({
          username: "",
          email: "",
          password: "",
          phone: "",
        });
        // redirect users to verify their email address
        setTimeout(() => router.replace("/login"), 10000);
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        setData({
          username: "",
          email: "",
          password: "",
          phone: "",
        });
        toast.error(error?.response?.data?.error, {
          position: "bottom-center",
        });
      }
    }
  }

  async function loginWithGoogle() {
    return null;
  }

  return (
    <form
      className={`w-full bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70  ${
        !alert ? "py-3" : ""
      }`}
      onSubmit={handleSubmit}>
      <div
        className={`${
          alert
            ? "block bg-green-100  w-full text-center border-b-2 border-b-green-400 py-2 mb-2 font-bold"
            : "hidden"
        }`}>
        Kindly check your email to verify your account
      </div>
      <Script
        async
        defer
        src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-4">
        <div
          className="border text-card-foreground w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white"
          data-v0-t="card">
          <div className="flex flex-col space-y-1.5 px-6 py-4  relative">
            <h3 className="font-semibold tracking-tight text-2xl text-center">
              Get Started Today
            </h3>
            <p className="text-base  text-center">
              Sign up and unlock a world of possibilities!
            </p>
          </div>
          <div className="px-6 space-y-1">
            <div className="space-y-2 group">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="username">
                Username
              </label>
              <input
                className="flex h-10 bg-background text-base  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md "
                id="username"
                name="username"
                value={data.username}
                type="text"
                onChange={handleChange}
                autoComplete="new-username"
                minLength={5}
                pattern="^(?!.*@).*"
                title="Email addresses are not allowed as usernames."
                placeholder="john doe"
                required
              />
            </div>
            <div className="space-y-2 group">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="phone">
                Phone Number
              </label>
              <PhoneInput
                value={data.phone}
                defaultCountry="KE"
                placeholder="Enter phone number"
                onChange={(value) =>
                  setData((prev) => ({
                    ...prev,
                    phone: value,
                  }))
                }
                className="bg-white text-base focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 w-full border-red-500  rounded-md z-50"
              />
            </div>
            <div className="space-y-2 group">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="email">
                Email
              </label>
              <input
                className="flex h-10 bg-background text-base  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md "
                id="email"
                name="email"
                value={data.email}
                type="email"
                onChange={handleChange}
                title="Email address must be a valid email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 flex items-center justify-between"
                htmlFor="password">
                <span>Password</span>
                {!showPassword ? (
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    title="show password"
                    className="cursor-pointer">
                    <EyeIcon size={16} />
                  </span>
                ) : (
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    title="hide password"
                    className="cursor-pointer">
                    {" "}
                    <EyeOffIcon size={16} />
                  </span>
                )}
              </label>
              <input
                className="flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
                id="password"
                name="password"
                autoComplete="new-password"
                value={data.password}
                placeholder="*******"
                minLength={8}
                onChange={handleChange}
                required
                type={showPassword ? "text" : "password"}
              />
              <small className="text-gray-500 label">
                * Password must have letters and numbers
              </small>
            </div>
          </div>

          <div className="px-6 py-2">
            <button
              className="inline-flex items-center justify-center text-xl font-medium border disabled:pointer-events-none disabled:bg-green-50 disabled:text-black  h-10 px-4 py-2 w-full bg-green-500 hover:bg-green-600 text-white rounded-md"
              type="submit"
              disabled={loading}
              title="register">
              {!loading ? (
                "Register"
              ) : (
                <Loader
                  className="animate-spin text-green-500"
                  fill="#22C55E"
                />
              )}
            </button>
            {/* beginning of social logins */}
            <div className="flex items-center gap-2 w-full py-1">
              <hr className="border border-gray-200 w-full" />
              <div className="text-sm flex-1 w-fit whitespace-nowrap">Or</div>
              <hr className="border border-gray-200 w-full" />
            </div>
            <div className="pb-4 px-1 w-full ">
              <GoogleSignupButton router={router} />
            </div>
          </div>
        </div>
        <div className="mt-2 text-gray-600">
          Already have an account?{" "}
          <Link
            prefetch
            className="text-green-600 hover:underline border px-2 py-0.5 bg-white rounded-md"
            href="/login">
            Login Here
          </Link>
        </div>
      </div>
    </form>
  );
}
