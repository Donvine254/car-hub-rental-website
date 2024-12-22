import Image from "next/image";
import { formatISODate } from "@/lib/helpers";
import { Badge } from "../ui/badge";
import { CalendarClock, CheckCircle2 } from "lucide-react";
type Props = {
  recentBookings: [];
};
const RecentBookings = ({ recentBookings }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {recentBookings?.map((booking: any, index: number) => (
        <div
          key={index}
          className="flex items-center border shadow p-2 rounded-md bg-white relative">
          <Badge
            className="absolute top-1 sm:top-2 left-1 sm:left-auto sm:right-2 flex items-center gap-1"
            variant={
              booking.status === "completed"
                ? "success"
                : booking.status === "cancelled"
                ? "destructive"
                : "default"
            }>
            {booking.status === "scheduled" ? (
              <span className="">&#x1F552;</span>
            ) : booking.status === "completed" ? (
              <CheckCircle2 className=" h-4 w-4 " />
            ) : null}
            {booking.status}
          </Badge>
          <Image
            src={booking.car.image}
            alt={booking.car.modelName}
            height={90}
            width={160}
            className="rounded-md object-cover  border bg-green-500 "
          />
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none whitespace-nowrap">
              {booking.car.modelName}
            </p>
            <div className="flex items-center gap-1">
              <CalendarClock className="hidden md:flex text-green-500 h-4 w-4" />
              <p className="text-sm text-muted-foreground">
                {new Date(booking.startDate).toLocaleDateString()} to{" "}
                {new Date(booking.endDate).toLocaleDateString()}
              </p>
            </div>
            <p className="hidden md:block text-xs text-muted-foreground capitalize">
              Pickup: {booking.pickupLocation}; Drop: {booking.dropLocation}
            </p>
            <p
              className={`md:hidden ml-auto font-medium ${
                booking.status === "completed"
                  ? "text-green-500"
                  : "text-gray-600"
              }`}>
              +
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(booking.totalPrice)}
            </p>
          </div>
          <div
            className={`hidden md:block ml-auto font-medium ${
              booking.status === "completed"
                ? "text-green-500"
                : "text-gray-600"
            }`}>
            +
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(booking.totalPrice)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentBookings;
