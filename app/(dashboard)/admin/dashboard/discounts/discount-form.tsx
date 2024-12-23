"use client";

import { useState, FormEvent } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Car } from "@/lib/actions/car-actions/fetchCars";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <form onSubmit={onSubmit} className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="code">Discount Code</Label>
          <Input id="code" name="code" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="percent">Discount Percentage</Label>
          <Input
            id="percent"
            name="percent"
            type="number"
            min="0"
            max="100"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiresAt">Expiration Date</Label>
          <Input
            id="expiresAt"
            name="expiresAt"
            type="datetime-local"
            required
          />
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
                  {cars.map((car) => (
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
                  ))}
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
          <Label htmlFor="limit-customer">Limit to specific customer</Label>
        </div>

        {limitToCustomer && (
          <div className="space-y-2">
            <Label htmlFor="userEmail">Customer Email</Label>
            <Input
              id="userEmail"
              name="userEmail"
              type="email"
              placeholder="customer@example.com"
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="min-amount"
            checked={hasMinAmount}
            onChange={(e) => setHasMinAmount(e.target.checked)}
          />
          <Label htmlFor="min-amount">Limit minimum order value</Label>
        </div>

        {hasMinAmount && (
          <div className="space-y-2">
            <Label htmlFor="min_amount">Minimum Amount</Label>
            <Input
              id="min_amount"
              name="min_amount"
              type="number"
              min="0"
              placeholder="0"
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="max-amoun"
            checked={hasMaxAmount}
            onChange={(e) => setHasMaxAmount(e.target.checked)}
          />
          <Label htmlFor="max-amount">Limit maximum discount amount</Label>
        </div>

        {hasMaxAmount && (
          <div className="space-y-2">
            <Label htmlFor="max_amount">Maximum Amount</Label>
            <Input
              id="max_amount"
              name="max_amount"
              type="number"
              min="0"
              placeholder="0"
            />
          </div>
        )}

        <Button type="submit" className="w-full">
          Create Discount
        </Button>
      </form>
    </div>
  );
}
