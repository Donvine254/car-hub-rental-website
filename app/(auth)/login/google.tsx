"use client";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { authenticateSSOLogin } from "@/lib/actions/user-actions/sso";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

type Props = {
  router: AppRouterInstance;
  origin_url: string;
};
const GoogleLoginButton = ({ router, origin_url }: Props) => {
  async function loginGoogleUsers(credential: string) {
    try {
      const response = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
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
            `/login/account_not_found?referrer=google&token=${credential}`
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
    <GoogleLogin
      size="large"
      onSuccess={(credentialResponse) => {
        if (credentialResponse.credential) {
          loginGoogleUsers(credentialResponse.credential);
        } else toast.error("Missing credential response.");
      }}
      onError={() => {
        toast.error("Something went wrong with Google Login.");
      }}
      containerProps={{
        style: {
          width: "100% !important",
          display: "flex !important",
          justifyContent: "center !important",
        },
      }}
    />
  );
};

export default GoogleLoginButton;

export function GoogleOneTapLogin({ session }: { session: any | null }) {
  const router = useRouter();
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
              `/login/account_not_found?action=login&token=${credentialResponse.credential}`
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

export const GoogleSignupButton = ({ router }: Pick<Props, "router">) => {
  return (
    <GoogleLogin
      size="large"
      text="signup_with"
      onSuccess={(credentialResponse) => {
        if (credentialResponse.credential) {
          router.replace(
            `/login/account_not_found?action=signup&token=${credentialResponse.credential}`
          );
        } else toast.error("Missing credential response.");
      }}
      onError={() => {
        toast.error("Something went wrong with Google Signup.");
      }}
      containerProps={{
        style: {
          width: "100% !important",
          display: "flex !important",
          justifyContent: "center !important",
        },
      }}
  />
  );
};
