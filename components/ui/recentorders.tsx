import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookingWithCar } from "@/lib/utils";
import { formatISODate } from "@/lib/helpers";
import { NotFound } from "./notfound";
type Props = {
  orders: BookingWithCar[];
};

export function RecentOrders({ orders }: Props) {
  return (
    <div className="space-y-4 my-4">
      <h2 className="text-2xl font-bold tracking-tight">My Recent Orders</h2>
      <div className="rounded-md border bg-white">
        {orders && orders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Car Name</TableHead>
                <TableHead>Pick Up Location</TableHead>
                <TableHead>Drop Off Location</TableHead>
                <TableHead>Pick Up Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <Badge variant="default">#CR00{order.id}</Badge>
                  </TableCell>
                  <TableCell className="capitalize">
                    {order.car?.modelName}
                  </TableCell>
                  <TableCell className="capitalize">
                    {order.pickupLocation}
                  </TableCell>
                  <TableCell className="capitalize">
                    {order.dropLocation}
                  </TableCell>
                  <TableCell>
                    {formatISODate(order.startDate.toISOString())}
                  </TableCell>
                  <TableCell>
                    {formatISODate(order.endDate.toISOString())}
                  </TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <NotFound
            title="You have no booking history"
            description="The world of adventure is awaiting. Use the discount code WELCOME20 to enjoy 20% discount on your first booking."
          />
        )}
      </div>
    </div>
  );
}
