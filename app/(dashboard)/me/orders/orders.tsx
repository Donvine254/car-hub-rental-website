import { Order, orders } from "@/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function Orders() {
  const scheduledOrders = orders.filter(
    (order) => order.status === "scheduled"
  );
  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  );
  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled"
  );

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-white p-4">
        <h2 className="text-lg font-semibold mb-2">Scheduled Orders</h2>
        {scheduledOrders.length > 0 ? (
          <OrderComponent orders={scheduledOrders} />
        ) : (
          <p>No scheduled orders available.</p>
        )}
      </div>
      <div className="rounded-md border bg-white p-4">
        <h2 className="text-lg font-semibold mb-2">Completed Orders</h2>
        {completedOrders.length > 0 ? (
          <OrderComponent orders={completedOrders} />
        ) : (
          <p>No completed orders available.</p>
        )}
      </div>
      <div className="rounded-md border bg-white p-4">
        <h2 className="text-lg font-semibold mb-2">Cancelled Orders</h2>
        {cancelledOrders.length > 0 ? (
          <OrderComponent orders={cancelledOrders} />
        ) : (
          <p>No cancelled orders available.</p>
        )}
      </div>
    </div>
  );
}

function OrderComponent({ orders }: { orders: Order[] }) {
  return (
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
              <Badge variant="default">{order.id}</Badge>
            </TableCell>
            <TableCell>{order.car}</TableCell>
            <TableCell>{order.pickupLocation}</TableCell>
            <TableCell>{order.dropoffLocation}</TableCell>
            <TableCell>{order.pickupDate}</TableCell>
            <TableCell>{order.returnDate}</TableCell>
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
  );
}
