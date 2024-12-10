"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type NotificationType =
  | "discounts"
  | "newProducts"
  | "dailyReports"
  | "monthlyReports";
export default function NotificationsTab() {
  const [notifications, setNotifications] = useState<{
    discounts: boolean;
    newProducts: boolean;
    dailyReports: boolean;
    monthlyReports: boolean;
  }>({
    discounts: false,
    newProducts: false,
    dailyReports: false,
    monthlyReports: false,
  });
  const handleSwitchChange = (name: NotificationType) => {
    setNotifications((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Notifications updated:", notifications);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full">
          {/* Group 1 */}
          <div className="flex items-center justify-between space-x-2 bg-white shadow p-4 rounded-md border">
            <div className="space-y-4">
              <Label htmlFor="discounts" className="font-bold text-lg">
                New Discount Notification
              </Label>
              <p className="text-sm md:text-base text-muted-foreground">
                You&apos;ll get notification while new discount available.
              </p>
            </div>
            <Switch
              id="discounts"
              checked={notifications.discounts}
              onCheckedChange={() => handleSwitchChange("discounts")}
            />
          </div>
          <div className="flex items-center justify-between space-x-2  bg-white shadow p-4 rounded-md border">
            <div className="space-y-4">
              <Label htmlFor="newProducts" className="font-bold text-lg">
                New Product Notification
              </Label>
              <p className="text-sm md:text-base text-muted-foreground">
                You&apos;ll get notification while new product available.
              </p>
            </div>
            <Switch
              id="newProducts"
              checked={notifications.newProducts}
              onCheckedChange={() => handleSwitchChange("newProducts")}
            />
          </div>
          <div className="flex items-center justify-between space-x-2  bg-white shadow p-4 rounded-md border">
            <div className="space-y-4">
              <Label htmlFor="dailyReports" className="font-bold text-lg">
                Daily Reports
              </Label>
              <p className="text-sm md:text-base text-muted-foreground">
                We will send you a report everyday.
              </p>
            </div>
            <Switch
              id="dailyReports"
              checked={notifications.dailyReports}
              onCheckedChange={() => handleSwitchChange("dailyReports")}
            />
          </div>
          <div className="flex items-center justify-between space-x-2  bg-white shadow p-6 rounded-md border">
            <div className="space-y-4">
              <Label htmlFor="monthlyReports" className="font-bold text-lg">
                Monthly Reports
              </Label>
              <p className="text-sm md:text-base text-muted-foreground">
                We will send you a report each month.
              </p>
            </div>
            <Switch
              id="monthlyReports"
              checked={notifications.monthlyReports}
              onCheckedChange={() => handleSwitchChange("monthlyReports")}
            />
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 rounded-lg p-2 text-white xsm:w-full">
          Update Notifications
        </button>
      </form>
    </div>
  );
}
