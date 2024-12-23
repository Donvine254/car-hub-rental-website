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
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        car: {
          select: {
            id: true,
            modelName: true,
            location: true,
            year: true,
            image: true,
          },
        },
        user: {
          select: {
            username: true,
            email: true,
            phone: true,
            image: true,
          },
        },
      },
    });
    return bookings as BookingWithCar[];
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch bookings");
  } finally {
    await prisma.$disconnect();
  }
}
async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        phone: true,
        createdAt: true,
        role: true,
        _count: {
          select: {
            bookings: true,
          },
        },
      },
    });
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch users");
  } finally {
    await prisma.$disconnect();
  }
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
  } finally {
    await prisma.$disconnect();
  }
}

async function getPopularCars() {
  try {
    const popularCars = await prisma.car.findMany({
      include: {
        _count: {
          select: { bookings: true },
        },
        bookings: { where: { status: { not: "cancelled" } } },
      },
      orderBy: {
        bookings: {
          _count: "desc",
        },
      },
      take: 5,
    });

    const carsWithRevenue = popularCars.map((car) => {
      const completedBookings = car.bookings.filter(
        (booking) => booking.status === "completed"
      );
      const totalRevenue = completedBookings.reduce(
        (sum, booking) => sum + booking.totalPrice,
        0
      );
      return {
        ...car,
        totalRevenue,
      };
    });
    return carsWithRevenue;
  } catch (error) {
    console.error("Error fetching popular cars:", error);
    throw new Error("Could not fetch popular cars");
  } finally {
    await prisma.$disconnect();
  }
}

export default async function Page({}: Props) {
  const stats = await getStats();
  const cars = (await fetchCars()) as Car[];
  const users = await getUsers();
  const bookings = (await getBookings()) as BookingWithCar[];
  const recentBookings = await getLatestBookings();
  const popularCars = await getPopularCars();
  return (
    <section>
      <AdminDashboard
        cars={cars}
        stats={stats}
        bookings={bookings}
        recentOrders={recentBookings}
        popularCars={popularCars}
        users={users}
      />
    </section>
  );
}
