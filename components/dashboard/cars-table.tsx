"use client";
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
import { ArrowUpDown, Loader, MoreHorizontal, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import fetchCars, { Car } from "@/lib/actions/car-actions/fetchCars";
export function CarsList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const data = (await fetchCars()) as Car[];
        setCars(data);
        setIsLoading(false);
      } catch (err) {
        setError("An error occurred while fetching cars");
        setIsLoading(false);
      }
    };

    fetchAllCars();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="loader-container">
          <div className="loading"></div>
          <p className="text-2xl mt-5 text-green-500 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <CarsDataTable data={cars} />;
}

const StatusBadge = ({ isRented }: { isRented: boolean }) => (
  <Badge variant={isRented ? "destructive" : "success"}>
    {isRented ? "Rented" : "Available"}
  </Badge>
);

export const columns: ColumnDef<Car>[] = [
  {
    accessorKey: "modelName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Model
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-3 ">
        <Image
          src={row.original.image}
          alt={row.getValue("modelName")}
          objectFit="cover"
          height={56.25}
          width={100}
          className="rounded-md border "
        />
        <span className="capitalize font-semibold">
          {row.getValue("modelName")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "pricePerDay",
    header: () => <div className="text-right">Price per Day</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("pricePerDay"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "transmissionType",
    header: "Transmission",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("transmissionType")}</div>
    ),
  },
  {
    accessorKey: "bodyType",
    header: "Body Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("bodyType")}</div>
    ),
  },
  {
    accessorKey: "isRented",
    header: "Status",
    cell: ({ row }) => <StatusBadge isRented={row.getValue("isRented")} />,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("location")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const car = row.original;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[200px]">
            <div>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => console.log("View details", car.id)}>
                View details
              </Button>
              <Link
                className="w-full inline-flex items-center justify-center  whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground  h-10 px-4 py-2"
                href={`/admin/dashboard/cars/${car.id}`}
                target="_blank">
                Update details
              </Link>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => console.log("Change status", car.id)}>
                Change status
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => console.log("Delete", car.id)}>
                Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      );
    },
  },
];

export function CarsDataTable({ data }: { data: Car[] }) {
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
    <div className="w-full">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="md:text-xl  font-semibold my-2 ">
          Manage Vehicle Fleet
        </h1>
        <div className="flex items-center gap-1 md:gap-2 lg:gap-4 my-1 ">
          <Link
            href="/admin/dashboard/cars"
            target="_blank"
            className="xsm:hidden p-2 bg-green-500 text-white  rounded-md border hover:text-white flex items-center shadow ">
            <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
              <path d="M17 11a1 1 0 010 2h-4v4a1 1 0 01-2 0v-4H7a1 1 0 010-2h4V7a1 1 0 012 0v4h4z" />
            </svg>
            <span>Add Car</span>
          </Link>
          <button className="p-2  rounded-md border hover:bg-gray-900 hover:text-white  flex items-center gap-1 shadow bg-white">
            <svg
              viewBox="0 0 640 512"
              fill="currentColor"
              height="24"
              width="24">
              <path d="M32 64C32 28.7 60.7 0 96 0h160v128c0 17.7 14.3 32 32 32h128v128H248c-13.3 0-24 10.7-24 24s10.7 24 24 24h168v112c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V64zm384 272v-48h110.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H416zm0-208H288V0l128 128z" />
            </svg>
            <span>Export CSV</span>
          </button>
        </div>
      </div>
      <div className="flex items-center relative justify-between py-4 w-full">
        <Input
          placeholder="Search by model name...."
          value={
            (table.getColumn("modelName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("modelName")?.setFilterValue(event.target.value)
          }
          className="w-full pl-10 text-base focus:ring-1 focus:ring-blue-500"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <select
          className="ml-4 h-10 w-[180px] rounded-md border border-input bg-background px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={(event) =>
            table
              .getColumn("isRented")
              ?.setFilterValue(
                event.target.value === "all" ? "" : event.target.value
              )
          }>
          <option value="all">All Statuses</option>
          <option value="false">Available</option>
          <option value="true">Rented</option>
        </select>
        <select
          className="ml-4 h-10 w-[180px] rounded-md border border-input bg-background px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={(event) =>
            table
              .getColumn("location")
              ?.setFilterValue(
                event.target.value === "all" ? "" : event.target.value
              )
          }>
          <option value="all">All Locations</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
          <option value="Houston">Houston</option>
        </select>
      </div>
      <div className="rounded-md overflow-x-auto border bg-white  shadow p-2">
        <Table>
          <TableHeader className="bg-[#f2f2f2] text-base font-semibold">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
