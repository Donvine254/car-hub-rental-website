"use client";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ChartOptions,
} from "chart.js";
import { Receipt, TrendingUp, CarFront, CalendarCheck } from "lucide-react";
import RecentBookings from "./recent-bookings";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Car } from "@prisma/client";
import { Badge } from "../ui/badge";
type Props = {
  recentBookings: [];
  stats: {
    totalCars: number;
    totalBookings: number;
    totalRevenue: number;
    totalUsers: number;
  };
  popularCars: [];
};

export default function Overview({
  recentBookings,
  stats,
  popularCars,
}: Props) {
  return (
    <section>
      <div className="grid gap-4 md:grid-cols-3 ">
        {/* first card */}
        <div className="rounded-lg border bg-gradient-to-tr from-green-300 to-blue-300 text-card-foreground shadow-sm">
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
        <div className="rounded-lg border bg-green-100 text-card-foreground shadow-sm">
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
        <div className="rounded-lg border bg-gradient-to-bl from-pink-300 to-green-300 text-card-foreground shadow-sm ">
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
        {/* <div className="rounded-lg border bg-gradient-to-br from-green-300 to-[#AAC9FF] text-card-foreground shadow-sm">
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
        </div> */}
      </div>
      <div className="flex flex-col gap-4">
        <div className="mt-2 h-fit">
          <div className="flex flex-col space-y-1.5 py-2">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Analytics
            </h3>
          </div>
          <div className="py-2 flex items-center justify-between gap-4 w-full divide-x-2">
            <RevenueChart />
            <VisitorsChart />
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-2xl my-4 font-semibold leading-none tracking-tight">
            Recent Bookings
          </h3>
          <RecentBookings recentBookings={recentBookings} />
        </div>
        <div className="w-full">
          <h3 className="text-2xl my-4 font-semibold leading-none tracking-tight">
            Popular Cars ✨✨
          </h3>
          <div className="rounded-md overflow-x-auto">
            <Table className="w-full table-auto ">
              <TableHeader className=" bg-green-100 ">
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Body</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {popularCars.map((car: Car, index: number) => (
                  <TableRow key={car.id} className="bg-white">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3 xsm:mx-2">
                        <Image
                          src={car.image}
                          alt={car.modelName}
                          height={56.25}
                          width={100}
                          className="rounded-md object-cover border z-0"
                        />
                        <span className="capitalize font-semibold whitespace-nowrap ">
                          {car.modelName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize ">
                      {car.bodyType}
                    </TableCell>
                    <TableCell className="capitalize ">{car.year}</TableCell>
                    <TableCell className="capitalize ">
                      <Badge variant="default">${car.pricePerDay}</Badge>
                    </TableCell>
                    <TableCell className="capitalize ">
                      {car.location}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
  LineElement,
  PointElement,
  Legend
);
const currentMonth = "Dec";
const lowerValueThreshold = 7000;
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
      backgroundColor: function (context: any) {
        const value = context.raw as number;
        const label = context.chart.data.labels?.[context.dataIndex] as string;
        if (label === currentMonth) {
          return "#1f2937";
        }
        return value < lowerValueThreshold ? "#d1d5db" : "#6b7280";
      },
      borderRadius: 5,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
  },
  scales: {
    x: { grid: { display: false } },
    y: {
      beginAtZero: false,
      ticks: {
        callback: function (value: any) {
          return `$${value.toLocaleString()}`;
        },
      },
    },
  },
};

const RevenueChart = () => (
  <div style={{ height: 350 }} className="w-full md:w-1/2">
    <Bar data={data} options={options} />
  </div>
);

const visitorsData = {
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
      label: "Site Visitors",
      data: [
        1200, 1900, 3000, 5000, 2500, 4100, 4700, 5600, 6200, 7800, 8000, 9200,
      ],
      borderColor: "#22c55e",
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#16a34a",
      pointBorderColor: "#16a34a",
      pointHoverBackgroundColor: "#14532d",
      pointHoverBorderColor: "#14532d",
    },
  ],
};

const visitorsOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};

const VisitorsChart = () => (
  <div style={{ height: 350 }} className="w-full md:w-1/2">
    <Line data={visitorsData} options={visitorsOptions} />
  </div>
);
