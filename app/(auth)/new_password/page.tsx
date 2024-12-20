"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordStrengthMeter from "./passwordmeter";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { resetPassword } from "@/lib/actions/user-actions/resetpassword";
import { decodeData } from "@/lib/utils/generatetoken";
import DialogComponent from "@/components/alerts/success-dialog";
type Props = {};
type formStatus = "" | "submitting" | "success" | "error";
export default function Reset({}: Props) {
  const [status, setStatus] = useState<formStatus>("");
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("t");
  const router = useRouter();
  // redirect if there is no token present or its invalid
  useEffect(() => {
    if (!token) {
      toast.error("Unauthorized Request", {
        position: "top-center",
      });
      setTimeout(() => router.push("/login"), 3000);
    } else {
      const data = decodeData(token);
      if (!data) {
        toast.error("Invalid or expired token", {
          position: "top-center",
        });
        setTimeout(() => router.push("/login"), 3000);
      }
    }
  }, [token, router]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "confirmPassword") {
      if (data.password !== value) {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    }
  };
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const response = await resetPassword(token!, data.password);
      if (response.success) {
        setIsOpen(true);
        setStatus("success");
        setTimeout(() => router.push("/login"), 3000);
      } else {
        toast.error(response.error || "Something went wrong");
        setStatus("error");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
      setStatus("error");
    }
  }
  return (
    <section className="w-full bg-[url('/hero-bg.jpg')] bg-center bg-no-repeat bg-cover">
      <div className="flex flex-col items-center justify-center w-full min-h-screen  px-4 md:px-6 font-crimson ">
        <div className="border bg-gray-50 w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden">
          <div className="flex gap-2 text-green-500 items-center justify-center py-1 mt-2">
            <hr className="border border-green-200 w-1/3" />
            <svg viewBox="0 0 24 24" fill="currentColor" height="60" width="60">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M18 8h2a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1h2V7a6 6 0 1112 0v1zm-2 0V7a4 4 0 10-8 0v1h8zm-5 6v2h2v-2h-2zm-4 0v2h2v-2H7zm8 0v2h2v-2h-2z" />
            </svg>
            <hr className="border border-green-200 w-1/3" />
          </div>
          {/* start of form */}
          <form onSubmit={handleSubmit}>
            <div className="px-6">
              <h3 className="font-semibold tracking-tight text-xl  text-center">
                Choose New Password
              </h3>
              <p className="text-sm xsm:text-[12px] my-1 text-center font-extralight">
                Almost done. Enter a new password and you&apos;re all set!
              </p>
              <div className="space-y-2">
                <label
                  className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                  htmlFor="password">
                  New Password
                </label>
                <input
                  className={`flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-[999] ${
                    error ? "border-red-500 bg-red-100" : ""
                  }`}
                  id="password"
                  name="password"
                  placeholder="*******"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$"
                  title="Password must contain at least one letter and one number, and be at least 8 characters long."
                  value={data.password}
                  disabled={status === "submitting"}
                  onChange={handleChange}
                  minLength={8}
                  required
                  type={showPassword ? "text" : "password"}
                />
              </div>
              <div className="space-y-1">
                <label
                  className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                  htmlFor="password">
                  Confirm Password
                </label>
                <input
                  className={`flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-[999] ${
                    error ? "border-red-500 bg-red-100" : ""
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="*******"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$"
                  title="Password must contain at least one letter and one number, and be at least 8 characters long."
                  value={data.confirmPassword}
                  minLength={8}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  required
                  type={showPassword ? "text" : "password"}
                />
              </div>
              <div className="flex items-center justify-between gap-2 my-1">
                <div className="flex items-center  gap-2">
                  <input
                    type="checkbox"
                    className="z-50"
                    checked={showPassword}
                    disabled={status === "submitting"}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <span> {showPassword ? "Hide" : "Show"} Password</span>
                </div>
              </div>
              <PasswordStrengthMeter password={data.password} />
              <div className="h-5 min-h-5 max-h-5 space-y-1">
                {error ? (
                  <p className="text-orange-600 inline-flex place-items-center items-center text-xs w-full gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="12"
                      width="12">
                      <path d="M11 7h2v7h-2zm0 8h2v2h-2z" />
                      <path d="M21.707 7.293l-5-5A.996.996 0 0016 2H8a.996.996 0 00-.707.293l-5 5A.996.996 0 002 8v8c0 .266.105.52.293.707l5 5A.996.996 0 008 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0022 16V8a.996.996 0 00-.293-.707zM20 15.586L15.586 20H8.414L4 15.586V8.414L8.414 4h7.172L20 8.414v7.172z" />
                    </svg>
                    <span>{error}</span>
                  </p>
                ) : (
                  data.confirmPassword !== "" &&
                  data.confirmPassword === data.password && (
                    <p className="text-green-500 inline-flex place-items-center items-center text-xs w-full gap-3">
                      <svg
                        fill="none"
                        viewBox="0 0 15 15"
                        height="12"
                        width="12">
                        <path
                          stroke="currentColor"
                          strokeLinecap="square"
                          d="M1 7l4.5 4.5L14 3"
                        />
                      </svg>
                      <span>Passwords match</span>
                    </p>
                  )
                )}
              </div>
              <button
                className="inline-flex items-center justify-center  disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black hover:bg-primary/90 px-4  w-full bg-green-500 text-white rounded-md h-10 py-1.5 mb-4 !z-50"
                type="submit"
                title="reset"
                disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <Loader
                    className="animate-spin text-green-500"
                    fill="#22C55E"
                  />
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
            <DialogComponent
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              title="Password Reset Successfully"
              description="Your new password has been updated successfully. Kindly proceed to login with your new password."
            />
          </form>
          <div className="px-6 text-base text-center py-2 bg-green-100 border-t-2 border-green-500 text-gray-500 ">
            Remember Password?{" "}
            <a className="text-blue-500 hover:underline " href="login">
              Login Here
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
