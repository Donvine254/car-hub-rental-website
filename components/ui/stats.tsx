import { CalendarClock, CalendarX, Tag, CalendarCheck } from "lucide-react";

export function Stats() {
  return (
    <div className="w-full grid xsm:grid-cols-1 grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-start flex-col space-y-3  mb-2 p-4">
          <CalendarClock className="h-12 w-12 text-green-500" />
          <h3 className="text-3xl lg:text-5xl font-bold ">01</h3>
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
          <h3 className="text-3xl lg:text-5xl font-bold ">58</h3>
          <span className="text-base text-gray-500">Total Orders</span>
        </div>
      </div>
      {/* cancelled orders */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-start flex-col space-y-3  mb-2 p-4">
          <CalendarX className="h-12 w-12 text-green-500" />
          <h3 className="text-3xl lg:text-5xl font-bold ">04</h3>
          <span className="text-base text-gray-500">Cancelled Orders</span>
        </div>
      </div>
    </div>
  );
}
