"use client";

import { useState } from "react";
import { Booking as PrismaBooking } from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  X,
  AlarmClockPlus,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UpdateOrderStatus } from "@/lib/actions/booking-actions";
import { toast } from "sonner";

export interface Car {
  id: number;
  modelName: string;
  location: string;
  year: number;
  image: string;
}

export interface User {
  username: string;
  image: string;
  phone: string;
  email: string;
}

export interface Booking extends PrismaBooking {
  car: Car;
  user: User;
}

type Status = "cancelled" | "completed" | "ongoing" | "scheduled";

export function BookingsDataTable({ data }: { data: Booking[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full ">
      <h1 className="text-xl md:text-2xl font-bold my-1">Manage Bookings</h1>
      <select
        className="h-10 w-1/2 md:w-[180px] rounded-md border border-input bg-background px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 my-2"
        onChange={(e) =>
          table
            .getColumn("status")
            ?.setFilterValue(e.target.value === "all" ? "" : e.target.value)
        }>
        <option value="all">All Statuses</option>
        <option value="scheduled">Scheduled</option>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <div className="rounded-md border bg-white ">
        <Table className="rounded-md">
          <TableHeader className="bg-green-500 font-semibold">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

const StatusBadge = ({ status }: { status: Status }) => {
  const color = {
    cancelled: "destructive",
    completed: "success",
    ongoing: "outline",
    scheduled: "secondary",
  }[status];

  return (
    <Badge
      variant={color as any}
      className={status === "ongoing" ? "bg-blue-500 text-white" : ""}>
      {status}
    </Badge>
  );
};

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <Badge variant="outline">
        CR#{row.original.id.toString().padStart(5, "0")}
      </Badge>
    ),
  },
  {
    accessorKey: "car",
    header: "Car",
    cell: ({ row }) => (
      <div className="flex items-center space-x-3 xsm:min-w-[200px]">
        <Image
          src={row.original.car.image}
          alt={row.original.car.modelName}
          height={56.25}
          width={100}
          className="rounded-md object-cover border z-0"
        />

        <span className="capitalize font-semibold whitespace-nowrap ">
          {row.original.car.modelName}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => <div>{row.original.user.username}</div>,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{new Date(row.original.startDate).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => (
      <div>{new Date(row.original.endDate).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return (
        <div className="text-right text-green-600 font-medium">
          +{formatted}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      <Eye className="mr-2 h-4 w-4" />
                      View details
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Booking Details
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          View the details of booking CR#
                          {booking.id.toString().padStart(5, "0")}
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <span className="text-sm font-medium capitalize">
                            Pickup:
                          </span>
                          <span className="col-span-2 text-sm capitalize">
                            {booking.pickupLocation}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <span className="text-sm font-medium">Drop-off:</span>
                          <span className="col-span-2 text-sm capitalize">
                            {booking.dropLocation}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <span className="text-sm font-medium">Phone:</span>
                          <span className="col-span-2 text-sm">
                            {booking.phoneNumber}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <span className="text-sm font-medium">Email:</span>
                          <span className="col-span-2 text-sm">
                            {booking.user.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                {booking.status === "scheduled" && (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() =>
                        handleStatusUpdate(
                          booking.id,
                          "ongoing",
                          booking.car.id
                        )
                      }>
                      <AlarmClockPlus className="mr-2 h-4 w-4" />
                      Mark as ongoing
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() =>
                        handleStatusUpdate(
                          booking.id,
                          "cancelled",
                          booking.car.id
                        )
                      }>
                      <X className="mr-2 h-4 w-4" />
                      Cancel order
                    </Button>
                  </>
                )}

                {booking.status === "ongoing" && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-green-500 hover:text-white group"
                    onClick={() =>
                      handleStatusUpdate(
                        booking.id,
                        "completed",
                        booking.car.id
                      )
                    }>
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500 group-hover:text-white" />
                    Mark as completed
                  </Button>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    },
  },
];

async function handleStatusUpdate(id: number, status: any, carId: number) {
  try {
    const result = await UpdateOrderStatus(id, status, carId);
    if (result.success) {
      toast.success(result.message);
      if (typeof window !== undefined) {
        window.location.reload();
      }
    } else {
      toast.error(result.error);
    }
  } catch (error: any) {
    console.error(error);
    toast.error(error?.message || "something went wrong");
  }
}
