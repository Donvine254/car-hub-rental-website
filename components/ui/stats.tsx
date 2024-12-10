import { BookingWithCar } from "@/lib/utils";
import { CalendarClock, CalendarX, Tag, CalendarCheck } from "lucide-react";

type Props = {
  orders: BookingWithCar[];
};

export function Stats({ orders }: Props) {
  const scheduledOrders = orders.filter(
    (order) => order.status === "scheduled"
  );
  const ongoingOrders = orders.filter((order) => order.status === "ongoing");

  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  );
  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled"
  );
  return (
    <div className="w-full grid xsm:grid-cols-1 grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-start flex-col space-y-3  mb-2 p-4">
          <CalendarClock className="h-12 w-12 text-green-500" />
          <h3 className="text-3xl lg:text-5xl font-bold ">
            {scheduledOrders.length === 0
              ? "00"
              : scheduledOrders.length < 10
              ? `0${scheduledOrders.length}`
              : scheduledOrders.length}
          </h3>
          <span className="text-base text-gray-500">Upcoming Orders</span>
        </div>
      </div>
      {/* coupons */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-start flex-col space-y-3  mb-2 p-4">
          <Tag className="h-12 w-12 text-green-500" />
          <h3 className="text-3xl lg:text-5xl font-bold ">02</h3>
          <span className="text-base text-gray-500">Available Coupons</span>
        </div>
      </div>
      {/* total orders */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-start flex-col space-y-3  mb-2 p-4">
          <CalendarCheck className="h-12 w-12 text-green-500" />
          <h3 className="text-3xl lg:text-5xl font-bold ">
            {orders.length === 0
              ? "00"
              : orders.length < 10
              ? `0${orders.length}`
              : orders.length}
          </h3>
          <span className="text-base text-gray-500">Total Orders</span>
        </div>
      </div>
      {/* cancelled orders */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-start flex-col space-y-3  mb-2 p-4">
          <CalendarX className="h-12 w-12 text-red-500" />
          <h3 className="text-3xl lg:text-5xl font-bold ">
            {cancelledOrders.length === 0
              ? "00"
              : cancelledOrders.length < 10
              ? `0${cancelledOrders.length}`
              : cancelledOrders.length}
          </h3>
          <span className="text-base text-gray-500">Cancelled Orders</span>
        </div>
      </div>
    </div>
  );
}
