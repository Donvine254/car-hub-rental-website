import React from "react";
import { GoogleIcon, GithubIcon } from "@/assets";
type Props = {};

export default function page({}: Props) {
  return (
    <form className="w-full">
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
                type="email"
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
                placeholder="*******"
                minLength={8}
                required
                type="password"
              />
            </div>
            <div className="xsm:text-sm flex items-center justify-between gap-1 md:gap-4">
              {/* <div className="flex items-center justify-start gap-1 md:gap-4">
            <input
              type="checkbox"
              value={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span> {!showPassword ? "Show" : "Hide"} Password</span>
          </div> */}
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
              title="login">
              Sign In
            </button>
            {/* beginning of social logins */}
            <button
              className="rounded-md text-base font-medium  border  hover:bg-black hover:text-white  h-10 px-4 py-2 w-full flex justify-center items-center space-x-2"
              type="button">
              <GoogleIcon />
              <span>Sign in with Google</span>
            </button>
            <button
              className="rounded-md text-base font-medium  border  hover:bg-black hover:text-white  h-10 px-4 py-2 w-full flex justify-center items-center space-x-2"
              type="button">
              <GithubIcon />
              <span>Sign in with Github</span>
            </button>
          </div>
        </div>
        <div className="mt-2 text-gray-600">
          Not a member?{" "}
          <a
            className="text-blue-500 hover:underline border px-2 py-0.5"
            href="register">
            Register Here
          </a>
        </div>
      </div>
    </form>
  );
}
