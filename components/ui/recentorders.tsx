import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const orders = [
  {
    id: "#01236",
    car: "Jeep Renegade",
    pickupLocation: "Nairobi",
    dropoffLocation: "Eldoret",
    pickupDate: "March 2, 2023",
    returnDate: "March 10, 2023",
    status: "completed",
  },
  {
    id: "#01263",
    car: "Mini Cooper",
    pickupLocation: "Kisumu",
    dropoffLocation: "Nairobi",
    pickupDate: "March 8, 2023",
    returnDate: "March 10, 2023",
    status: "cancelled",
  },
  {
    id: "#01245",
    car: "Ferrari Enzo",
    pickupLocation: "Mombasa",
    dropoffLocation: "Nairobi",
    pickupDate: "March 6, 2023",
    returnDate: "March 10, 2023",
    status: "scheduled",
  },
  {
    id: "#01287",
    car: "Hyundai Staria",
    pickupLocation: "Eldoret",
    dropoffLocation: "Thika",
    pickupDate: "March 13, 2023",
    returnDate: "March 10, 2023",
    status: "completed",
  },
  {
    id: "#01216",
    car: "Toyota Rav 4",
    pickupLocation: "Thika",
    dropoffLocation: "Kisumu",
    pickupDate: "March 7, 2023",
    returnDate: "March 10, 2023",
    status: "scheduled",
  },
];

export function RecentOrders() {
  return (
    <div className="space-y-4 my-4">
      <h2 className="text-2xl font-bold tracking-tight">My Recent Orders</h2>
      <div className="rounded-md border bg-white">
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
      </div>
    </div>
  );
}
