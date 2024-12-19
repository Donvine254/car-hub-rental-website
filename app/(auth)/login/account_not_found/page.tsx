"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Mail, User, Phone, Loader } from "lucide-react";
import { PhoneInput } from "@/components/ui/phoneinput";
import { isValidPhoneNumber } from "react-phone-number-input";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Script from "next/script";
import { registerSSOUsers } from "@/lib/actions/user-actions/sso";

declare const confetti: any;
export default function GoogleSignupRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const action = searchParams.get("action");
  const token = searchParams.get("token");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    image: "",
    password: "",
    metadata: {},
  });
  useEffect(() => {
    if (action === "signup") {
      setShowForm(true);
    }
    (async () => {
      if (!token) {
        toast.error("Invalid token");
        setTimeout(() => {
          router.replace("/login");
        }, 1000);
        return;
      }

      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setFormData({
          ...formData,
          email: data.email,
          username: data.name,
          image: data.picture,
          password: data.sub,
          metadata: {
            provider: "google",
            emailVerified: data.email_verified,
            phoneVerified: false,
          },
        });
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        toast.error("Failed to fetch user info. Please try again.");
      }
    })();
    //eslint-disable-next-line;
  }, [action, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidPhoneNumber(formData.phone)) {
      toast.error(`Invalid phone number: ${formData.phone}`);
      return "Invalid phone number";
    }
    toast.info("Processing request..");
    setLoading(true);
    try {
      const response = await registerSSOUsers(formData);
      if (response.success) {
        setLoading(false);
        toast.success("Account registration successful!");
        confetti({
          particleCount: 700,
          spread: 100,
          origin: { y: 0.3 },
        });

        setTimeout(() => router.replace("/"), 1000);
      } else {
        setLoading(false);
        toast.error(response.error);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: "bottom-center",
      });
    }
  }

  return (
    <div className="min-h-screen bg-green-100 bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full transition-all duration-500 ease-in-out">
        {!showForm ? (
          <div className="text-center">
            <div className="flex justify-center mb-6 transition-transform duration-500 ease-in-out transform hover:scale-110">
              <AlertCircle className="text-yellow-500" size={64} />
            </div>
            <h1 className="text-2xl font-bold mb-4">
              Oops! We couldn&apos;t find your account
            </h1>
            <p className="text-gray-600 mb-6">
              It looks like you don&apos;t have an account linked to your Google
              profile yet. Would you like to create one using your Google
              information?
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-300">
              Create New Account
            </Button>
            <div className="flex items-center gap-2 w-full my-2 ">
              <hr className="border border-gray-200 w-full" />
              <div className="text-sm flex-1 w-fit whitespace-nowrap">Or</div>
              <hr className="border border-gray-200 w-full" />
            </div>
            <div className="flex items-center justify-center">
              {" "}
              <Link
                className="text-green-600 font-semibold border-green-500 bg-gray-100 hover:bg-green-500 hover:text-white border px-3 py-2 rounded-md w-full transition-colors duration-300 "
                href="/login">
                Login another way
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Script
              async
              defer
              src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
            <h2 className="text-2xl font-bold text-center mb-4">
              Get Started Today
            </h2>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="username"
                  name="username"
                  placeholder="John Doe"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="pl-10 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  readOnly
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 transition-all duration-300 ease-in-out focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <PhoneInput
                  value={formData.phone}
                  defaultCountry="KE"
                  placeholder="Enter phone number"
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: value,
                    }))
                  }
                  className="bg-white text-base focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 w-full border-red-500  rounded-md z-50"
                />
              </div>
            </div>
            <div className="inline-flex gap-1 items-center">
              <input
                type="checkbox"
                name="terms"
                required
                title="terms"
                className="z-50"
                aria-label="Agree to terms and conditions"
              />
              <label className="text-sm font-extralight">
                Agree with{" "}
                <Link
                  target="_blank"
                  href="/terms"
                  className="text-green-500 cursor-pointer hover:underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-300 disabled:bg-green-50 disabled:text-gray-500 disabled:cursor-not-allowed">
              {!loading ? (
                "Create Account"
              ) : (
                <Loader
                  className="animate-spin text-green-500"
                  fill="#22C55E"
                />
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
