import { prisma } from "@/db/prisma";
import fetchCars, { Car } from "@/lib/actions/car-actions/fetchCars";
import AdminDashboard from "./dashboardpage";
import type { Metadata } from "next";
import { BookingWithCar } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Car Hub - Admin Dashboard Page",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};

type Props = {};
interface Stats {
  totalCars: number;
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
}

async function getBookings() {
  const bookings = await prisma.booking.findMany({
    include: {
      car: {
        select: {
          id: true,
          modelName: true,
          image: true,
        },
      },
    },
  });
  return bookings as BookingWithCar[];
}
async function getUsers() {
  const users = await prisma.user.findMany();
  return users; // Returns an array of users
}

function calculateRevenue(bookings: BookingWithCar[]) {
  const totalRevenue = bookings.reduce(
    (acc, booking) => acc + (booking.totalPrice || 0),
    0
  );
  return totalRevenue;
}
async function getStats() {
  const cars = await fetchCars();
  const bookings = await getBookings();
  const users = await getUsers();

  const totalRevenue = calculateRevenue(bookings);
  const stats = {
    totalCars: cars?.length || 0,
    totalBookings: bookings.length,
    totalRevenue: totalRevenue,
    totalUsers: users.length,
  };

  return stats as Stats;
}

async function getLatestBookings() {
  try {
    const latestBookings = await prisma.booking.findMany({
      where: { status: { not: "cancelled" } },
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        car: {
          select: {
            modelName: true,
            image: true,
            location: true,
          },
        },
      },
    });

    return latestBookings;
  } catch (error) {
    console.error("Error fetching latest bookings:", error);
    return null;
  }
}

export default async function Page({}: Props) {
  const stats = await getStats();
  const cars = (await fetchCars()) as Car[];
  const bookings = (await getBookings()) as BookingWithCar[];
  const recentBookings = await getLatestBookings();
  return (
    <section>
      <AdminDashboard
        cars={cars}
        stats={stats}
        bookings={bookings}
        recentOrders={recentBookings}
      />
    </section>
  );
}
