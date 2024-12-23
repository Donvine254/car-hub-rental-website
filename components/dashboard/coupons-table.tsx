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
  userId?: number | null;
  code: string;
  percent: number;
  min_amount?: number | null;
  max_amount?: number | null;
  description: string;
  expiresAt: string;
  status: "valid" | "expired" | "used";
  createdAt: string;
  carId?: number | null;
  user?: {} | any;
  Car?: {} | any;
}

const statusColors = {
  valid: "success",
  expired: "destructive",
  used: "secondary",
};

export function CouponsList({ discounts }: { discounts: Discount[] }) {
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
                            {discount.user && (
                              <>
                                <span className="text-sm font-medium">
                                  User:
                                </span>
                                <span className="col-span-2 text-sm">
                                  {discount.user?.email}
                                </span>
                              </>
                            )}
                          </div>
                          {discount.Car && (
                            <div className="grid grid-cols-3 items-center gap-4">
                              <span className="text-sm font-medium">Car:</span>
                              <span className="col-span-2 text-sm">
                                {discount.Car?.modelName}
                              </span>
                            </div>
                          )}
                          <div className="grid grid-cols-3 items-center gap-4">
                            {discount.min_amount && (
                              <>
                                <span className="text-sm font-medium">
                                  Min Purchase Amount:
                                </span>
                                <span className="col-span-2 text-sm">
                                  $ {discount.min_amount || "--"}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            {discount.max_amount && (
                              <>
                                <span className="text-sm font-medium">
                                  Max Amount:
                                </span>
                                <span className="col-span-2 text-sm">
                                  $ {discount.max_amount || "--"}
                                </span>
                              </>
                            )}
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
          {table?.getRowModel().rows?.length ? (
            table?.getRowModel().rows.map((row) => (
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
