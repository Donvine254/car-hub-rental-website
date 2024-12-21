import Image from "next/image";
import { formatISODate } from "@/lib/helpers";
import { Badge } from "../ui/badge";
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
            className="absolute top-1 sm:top-2 left-1 sm:left-auto  sm:right-2"
            variant={
              booking.status === "completed"
                ? "success"
                : booking.status === "cancelled"
                ? "destructive"
                : "default"
            }>
            {booking.status}
          </Badge>
          <Image
            src={booking.car.image}
            alt={booking.car.modelName}
            height={90}
            width={160}
            className="rounded-md object-cover border bg-green-500 "
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
