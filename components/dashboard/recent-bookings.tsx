import Image from "next/image";
import { formatISODate } from "@/lib/helpers";
import { useState, useEffect } from "react";
import { getLatestBookings } from ".";

const RecentBookings = () => {
  const [recentBookings, setRecentBookings] = useState<any>([]);
  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getLatestBookings();
      if (data) {
        console.log("Latest bookings:", data);
        setRecentBookings(data);
      } else {
        console.log("Failed to fetch bookings.");
      }
    };

    fetchBookings();

    return () => {};
  }, []);

  return (
    <div className="space-y-8">
      {recentBookings?.map((booking: any, index: number) => (
        <div
          key={index}
          className="flex items-center border shadow p-2 rounded-md bg-white">
          <Image
            src={booking.car.image}
            alt={booking.car.modelName}
            height={90}
            width={160}
            className="rounded-md object-cover border "
          />
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none whitespace-nowrap">
              {booking.car.modelName}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatISODate(booking.startDate.toString())} to{" "}
              {formatISODate(booking.endDate.toString())}
            </p>
          </div>
          <div className="ml-auto font-medium">+${booking.totalPrice}</div>
        </div>
      ))}
    </div>
  );
};

export default RecentBookings;
