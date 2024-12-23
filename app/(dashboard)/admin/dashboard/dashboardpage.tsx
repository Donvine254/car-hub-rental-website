"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car } from "@/lib/actions/car-actions/fetchCars";
import Overview from "@/components/dashboard/overview";
import { CarsList } from "@/components/dashboard/cars-table";
import { BookingsDataTable } from "@/components/dashboard/bookings-table";
import { UsersList } from "@/components/dashboard/users-table";
type Props = {
  cars: Car[];
  stats: {
    totalCars: number;
    totalBookings: number;
    totalRevenue: number;
    totalUsers: number;
  };
  bookings: any;
  recentOrders: any | [];
  popularCars: any | [];
  users: any | [];
};

export default function AdminDashboard({
  cars,
  stats,
  bookings,
  recentOrders,
  popularCars,
  users,
}: Props) {
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
        <Tabs
          defaultValue="Overview"
          className="w-full max-w-5xl mx-auto  p-2 md:my-2">
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
            <Overview
              recentBookings={recentOrders}
              stats={stats}
              popularCars={popularCars}
            />
          </TabsContent>
          <TabsContent value="Vehicles" className="mt-4 w-full">
            <CarsList vehicles={cars} />
          </TabsContent>
          <TabsContent value="Bookings" className="mt-4 w-full">
            <BookingsDataTable data={bookings} />
          </TabsContent>
          <TabsContent value="Coupons" className="mt-4 w-full">
            {/* show coupons data-table */}
          </TabsContent>
          <TabsContent value="Users" className="mt-4 w-full">
            <UsersList users={users}/>
          </TabsContent>
        </Tabs>
      </section>
    </section>
  );
}
