"use client";
import { FacebookIcon } from "@/assets";
import { toast } from "sonner";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { authenticateSSOLogin } from "@/lib/actions/user-actions/sso";
import { useEffect } from "react";
declare const window: any; // To handle 'fbAsyncInit'
declare let FB: any; // For Facebook SDK object
interface FacebookLoginButtonProps {
  router: AppRouterInstance;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  router,
}) => {
  // Handle Facebook Login
  useEffect(() => {
    if (!window.FB) {
      window.fbAsyncInit = function () {
        FB.init({
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: false,
          version: "v19.0",
        });
      };
    }
  });
  const handleFacebookLogin = () => {
    toast.info("Processing request...");
    FB.login(
      (response: any) => {
        if (response.authResponse) {
          console.log("Facebook Login Successful:", response);
          fetchUserProfile(response.authResponse.accessToken);
        } else {
          console.error("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" } // Add email scope to retrieve email
    );
  };

  const fetchUserProfile = async (accessToken: string) => {
    FB.api(
      "/me",
      { fields: "id,name,email,picture", access_token: accessToken },
      async (user: any) => {
        if (user) {
          console.log("Facebook User Data:", user);
          if (!user.email) {
            toast.error("Your Facebook account cannot be used to login.");
            return false;
          } else {
            const result = await authenticateSSOLogin(user.email);
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
                  `/login/account_not_found?referrer=facebook&token=${accessToken}`
                );
              }
              toast.error(result.error);
              return false;
            }
          }
        } else {
          console.error("Failed to retrieve user profile data.");
        }
      }
    );
  };

  return (
    <button
      type="button"
      onClick={handleFacebookLogin}
      className="rounded-md text-base font-medium border hover:bg-blue-600 hover:text-white h-10 px-4 py-2 w-full flex justify-center items-center space-x-2">
      <FacebookIcon />
      <span>Facebook</span>
    </button>
  );
};

export default FacebookLoginButton;
