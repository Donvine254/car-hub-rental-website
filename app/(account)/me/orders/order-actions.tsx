"use client";
import React, { useEffect, useState } from "react";
import WarningDialog from "@/components/alerts/warning-dialog";
import { Button } from "@/components/ui/button";
import { UpdateOrderStatus } from "@/lib/actions/booking-actions";
import { Booking } from "@prisma/client";
import { HeartIcon, X } from "lucide-react";
import { toast } from "sonner";
import { addFavorite } from "@/lib/actions/car-actions/favorite";
import { isFavorite } from "@/lib/actions/car-actions";

type CancelButtonProps = {
  id: number;
  carId: number;
  endDate: string;
};
type BookingWithCar = Booking & {
  car?: {
    id: number;
    modelName: string;
  };
};

const cancellationReasons = [
  "Found a better deal",
  "Change in travel plans",
  "Booked by mistake",
  "Emergency or unforeseen circumstances",
  "Poor customer service",
  "The pickup or drop-off location is inconvenient",
  "The vehicle i wanted is unavailable or not in good condition",
  "The vehicle is different from what was advertised",
  "Vehicle no longer required",
  "Other",
];

async function sendCancellationReasonEmail(reason: string, orderId: number) {
  const message = `A user has requested to cancel order #CR00${orderId} for the following reason: ${reason}. Kindly note that this order has been cancelled automatically and no action is required from you`;
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: "c0376663-dd70-4ab4-ba1b-e849ba57eecc",
      message,
      from_name: "Carhub Kenya",
      subject: "A user has canceled a booking at carhubke.vercel.app.",
    }),
  });
}

export function CancelButton({ id, carId, endDate }: CancelButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  async function handleCancelOrder() {
    //add logic to check the deadline, this will ensure passing the startDate of the order
    if (!reason.trim()) {
      toast.error("Please provide a reason for cancelling your order.");
      return;
    }
    try {
      const res = await UpdateOrderStatus(id, "cancelled", carId);
      if (res.success) {
        toast.info("Your order has been cancelled", {
          position: "top-center",
        });
        sendCancellationReasonEmail(reason, id);
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
        className="w-full justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}>
        <X className="mr-2 h-4 w-4" /> <span>Cancel Order</span>
      </Button>
      <WarningDialog
        title="Are you sure you want to cancel this order?"
        description="Cancelling too many orders might affect your ability to pre-book vehicles without a security deposit. Kindly note orders must be cancelled 24hrs before the pickup time"
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        onConfirm={handleCancelOrder}
        disabled={!reason}>
        <div className="">
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option value="" hidden>
              Select reason for cancellation
            </option>
            {cancellationReasons.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </WarningDialog>
    </>
  );
}

export function FavoriteButton({
  carId,
  userId,
}: {
  carId: number;
  userId: number;
}) {
  const [isfavorited, setIsFavorited] = useState<boolean>(false);
  useEffect(() => {
    const checkReviewStatus = async () => {
      try {
        const res = await isFavorite(carId, userId);
        setIsFavorited(res);
      } catch (error) {
        console.error("Error checking review status:", error);
      }
    };

    checkReviewStatus();
  }, [carId, userId]);

  async function handleFavorite() {
    try {
      const res = await addFavorite(userId, carId);
      if (res.success) {
        toast.success("Car added to favorites", {
          position: "top-right",
        });
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Button
      className="w-full justify-start group"
      variant="ghost"
      disabled={isfavorited}
      onClick={handleFavorite}>
      <HeartIcon
        className={`group-hover:fill-red-600 group-hover:stroke-red-600 mr-2 h-4 w-4 ${
          isfavorited ? "fill-red-600 stroke-red-600" : ""
        }`}
      />
      <span>Add to Favorites</span>
    </Button>
  );
}
