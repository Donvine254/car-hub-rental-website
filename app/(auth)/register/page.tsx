"use client";
import React, { useState } from "react";
import { GoogleIcon, FacebookIcon } from "@/assets";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { toast } from "sonner";
import Script from "next/script";
import Axios from "axios";
import Link from "next/link";
import TurnstileComponent from "@/components/ui/turnstile";
import verifyTurnstileToken from "@/lib/actions/verifycaptcha";

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
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const isDev = process.env.NODE_ENV === "development";
  //function for onChange event handler
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //function to handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    //check for email validation
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      toast.error("Invalid email address", {
        position: "bottom-center",
      });
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
    if (
      !/^(?=.*[0-9])(?=.*[a-zA-Z])(?!12345678|password|abcdefgh).{9,}$/.test(
        data.password
      )
    ) {
      toast.error("Kindly use a strong password", {
        position: "bottom-center",
      });
      return false;
    } else {
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
              <input
                className="flex h-10 bg-background text-base  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md "
                id="phone"
                name="phone"
                value={data.phone}
                type="tel"
                pattern="0?[0-9]{9}"
                inputMode="numeric"
                onChange={handleChange}
                minLength={10}
                maxLength={10}
                title="valid phone number must have 10 digits."
                placeholder="**********"
                required
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

          <div className="items-center px-6 py-2 flex flex-col space-y-2">
            {!loading && !isDev && (
              <TurnstileComponent onVerify={(token) => setToken(token)} />
            )}
            <button
              className="inline-flex items-center justify-center text-xl font-medium border disabled:pointer-events-none disabled:bg-green-50 disabled:text-black  h-10 px-4 py-2 w-full bg-green-500 hover:bg-green-600 text-white rounded-md"
              type="submit"
              disabled={loading || !isDev ? !token : false}
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
            <div className="flex items-center gap-2 w-full ">
              <hr className="border border-gray-200 w-full" />
              <div className="text-sm flex-1 w-fit whitespace-nowrap">
                Or Register With
              </div>
              <hr className="border border-gray-200 w-full" />
            </div>
            <div className="flex items-center justify-between gap-2 xsm:gap-1 py-2 px-1 w-full ">
              <button
                className="rounded-md text-base font-medium  border  hover:bg-blue-600 hover:text-white   h-10 px-4 py-2 w-1/2 flex justify-center items-center space-x-2"
                type="button"
                onClick={loginWithGoogle}>
                <GoogleIcon />
                <span>Google</span>
              </button>
              <button
                className="rounded-md text-base font-medium  border  hover:bg-blue-600 hover:text-white  h-10 px-4 py-2 w-1/2 flex justify-center items-center space-x-2"
                type="button"
                onClick={() => {
                  toast.info("Facebook Signup is not supported yet!", {
                    style: {
                      backgroundColor: "#22C55E",
                      color: "#fff",
                    },
                  });
                }}>
                <FacebookIcon />
                <span>Facebook</span>
              </button>
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
