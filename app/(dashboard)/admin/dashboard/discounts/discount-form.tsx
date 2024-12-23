"use client";

import { useState, FormEvent } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Car } from "@/lib/actions/car-actions/fetchCars";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function CreateDiscountForm({ cars }: { cars: Car[] }) {
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<string>("");
  const [applyToCar, setApplyToCar] = useState(false);
  const [limitToCustomer, setLimitToCustomer] = useState(false);
  const [hasMinAmount, setHasMinAmount] = useState(false);
  const [hasMaxAmount, setHasMaxAmount] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (applyToCar && !selectedCar) {
      toast.error("Kindly select a car to apply the discount to", {
        position: "top-right",
      });
      return false;
    }
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

    const validDiscount = Object.fromEntries(
      Object.entries(discount).filter(
        ([key, value]) => value !== null && !Number.isNaN(value)
      )
    );

    console.log(validDiscount);
  }
  const filteredCars = cars.filter((car) =>
    car.modelName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.toUpperCase();
            }}
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
            onCheckedChange={() => {
              setApplyToCar(!applyToCar);
              if (!applyToCar) {
                setSelectedCar("");
              }
            }}
            id="apply-to-car"
          />
          <Label htmlFor="apply-to-car">Apply to specific car</Label>
        </div>
        {applyToCar && (
          <div className="relative">
            <Button
              type="button"
              onClick={() => setOpen(!open)}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between">
              {selectedCar ? (
                <div className="flex items-center gap-1 justify-start">
                  <Image
                    src={
                      cars.find((car) => car.id.toString() === selectedCar)
                        ?.image || ""
                    }
                    width={50}
                    height={50}
                    className="object-contain rounded-md"
                    alt={
                      cars.find((car) => car.id.toString() === selectedCar)
                        ?.modelName || "Car image"
                    }
                  />
                  <p>
                    {
                      cars.find((car) => car.id.toString() === selectedCar)
                        ?.modelName
                    }{" "}
                    - $
                    {
                      cars.find((car) => car.id.toString() === selectedCar)
                        ?.pricePerDay
                    }{" "}
                    {""} per day.
                  </p>
                </div>
              ) : (
                "Select car..."
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>

            {open && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                <div className="p-2">
                  <div className="flex items-center px-3 py-2 border-b">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <input
                      type="text"
                      placeholder="Search cars..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full focus:outline-none"
                    />
                  </div>
                </div>
                <ul className="max-h-60 overflow-auto py-1">
                  {filteredCars.length > 0 ? (
                    filteredCars.map((car) => (
                      <li
                        key={car.id}
                        onClick={() => {
                          setSelectedCar(car.id.toString());
                          setOpen(false);
                          setSearchTerm("");
                        }}
                        className={cn(
                          "flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100",
                          selectedCar === car.id.toString()
                            ? "bg-green-100"
                            : ""
                        )}>
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 text-green-500",
                            selectedCar === car.id.toString()
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div className="flex items-center gap-1 justify-start">
                          {" "}
                          <Image
                            src={car.image}
                            width={50}
                            height={50}
                            className="object-contain rounded-md"
                            alt={car.modelName}
                          />{" "}
                          <p>
                            {car.modelName} - ${car.pricePerDay} per day.
                          </p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-gray-500">No cars found</li>
                  )}
                </ul>
              </div>
            )}
          </div>
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
              required={limitToCustomer}
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
              required={hasMinAmount}
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
              required={hasMaxAmount}
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
