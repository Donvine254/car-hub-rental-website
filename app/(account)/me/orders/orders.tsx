import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { NotFound } from "@/components/ui/notfound";
import { formatISODate } from "@/lib/helpers";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CancelButton, DetailsButton } from "./order-actions";
import { PenLine } from "lucide-react";
import Link from "next/link";
import { BookingWithCar } from "@/lib/utils";

type Props = {
  orders: BookingWithCar[];
};
export function Orders({ orders }: Props) {
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
    <div className="space-y-4 w-full">
      <div className="p-4 bg-white shadow rounded-md border">
        <Tabs defaultValue="scheduled" className="w-full">
          <TabsList className="flex justify-between gap-2 overflow-x-auto w-full   border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="scheduled"
              className="font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6 ">
              Scheduled
            </TabsTrigger>
            <TabsTrigger
              value="ongoing"
              className="font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6 ">
              Ongoing
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6 ">
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6 ">
              Cancelled
            </TabsTrigger>
          </TabsList>
          <TabsContent value="scheduled" className="mt-4 w-full">
            <div className="rounded-md border bg-white p-4">
              <h2 className="text-lg font-semibold mb-2">Scheduled Orders</h2>
              {scheduledOrders.length > 0 ? (
                <OrderComponent orders={scheduledOrders} />
              ) : (
                <NotFound
                  title="You have no scheduled orders"
                  description="You have no scheduled orders. Use the discount code WELCOME20 to enjoy 20% discount on your first booking."
                />
              )}
            </div>
          </TabsContent>
          <TabsContent value="ongoing" className="mt-4 w-full">
            <div className="rounded-md border bg-white p-4">
              <h2 className="text-lg font-semibold mb-2">Ongoing Orders</h2>
              {ongoingOrders.length > 0 ? (
                <OrderComponent orders={ongoingOrders} />
              ) : (
                <NotFound
                  title="You have no ongoing orders"
                  description="You have no ongoing orders. Your ongoing orders will appear here once they are in progress."
                />
              )}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="mt-4 w-full">
            <div className="rounded-md border bg-white p-4">
              <h2 className="text-lg font-semibold mb-2">Completed Orders</h2>
              {completedOrders.length > 0 ? (
                <OrderComponent orders={completedOrders} />
              ) : (
                <NotFound
                  title="You have no completed orders"
                  description="You have no completed orders. Use the discount code WELCOME20 to enjoy 20% discount on your first booking."
                />
              )}
            </div>
          </TabsContent>
          <TabsContent value="cancelled" className="mt-4 w-full">
            <div className="rounded-md border bg-white p-4">
              <h2 className="text-lg font-semibold mb-2">Cancelled Orders</h2>
              {cancelledOrders.length > 0 ? (
                <OrderComponent orders={cancelledOrders} />
              ) : (
                <NotFound
                  title="You have no cancelled orders"
                  description="You have no cancelled orders. Your cancelled orders will appear here. Kindly note orders must be cancelled 24hrs before pickup time."
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OrderComponent({ orders }: { orders: BookingWithCar[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Car Name</TableHead>
          <TableHead>Pickup Location</TableHead>
          <TableHead>Dropoff Location</TableHead>
          <TableHead>Pickup Date</TableHead>
          <TableHead>Return Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">
              <Badge variant="default">#CR00{order.id}</Badge>
            </TableCell>
            <TableCell className="capitalize">{order.car?.modelName}</TableCell>
            <TableCell className="capitalize">{order.pickupLocation}</TableCell>
            <TableCell className="capitalize">{order.dropLocation}</TableCell>
            <TableCell>
              {formatISODate(order.startDate.toISOString())}
            </TableCell>
            <TableCell>{formatISODate(order.endDate.toISOString())}</TableCell>
            <TableCell>
              <Badge
                variant={
                  order.status === "completed"
                    ? "success"
                    : order.status === "cancelled"
                    ? "destructive"
                    : "default"
                }>
                {order.status}
              </Badge>
            </TableCell>
            <TableCell>
              {(order.status === "scheduled" ||
                order.status === "completed") && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit p-2 border bg-white shadow rounded-md">
                    {order.status === "scheduled" && (
                      <CancelButton id={order.id} />
                    )}
                    <DetailsButton order={order} />
                    {order.status === "completed" && (
                      <Link
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground w-full justify-start h-10 px-4 py-2"
                        href={`/reviews/new?car_id=${order?.car?.id}`}>
                        <PenLine /> <span>Add Review</span>
                      </Link>
                    )}
                  </PopoverContent>
                </Popover>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
