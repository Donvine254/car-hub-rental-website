"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Trash2,
  RefreshCcw,
  Search,
  Plus,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NotFound } from "../ui/notfound";

interface Discount {
  id: number;
  userId: number;
  code: string;
  percent: number;
  min_amount: number | null;
  max_amount: number | null;
  description: string;
  expiresAt: string;
  status: "valid" | "expired" | "used";
  createdAt: string;
  carId: number | null;
  user: {
    email: string;
  };
  Car: {
    modelName: string;
  } | null;
}

const statusColors = {
  valid: "success",
  expired: "destructive",
  used: "secondary",
};

// Mock data
const mockDiscounts: Discount[] = [
  {
    id: 1,
    userId: 1,
    code: "SUMMER2023",
    percent: 20,
    min_amount: 100,
    max_amount: 500,
    description: "Summer sale discount",
    expiresAt: "2023-08-31T23:59:59Z",
    status: "valid",
    createdAt: "2023-06-01T10:00:00Z",
    carId: null,
    user: { email: "user1@example.com" },
    Car: null,
  },
  {
    id: 2,
    userId: 2,
    code: "NEWUSER50",
    percent: 50,
    min_amount: null,
    max_amount: 200,
    description: "New user discount",
    expiresAt: "2023-12-31T23:59:59Z",
    status: "valid",
    createdAt: "2023-01-01T00:00:00Z",
    carId: null,
    user: { email: "user2@example.com" },
    Car: null,
  },
  {
    id: 3,
    userId: 3,
    code: "PREMIUM10",
    percent: 10,
    min_amount: 500,
    max_amount: null,
    description: "Premium car discount",
    expiresAt: "2023-09-30T23:59:59Z",
    status: "valid",
    createdAt: "2023-05-15T14:30:00Z",
    carId: 1,
    user: { email: "user3@example.com" },
    Car: { modelName: "Tesla Model S" },
  },
  {
    id: 4,
    userId: 4,
    code: "EXPIRED25",
    percent: 25,
    min_amount: 50,
    max_amount: 300,
    description: "Expired discount",
    expiresAt: "2023-05-31T23:59:59Z",
    status: "expired",
    createdAt: "2023-05-01T09:00:00Z",
    carId: null,
    user: { email: "user4@example.com" },
    Car: null,
  },
  {
    id: 5,
    userId: 5,
    code: "USED15",
    percent: 15,
    min_amount: null,
    max_amount: null,
    description: "One-time use discount",
    expiresAt: "2023-12-31T23:59:59Z",
    status: "used",
    createdAt: "2023-06-10T16:45:00Z",
    carId: null,
    user: { email: "user5@example.com" },
    Car: null,
  },
];

export function CouponsList() {
  const [discounts, setDiscounts] = useState<Discount[]>(mockDiscounts);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<Discount>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "code",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Code
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "percent",
      header: "Discount",
      cell: ({ row }) => `${row.original.percent}%`,
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "expiresAt",
      header: "Expires At",
      cell: ({ row }) => new Date(row.original.expiresAt).toLocaleDateString(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            statusColors[row.original.status] as
              | "success"
              | "destructive"
              | "secondary"
          }>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const discount = row.original;
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
                  <h4 className="font-medium leading-none">Actions</h4>
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
                            Discount Details
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Additional information about the discount.
                          </p>
                        </div>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <span className="text-sm font-medium">User:</span>
                            <span className="col-span-2 text-sm">
                              {discount.user.email}
                            </span>
                          </div>
                          {discount.Car && (
                            <div className="grid grid-cols-3 items-center gap-4">
                              <span className="text-sm font-medium">Car:</span>
                              <span className="col-span-2 text-sm">
                                {discount.Car.modelName}
                              </span>
                            </div>
                          )}
                          <div className="grid grid-cols-3 items-center gap-4">
                            <span className="text-sm font-medium">
                              Min Amount:
                            </span>
                            <span className="col-span-2 text-sm">
                              {discount.min_amount || "N/A"}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <span className="text-sm font-medium">
                              Max Amount:
                            </span>
                            <span className="col-span-2 text-sm">
                              {discount.max_amount || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Change Status
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        );
      },
    },
  ];

  const table = useReactTable({
    data: discounts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight">
          Manage Discounts
        </h2>
        <Link href="/admin/dashboard/discounts" passHref target="_blank">
          <Button
            variant="secondary"
            className="bg-green-500 xsm:text-xs text-white hover:bg-green-600">
            <Plus className="mr-2 h-4 w-4" /> Create New Coupon
          </Button>
        </Link>
      </div>
      <div className="relative">
        <Search className="absolute left-2 top-1/2 w-4 -translate-y-1/2 text-muted-foreground " />
        <Input
          placeholder="Search discounts..."
          value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("code")?.setFilterValue(event.target.value)
          }
          className="pl-8 focus:outline-none  focus:ring-1 focus:ring-green-500"
        />
      </div>

      <Table className="bg-white overflow-auto table-auto rounded-md">
        <TableHeader className="bg-green-500">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-white">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <NotFound
                  title="No results!"
                  description="No discounts match your search term"
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
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
  );
}
