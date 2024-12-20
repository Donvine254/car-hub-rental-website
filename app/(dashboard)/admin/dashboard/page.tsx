import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Receipt, TrendingUp, CarFront, CalendarCheck } from "lucide-react";
import Overview from "@/components/dashboard/overview";
type Props = {};

export default function AdminDashboard({}: Props) {
  return (
    <section>
      <div className="bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/v1732663821/illustrations/rbjvkffgkhbvn6mmjoxs.png')] bg-cover  bg-bottom bg-no-repeat">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Admin Dashboard
          </h1>
        </div>
      </div>
      <section className="bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70">
        <Tabs defaultValue="Overview" className="w-full max-w-5xl mx-auto  p-2">
          <TabsList className="flex justify-start gap-2 md:gap-4 overflow-x-auto w-full border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="Overview"
              className="font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6 ">
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="Vehicles"
              className="font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6 ">
              Vehicles
            </TabsTrigger>
            <TabsTrigger
              value="Bookings"
              className="font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6 ">
              Bookings
            </TabsTrigger>
            <TabsTrigger
              value="Coupons"
              className="font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6 ">
              Coupons
            </TabsTrigger>
            <TabsTrigger
              value="Users"
              className="font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6 ">
              Users
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Overview" className="mt-4 w-full">
            <div className="grid gap-4 md:grid-cols-2 ">
              {/* first card */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                  <h3 className="text-sm font-medium">Total Revenue</h3>
                  <Receipt className=" fill-green-500 stroke-white" size={32} />
                </div>
                <div className="p-6 pt-0">
                  <div className="text-2xl md:text-4xl font-bold">
                    $45,231.89
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="text-green-500" /> +20.1% from last
                    month
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
                  <div className="text-2xl md:text-4xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="text-green-500" /> +180.1% from last
                    month
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                  <h3 className="text-sm font-medium">Total Bookings</h3>
                  <CalendarCheck className="text-green-500" size={32} />
                </div>
                <div className="p-6 pt-0">
                  <div className="text-2xl md:text-4xl font-bold">12,234</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="text-green-500" /> +19.1% from last
                    month
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
                  <div className="text-2xl md:text-4xl font-bold">573</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="text-green-500" /> +200 from last
                    month
                  </p>
                </div>
              </div>
              {/* end of grid container */}
            </div>
            <Overview />
          </TabsContent>
          <TabsContent value="Vehicles" className="mt-4 w-full">
            {/* show vehicles datatable */}
          </TabsContent>
          <TabsContent value="Bookings" className="mt-4 w-full">
            {/* show bookings data table */}
          </TabsContent>
          <TabsContent value="Coupons" className="mt-4 w-full">
            {/* show coupons data-table */}
          </TabsContent>
          <TabsContent value="Users" className="mt-4 w-full">
            {/* show users data-table */}
          </TabsContent>
        </Tabs>
      </section>
    </section>
  );
}
