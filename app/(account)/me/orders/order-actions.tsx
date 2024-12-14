"use client";
import React, { useState } from "react";
import WarningDialog from "@/components/alerts/warning-dialog";
import { Button } from "@/components/ui/button";
import { UpdateOrderStatus } from "@/lib/actions/booking-actions";
import { Booking } from "@prisma/client";
import { HeartIcon, View, X } from "lucide-react";
import { toast } from "sonner";

type CancelButtonProps = {
  id: number;
};
type BookingWithCar = Booking & {
  car?: {
    id: number;
    modelName: string;
  };
};
type DetailsButtonProps = {
  order: BookingWithCar; // Correctly define the prop type
};

export function CancelButton({ id }: CancelButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  async function handleCancelOrder() {
    //add logic to check the deadline, this will ensure passing the startDate of the order
    try {
      const res = await UpdateOrderStatus(id, "cancelled");
      if (res.success) {
        toast.info("Your order has been cancelled", {
          position: "top-center",
        });
      } else {
        toast.error(res.error || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  }

  return (
    <>
      <Button
        className="flex items-center gap-2 w-full justify-start"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}>
        <X className="text-red-500" /> <span>Cancel Order</span>
      </Button>
      <WarningDialog
        title="Are you sure you want to cancel this order?"
        description="Cancelling too many orders might affect your ability to pre-book vehicles without a security deposit. Kindly note orders must be cancelled 24hrs before the pickup time"
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        onConfirm={handleCancelOrder}
      />
    </>
  );
}
export function DetailsButton({ order }: DetailsButtonProps) {
  function handleViewDetails() {
    //opens a details modal
    toast.info("Upcoming feature!");
    console.log(order);
  }

  return (
    <Button
      className="w-full flex items-center gap-2 justify-start"
      variant="ghost"
      onClick={handleViewDetails}>
      <View /> <span>View Details</span>
    </Button>
  );
}
export function FavoriteButton({ order }: DetailsButtonProps) {
  function handleFavorite() {
    //opens a details modal
    toast.info("Upcoming feature!");
  }

  return (
    <Button
      className="w-full flex items-center gap-2 justify-start group"
      variant="ghost"
      onClick={handleFavorite}>
      <HeartIcon className="group-hover:text-red-600" />
      <span>Add to Favorites</span>
    </Button>
  );
}
