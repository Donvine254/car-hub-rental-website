"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Receipt, TrendingUp, CarFront, CalendarCheck } from "lucide-react";
import RecentBookings from "./recent-bookings";

type Props = {
  recentBookings: [];
  stats: {
    totalCars: number;
    totalBookings: number;
    totalRevenue: number;
    totalUsers: number;
  };
};

export default function Overview({ recentBookings, stats }: Props) {
  return (
    <section>
      <div className="grid gap-4 md:grid-cols-2 ">
        {/* first card */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 className="text-sm font-medium">Total Revenue</h3>
            <Receipt className=" fill-green-500 stroke-white" size={32} />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl md:text-4xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(stats.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="text-green-500" /> +20.1% from last month
            </p>
          </div>
        </div>
        {/* second card */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 className="text-sm font-medium">Active Cars</h3>
            <CarFront className="text-green-500" size={32} />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl md:text-4xl font-bold">
              {stats.totalCars}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="text-green-500" /> +180.1% from last month
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 className="text-sm font-medium">Total Bookings</h3>
            <CalendarCheck className="text-green-500" size={32} />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl md:text-4xl font-bold">
              {stats.totalBookings}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="text-green-500" /> +9.1% from last month
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 className="text-sm font-medium">Active Customers</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-8 w-8 text-green-500">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl md:text-4xl font-bold">
              {stats.totalUsers}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="text-green-500" /> +2 from last month
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="mt-2 h-fit">
          <div className="flex flex-col space-y-1.5 py-2">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Revenue Overview
            </h3>
          </div>
          <div className="py-2">
            <RevenueChart />
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-2xl my-4 font-semibold leading-none tracking-tight">
            Recent Bookings
          </h3>
          <RecentBookings recentBookings={recentBookings} />
        </div>
      </div>
    </section>
  );
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Revenue",
      data: [
        5200, 4800, 6800, 7200, 6800, 7600, 8200, 8600, 9200, 8800, 9800, 9200,
      ],
      backgroundColor: "#010010",
      borderRadius: 5,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true },
  },
};

const RevenueChart = () => (
  <div style={{ height: 350 }}>
    <Bar data={data} options={options} />
  </div>
);
