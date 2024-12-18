"use client";

import { useEffect } from "react";
import { FacebookIcon } from "@/assets";
import { toast } from "sonner";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
declare const window: any; // To handle 'fbAsyncInit'
declare let FB: any; // For Facebook SDK object

interface FacebookLoginButtonProps {
  router: AppRouterInstance;
  origin_url?: string;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  origin_url = "/",
  router,
}) => {
  // Load Facebook SDK dynamically
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

      // Load the SDK script
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Handle Facebook Login
  const handleFacebookLogin = () => {
    toast.info("Processing request..");
    FB.login(
      (response: any) => {
        if (response.authResponse) {
          console.log("Facebook Login Successful:", response);
          fetchUserProfile(response.authResponse.accessToken);
        } else {
          console.error("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile" }
    );
  };

  const fetchUserProfile = (accessToken: string) => {
    FB.api(
      "/me",
      { fields: "id,name,email,picture", access_token: accessToken },
      (user: any) => {
        if (user) {
          console.log("Facebook User Data:", user);
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
      className="rounded-md text-base font-medium  border  hover:bg-blue-600 hover:text-white  h-10 px-4 py-2 w-full flex justify-center items-center space-x-2">
      <FacebookIcon />
      <span>Facebook</span>
    </button>
  );
};

export default FacebookLoginButton;
