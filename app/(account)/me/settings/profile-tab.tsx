"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { UploadImage } from "./upload-image";
import { PhoneInput } from "@/components/ui/phoneinput";
import { toE164 } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import WarningDialog from "@/components/alerts/warning-dialog";
import { DeleteAccount } from "@/lib/actions/user-actions";
import { useRouter } from "next/navigation";

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
    phone: user.phone,
    currentPassword: "",
    newPassword: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  async function handleDeleteAccount() {
    toast.info("Processing request...", {
      position: "top-right",
    });
    try {
      const success = await DeleteAccount(user.id);
      toast.success(success.message);
      router.push("/api/logout");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Request failed");
    }
  }
  return (
    <div className="bg-white p-6 rounded-lg shadow">
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
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="*******"
                minLength={8}
                value={formData.currentPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2 md:w-1/2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="*******"
                minLength={8}
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Submit button */}
        <UploadImage image_url={user.image} />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-lg">
          Save Changes
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
