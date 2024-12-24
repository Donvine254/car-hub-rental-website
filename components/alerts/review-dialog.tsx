"use client";
import { useState, useEffect, ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { CalendarClock, MapPinIcon, PenLine, StarIcon } from "lucide-react";

type DrawerProps = {
  booking: any | {};
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export function ReviewDrawerDialog({ booking, open, setOpen }: DrawerProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={cn(
          "w-6 h-6 cursor-pointer",
          index < rating ? "fill-yellow-400 stroke-yellow-400" : "text-gray-400"
        )}
        onClick={() => handleRatingClick(index + 1)}
      />
    ));
  };

  const ReviewForm = ({ className }: ComponentProps<"form">) => (
    <form className={cn("grid gap-4", className)}>
      <div className="flex items-center gap-2 border shadow p-2 rounded-md bg-white">
        <div
          className="rounded-md w-1/2 h-full bg-cover bg-center"
          style={{
            backgroundImage: `${booking.car.image}`,
          }}
        />
        <div className="flex flex-col space-y-1 divide-y divide-gray-200">
          <p className="text-sm font-medium leading-none whitespace-nowrap">
            Mini Cooper
          </p>
          <p className="flex items-center gap-1">
            <CalendarClock className=" text-green-500 h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              {new Date(booking.startDate).toLocaleDateString()} to{" "}
              {new Date(booking.endDate).toLocaleDateString()}
            </span>
          </p>
          <p className="text-xs text-muted-foreground capitalize inline-flex items-center gap-1">
            <MapPinIcon className="text-green-500 h-4 w-4" /> Pickup:{" "}
            {booking.pickupLocation}; Drop: {booking.dropLocation}
          </p>
          <p className="text-green-500">
            +
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(booking.totalPrice)}
          </p>
        </div>
      </div>
      <div>
        <h2 className=" text-center text-lg font-bold">
          Tell us about your experience
        </h2>
        <p className="text-muted-foreground text-sm">
          Please take a moment to rate and review...
        </p>
        <div className="flex gap-1 mt-2">{renderStars()}</div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="review">Your review</label>
        <textarea
          className="focus:outline-none focus:ring-1 focus:ring-green-500 rounded-lg p-2 border"
          rows={4}
          id="review"
          value={review}
          autoFocus
          onChange={(e) => setReview(e.target.value)}
          placeholder="Type your review..."
        />
      </div>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
          </DialogHeader>
          <ReviewForm />
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Leave a Review</DrawerTitle>
        </DrawerHeader>
        <ReviewForm className="px-4" />
        <DrawerFooter className="flex justify-between pt-4">
          <Button
            variant="outline"
            className="shadow border"
            onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white ">
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export const ReviewButton = ({ booking }: { booking: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button variant="ghost" className=" w-full justify-start">
        <PenLine className="mr-2 h-4 w-4" /> <span>Add Review</span>
      </Button>
      <ReviewDrawerDialog booking={booking} open={isOpen} setOpen={setIsOpen} />
    </div>
  );
};
