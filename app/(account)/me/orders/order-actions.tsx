"use client";

import { Button } from "@/components/ui/button";
import { Booking } from "@prisma/client";
import { HeartIcon, View, X } from "lucide-react";
import React from "react";
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
  function handleCancelOrder() {
    toast.success(`Cancelling order ${id}`);
  }

  return (
    <Button
      className="flex items-center gap-2 w-full justify-start"
      variant="ghost"
      onClick={handleCancelOrder}>
      <X className="text-red-500" /> <span>Cancel Order</span>
    </Button>
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
