"use client";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { GoogleIcon } from "@/assets";
import { authenticateSSOLogin } from "@/lib/actions/user-actions/sso";
import { useEffect, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getSession } from "@/lib/actions/session";
import { useRouter } from "next/navigation";

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
      const result = await authenticateSSOLogin(userInfo.email);
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

export function GoogleOneTapLogin() {
  const [session, setSession] = useState<any | null>(null);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session) {
        setSession(session);
      }
    })();
  }, []);

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const response = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${credentialResponse.credential}`
        );
        const userInfo = await response.json();
        const result = await authenticateSSOLogin(userInfo.email);
        if (result.success) {
          toast.success("Logged in successfully", {
            position: "bottom-center",
          });
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        } else {
          if (result.error === "User not found") {
            toast.error(result.error);
            router.replace(
              `/login/account_not_found?referrer=google&token=${credentialResponse.credential}`
            );
          }
          toast.error(result.error);
          return false;
        }
      } catch (error) {
        console.error("Login Failed:", error);
      }
    },
    onError: () => {
      console.error("Login Failed");
      if (typeof window !== "undefined") {
        document.cookie =
          "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    },
    disabled: session,
    promptMomentNotification: (notification) => {
      console.log("Prompt moment notification:", notification);
    },
    auto_select: true,
    use_fedcm_for_prompt: true,
  });

  return null;
}
