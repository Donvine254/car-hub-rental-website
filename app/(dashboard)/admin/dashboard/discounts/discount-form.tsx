"use client";

import { useState, FormEvent } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Car } from "@/lib/actions/car-actions/fetchCars";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CreateDiscountForm({ cars }: { cars: Car[] }) {
  console.log(cars);
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<string>("");
  const [applyToCar, setApplyToCar] = useState(false);
  const [limitToCustomer, setLimitToCustomer] = useState(false);
  const [hasMinAmount, setHasMinAmount] = useState(false);
  const [hasMaxAmount, setHasMaxAmount] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const discount = {
      code: formData.get("code"),
      percent: parseInt(formData.get("percent") as string),
      description: formData.get("description"),
      expiresAt: formData.get("expiresAt"),
      carId: applyToCar ? parseInt(selectedCar) : null,
      min_amount: hasMinAmount
        ? parseInt(formData.get("min_amount") as string)
        : null,
      max_amount: hasMaxAmount
        ? parseInt(formData.get("max_amount") as string)
        : null,
      userEmail: limitToCustomer ? formData.get("userEmail") : null,
    };

    console.log(discount);
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border shadow-md rounded-lg my-4">
      <div className="mb-6 bg-gray-100 w-full p-6 rounded-t-lg">
        <h2 className="text-2xl font-bold ">Create a Coupon</h2>
        <p>
          Coupons can be used to discount invoices, subscriptions, or entire
          customer accounts.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4 px-6 pt-2 pb-4">
        <div className="space-y-2">
          <Label htmlFor="code">Discount Code</Label>
          <Input
            id="code"
            name="code"
            placeholder="FIRST10"
            maxLength={20}
            minLength={5}
            className="focus:outline-none max-w-xs focus:ring-1 focus:ring-green-500"
            required
          />
          <small className="text-gray-600">
            This is the code customers will input to claim the discount. This
            code is case insensitive and must be unique.
          </small>
        </div>
        <div className="space-y-2">
          <Label htmlFor="percent">Discount Percentage</Label>
          <Input
            id="percent"
            name="percent"
            type="number"
            placeholder="Percentage off"
            min="0"
            max="100"
            className="focus:outline-none max-w-xs focus:ring-1 focus:ring-green-500"
            required
          />
          <small className="text-gray-600">
            This will be used to calculate total discount amount.
          </small>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            placeholder="First purchase discount"
            className="focus:outline-none max-w-sm focus:ring-1 focus:ring-green-500"
            required
          />
          <small className="text-gray-600">
            This will appear on customer&apos;s vouchers and receipts.
          </small>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiresAt">Expiration Date</Label>
          <Input
            id="expiresAt"
            name="expiresAt"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            defaultValue={new Date().toISOString().split("T")[0]}
            className="max-w-xs focus:outline-none focus:ring-1 focus:ring-green-500"
            required
          />
          <small className="text-gray-600">
            This will identify when the coupon will expire.
          </small>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={applyToCar}
            onCheckedChange={setApplyToCar}
            id="apply-to-car"
          />
          <Label htmlFor="apply-to-car">Apply to specific car</Label>
        </div>
        {applyToCar && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between">
                {selectedCar
                  ? cars.find((car) => car.id.toString() === selectedCar)
                      ?.modelName
                  : "Select car..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search cars..." />
                <CommandEmpty>No car found.</CommandEmpty>
                <CommandGroup className="max-h-60 overflow-auto">
                  {Array.isArray(cars) && cars.length > 0 ? (
                    cars.map((car) => (
                      <CommandItem
                        key={car.id}
                        value={car.id.toString()}
                        onSelect={(currentValue) => {
                          setSelectedCar(
                            currentValue === selectedCar ? "" : currentValue
                          );
                          setOpen(false);
                        }}>
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedCar === car.id.toString()
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {car.modelName} - ${car.pricePerDay}
                      </CommandItem>
                    ))
                  ) : (
                    <CommandEmpty>No cars available.</CommandEmpty>
                  )}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="limit-customer"
            checked={limitToCustomer}
            onChange={(e) => setLimitToCustomer(e.target.checked)}
          />
          <label
            htmlFor="limit-customer"
            className={`${limitToCustomer ? "font-bold" : "font-semibold"}`}>
            Limit to specific customer
          </label>
        </div>

        {limitToCustomer && (
          <div className="space-y-2 pl-6">
            <label htmlFor="userEmail">Customer Email</label>
            <Input
              id="userEmail"
              name="userEmail"
              type="email"
              className="max-w-xs focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="customer@example.com"
            />
            <small className="text-gray-600">
              Enter the email of the customer you wish to give the discount to.
              Can only apply to one customer.
            </small>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="min-amount"
            checked={hasMinAmount}
            onChange={(e) => setHasMinAmount(e.target.checked)}
          />
          <label
            htmlFor="min-amount"
            className={`${hasMinAmount ? "font-bold" : "font-semibold"}`}>
            Limit minimum order value
          </label>
        </div>

        {hasMinAmount && (
          <div className="space-y-2 pl-6">
            <label htmlFor="min_amount">Minimum Amount</label>
            <Input
              id="min_amount"
              name="min_amount"
              type="number"
              className="max-w-xs focus:outline-none focus:ring-1 focus:ring-green-500"
              min="0"
              placeholder="0"
            />
            <small className="text-gray-600">
              This is the minimum amount of purchase that the discount is
              applicable to.
            </small>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="max-amount"
            checked={hasMaxAmount}
            onChange={(e) => setHasMaxAmount(e.target.checked)}
          />
          <label
            htmlFor="max-amount"
            className={`${hasMaxAmount ? "font-bold" : "font-semibold"}`}>
            Limit maximum discount amount
          </label>
        </div>

        {hasMaxAmount && (
          <div className="space-y-2 pl-6">
            <label htmlFor="max_amount">Maximum Amount</label>
            <Input
              id="max_amount"
              name="max_amount"
              type="number"
              min="0"
              placeholder="0"
              className="max-w-xs focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <small className="text-gray-600">
              This is the maximum amount of discount that a customer can claim
            </small>
          </div>
        )}

        <div className="flex items-center justify-end gap-2">
          <Link href="/admin/dashboard" passHref>
            <Button
              type="reset"
              variant="ghost"
              className="border shadow hover:bg-destructive hover:text-destructive-foreground">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="bg-green-500 hover:bg-green-600">
            Create Coupon
          </Button>
        </div>
      </form>
    </div>
  );
}
