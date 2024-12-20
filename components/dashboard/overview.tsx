"use client";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import RecentBookings from "./recent-bookings";

type Props = {};

export default function Overview({}: Props) {
  return (
    <div className="flex flex-col md:flex-row md:gap-4 md:justify-between py-6 relative">
      <div className="rounded-lg border bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70 text-card-foreground shadow-sm md:w-1/2">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Recent Bookings
          </h3>
        </div>
        <div className="p-6 pt-0">
          <RecentBookings />
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm  h-fit md:sticky md:top-12 md:w-1/2">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Revenue Overview
          </h3>
        </div>
        <div className="p-6 pt-0">
          {/* show chart */}
          <RevenueChart />
        </div>
      </div>
    </div>
  );
}

const RevenueChart = () => {
  const data = [
    { month: "Jan", revenue: 5200 },
    { month: "Feb", revenue: 4800 },
    { month: "Mar", revenue: 6800 },
    { month: "Apr", revenue: 7200 },
    { month: "May", revenue: 6800 },
    { month: "Jun", revenue: 7600 },
    { month: "Jul", revenue: 8200 },
    { month: "Aug", revenue: 8600 },
    { month: "Sep", revenue: 9200 },
    { month: "Oct", revenue: 8800 },
    { month: "Nov", revenue: 9800 },
    { month: "Dec", revenue: 9200 },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  );
};
