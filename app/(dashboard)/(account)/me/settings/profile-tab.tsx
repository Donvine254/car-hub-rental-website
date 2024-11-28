"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { UploadImage } from "./upload-image";

interface User {
  username: string;
  email: string;
  phone: string;
  image_url: string;
}

export default function ProfileTab({ user }: { user: User }) {
  const [formData, setFormData] = useState({
    username: user.username,
    phone: user.phone,
    currentPassword: "",
    newPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-6">
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
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                placeholder="+254701234567"
                onChange={handleInputChange}
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
        <UploadImage image_url={user.image_url} />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-lg">
          Update Profile
        </button>
      </form>
    </div>
  );
}
