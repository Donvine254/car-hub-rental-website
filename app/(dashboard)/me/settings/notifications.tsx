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
        <div className="flex flex-wrap gap-6 ">
          {/* Group 1 */}
          <div className="flex flex-col md:flex-row md:gap-6 w-full">
            <div className="flex items-center justify-between space-x-2 md:w-1/2">
              <div className="space-y-0.5">
                <Label htmlFor="discounts">New Discount Notification</Label>
                <p className="text-sm text-muted-foreground">
                  You&apos;ll get notification while new discount available.
                </p>
              </div>
              <Switch
                id="discounts"
                checked={notifications.discounts}
                onCheckedChange={() => handleSwitchChange("discounts")}
              />
            </div>
            <div className="flex items-center justify-between space-x-2 md:w-1/2">
              <div className="space-y-0.5">
                <Label htmlFor="newProducts">New Product Notification</Label>
                <p className="text-sm text-muted-foreground">
                  You&apos;ll get notification while new product available.
                </p>
              </div>
              <Switch
                id="newProducts"
                checked={notifications.newProducts}
                onCheckedChange={() => handleSwitchChange("newProducts")}
              />
            </div>
          </div>

          {/* Group 2 */}
          <div className="flex flex-col md:flex-row md:gap-6 w-full">
            <div className="flex items-center justify-between space-x-2 md:w-1/2">
              <div className="space-y-0.5">
                <Label htmlFor="dailyReports">Daily Reports</Label>
                <p className="text-sm text-muted-foreground">
                  We will send you a report everyday.
                </p>
              </div>
              <Switch
                id="dailyReports"
                checked={notifications.dailyReports}
                onCheckedChange={() => handleSwitchChange("dailyReports")}
              />
            </div>
            <div className="flex items-center justify-between space-x-2 md:w-1/2">
              <div className="space-y-0.5">
                <Label htmlFor="monthlyReports">Monthly Reports</Label>
                <p className="text-sm text-muted-foreground">
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
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 rounded-lg p-2 text-white">
          Update Notifications
        </button>
      </form>
    </div>
  );
}
