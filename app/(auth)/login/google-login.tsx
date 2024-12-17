"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { GoogleIcon } from "@/assets";
import { authenticateGoogleLogin } from "@/lib/actions/user-actions/google-login";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
type Props = {
  router: AppRouterInstance;
  origin_url: string;
};
const GoogleLoginButton = ({ router, origin_url }: Props) => {
  const handleGoogleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: (tokenResponse) => {
      loginGoogleUsers(tokenResponse.access_token);
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      toast.error(error.error_description || "Something went wrong");
    },
  });
  async function loginGoogleUsers(access_token: string) {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const userInfo = await response.json();
      const result = await authenticateGoogleLogin(userInfo.email);
      if (result.success) {
        toast.success("Logged in successfully", {
          position: "bottom-center",
        });
        router.replace(origin_url);
      } else {
        if (result.error === "User not found") {
          toast.error(result.error);
          router.replace(
            `/login/account_not_found?referrer=google&token=${access_token}`
          );
        }
        toast.error(result.error);
        return false;
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "something went wrong");
    }
  }

  return (
    <button
      className="rounded-md text-base font-medium border hover:bg-gray-200 hover:text-black h-10 px-4 py-2 w-full flex justify-center items-center space-x-2"
      type="button"
      onClick={() => handleGoogleLogin()}>
      <GoogleIcon />
      <span>Google</span>
    </button>
  );
};

export default GoogleLoginButton;
