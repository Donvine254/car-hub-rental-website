"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadImage } from "./upload-image";
import { PhoneInput } from "@/components/ui/phoneinput";
import { toE164 } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import WarningDialog from "@/components/alerts/warning-dialog";
import {
  DeleteAccount,
  UpdateAccountDetails,
} from "@/lib/actions/user-actions";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";

interface User {
  id: number;
  username: string;
  email: string;
  phone: number;
  role: string;
  image: string;
}

export default function ProfileTab({ user }: { user: User }) {
  const [formData, setFormData] = useState({
    username: user.username,
    image: user.image,
    phone: user.phone,
    currentPassword: "",
    newPassword: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (formData.currentPassword && !formData.newPassword) {
      toast.info(
        "If you wish to change your password, enter your new password."
      ),
        { position: "top-right" };
      setLoading(false);
      return false;
    }
    try {
      const updatedFields = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => {
          const originalValue = user[key as keyof typeof user];
          return value !== originalValue && value !== "";
        })
      ) as Partial<typeof formData>;

      if (Object.keys(updatedFields).length > 0) {
        const result = await UpdateAccountDetails({
          ...updatedFields,
          userId: user.id,
        });

        if (result.success) {
          toast.success("Account updated successfully");
          router.refresh();
        } else {
          toast.error(result.error);
        }
      } else {
        toast.error("No changes made");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating your account.");
    } finally {
      setLoading(false);
    }
  };

  async function handleDeleteAccount() {
    toast.info("Processing request...", {
      position: "top-right",
    });
    try {
      const success = await DeleteAccount(user.id, user.email, user.username);
      toast.success(success.message);
      router.push("/api/logout");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Request failed");
    }
  }
  const isModified = Object.entries(formData).some(
    ([key, value]) => value !== user[key as keyof typeof user] && value !== ""
  );

  return (
    <div className="bg-white md:p-6 md:rounded-lg md:shadow">
      <form onSubmit={handleSubmit} className="space-y-6 pb-2">
        {/* Responsive grouped inputs */}
        <div className="flex flex-wrap gap-6">
          {/* Group 1 */}
          <div className="flex flex-col md:flex-row md:gap-6 w-full">
            <div className="space-y-2 md:w-1/2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                autoFocus
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2 md:w-1/2">
              <Label htmlFor="phone">Phone Number</Label>
              <PhoneInput
                value={toE164(formData.phone)}
                defaultCountry="KE"
                placeholder="Enter phone number"
                onChange={(value) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    phone: value,
                  }))
                }
              />
            </div>
          </div>

          {/* Group 2 */}
          <div className="flex flex-col md:flex-row md:gap-6 w-full">
            <div className="space-y-2 md:w-1/2">
              <Label
                htmlFor="newPassword"
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 flex items-center justify-between">
                <span>Current Password</span>{" "}
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
              </Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                autoComplete="new-password"
                minLength={8}
                value={formData.currentPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2 md:w-1/2">
              <Label
                htmlFor="newPassword"
                className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 flex items-center justify-between">
                <span>New Password</span>{" "}
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
              </Label>
              <Input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                minLength={8}
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Submit button */}
        <UploadImage
          image_url={user.image}
          onImageUpload={(url: string) => {
            setFormData({ ...formData, image: url });
          }}
        />
        <button
          type="submit"
          disabled={!isModified || loading}
          className="inline-flex items-center justify-center text-lg font-medium border disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black  h-10 px-4 py-2 w-48 bg-green-500 hover:bg-green-600 text-white rounded-md">
          {!loading ? (
            "Save Changes"
          ) : (
            <Loader className="animate-spin text-green-500" fill="#22C55E" />
          )}
        </button>
      </form>
      <hr />
      <div className="py-2 space-y-3">
        <h2 className="text-xl md:text-2xl font-bold">Danger Zone</h2>
        <p>Irreversible and Destructive Actions</p>
        <div className="bg-red-50 border-2 border-red-500 rounded-md px-2 py-4 space-y-4 ">
          <h3 className="text-base md:text-xl font-bold xsm:text-center">
            Delete Account
          </h3>
          <hr className="border border-red-500" />
          <p>
            Once you delete your user account, there is no going back. Please be
            certain.
          </p>
          <Button
            title="delete user account"
            variant="destructive"
            className="xsm:w-full"
            onClick={() => setIsOpen(!isOpen)}>
            Delete Account
          </Button>
        </div>
      </div>
      <WarningDialog
        title="Deactivate Account"
        description="Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone."
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}
