"use client";
import React, { useState } from "react";
import { GoogleIcon, GithubIcon } from "@/assets";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Script from "next/script";
type Props = {};

interface FormData {
  username: string;
  email: string;
  password: string;
}
declare const confetti: any;

export default function Register({}: Props) {
  const [data, setData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
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
    if (
      !/^(?=.*[0-9])(?=.*[a-zA-Z])(?!12345678|password|abcdefgh).{9,}$/.test(
        data.password
      )
    ) {
      toast.error("Kindly use a strong password", {
        position: "bottom-center",
      });
      return false;
    }

    toast.info("Registration successful", {
      position: "top-center",
    });
    confetti({
      particleCount: 700,
      spread: 100,
      origin: { y: 0.3 },
    });
    setData({
      username: "",
      email: "",
      password: "",
    });
    router.replace("/");
  }

  return (
    <form
      className="w-full bg-gradient-to-r from-blue-100 to-cyan-200 py-5"
      onSubmit={handleSubmit}>
      <Script
        async
        defer
        src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 font-poppins">
        <div
          className="border text-card-foreground w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white"
          data-v0-t="card">
          <div className="flex flex-col space-y-1.5 px-6 py-4 font-poppins relative">
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
                onFocus={() =>
                  toast.info("Password must have letters and numbers")
                }
                required
                type={showPassword ? "text" : "password"}
              />
            </div>
            <div className="flex items-center justify-start gap-1 md:gap-4">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <span> {!showPassword ? "Show" : "Hide"} Password</span>
            </div>
          </div>

          <div className="items-center p-6 flex flex-col space-y-2">
            <button
              className="inline-flex items-center justify-center text-xl font-medium border disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black  h-10 px-4 py-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              type="submit"
              title="login">
              Register
            </button>
            {/* beginning of social logins */}
            <div className="flex items-center gap-2 w-full ">
              <hr className="border border-gray-200 w-full" />
              <div>OR</div>
              <hr className="border border-gray-200 w-full" />
            </div>

            <button
              className="rounded-md text-base font-medium  border  hover:bg-black hover:text-white  h-10 px-4 py-2 w-full flex justify-center items-center space-x-2"
              type="button"
              onClick={() => {
                toast.error("Google signup is not supported yet!");
              }}>
              <GoogleIcon />
              <span>Register with Google</span>
            </button>
            <button
              className="rounded-md text-base font-medium  border  hover:bg-black hover:text-white  h-10 px-4 py-2 w-full flex justify-center items-center space-x-2"
              type="button"
              onClick={() => {
                toast.error("Github Signup is not supported yet!");
              }}>
              <GithubIcon />
              <span>Register with Github</span>
            </button>
          </div>
        </div>
        <div className="mt-2 text-gray-600">
          Already have an account?{" "}
          <a
            className="text-blue-500 hover:underline border px-2 py-0.5 bg-white rounded-md"
            href="/login">
            Login Here
          </a>
        </div>
      </div>
    </form>
  );
}
