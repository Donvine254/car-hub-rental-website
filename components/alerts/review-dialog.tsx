"use client";
import { useState, useEffect, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { CalendarClock, MapPinIcon, PenLine, StarIcon } from "lucide-react";
import { toast } from "sonner";
import { Input } from "../ui/input";

type DrawerProps = {
  booking: any | {};
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
};
export function ReviewDrawerDialog({
  booking,
  open,
  setOpen,
  userId,
}: DrawerProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">
            Review modal
          </DialogDescription>
          <ReviewForm
            booking={booking}
            userId={userId}
            setOpen={setOpen}
            open={open}
          />
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
        <DrawerDescription className="sr-only">Review Modal</DrawerDescription>
        <ReviewForm
          booking={booking}
          userId={userId}
          setOpen={setOpen}
          open={open}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const ReviewForm = ({ userId, setOpen, booking }: DrawerProps) => {
  const [review, setReview] = useState({
    title: "",
    body: "",
    rating: 5,
    carId: booking.car.id,
    userId: userId,
  });

  const handleRatingClick = (value: number) => {
    setReview({ ...review, rating: value });
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={cn(
          "w-8 h-8 cursor-pointer border p-1",
          index < review.rating
            ? "fill-yellow-400 stroke-yellow-500"
            : "text-gray-400"
        )}
        onClick={() => handleRatingClick(index + 1)}
      />
    ));
  };
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.success("Thank you for your feedback", {
      position: "top-center",
    });
    setOpen(false);
    console.log(review);
  }
  return (
    <form
      className="grid gap-2 px-4 md:px-0 xsm:relative"
      onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 border shadow p-2 rounded-md bg-white">
        <div
          className="rounded-md w-1/2 h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              booking.car.image || "/vehicle-placeholder.png"
            })`,
          }}
        />
        <div className="flex flex-col space-y-1 divide-y divide-gray-200">
          <p className="text-sm font-medium leading-none whitespace-nowrap">
            {booking.car.modelName}
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
        <div className="space-y-1">
          <label htmlFor="review" className="block font-semibold">
            Review Title
          </label>
          <Input
            type="text"
            value={review.title}
            onChange={(e) => setReview({ ...review, title: e.target.value })}
            placeholder="Example: Fuel Efficiency"
            minLength={5}
            required
            className="focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="rating" className="block font-semibold">
            Overall Rating
          </label>
          <div className="flex gap-1">{renderStars()}</div>
          <small className="text-muted-foreground">Click to rate</small>
        </div>
        <div>
          <label htmlFor="recommend" className="block font-semibold">
            Would you recommend this car to a friend?
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Input
                type="radio"
                id="yes"
                name="recommend"
                value="yes"
                defaultChecked
                required
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="radio"
                id="no"
                name="recommend"
                value="no"
                required
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <label htmlFor="review" className="block  font-semibold">
          Your review
        </label>
        <textarea
          className="bg-white xsm:bg-green-100 rounded-md py-2 px-3 border border-gray-600 focus:ring-1 focus:outline-none focus:ring-green-500 min-h-[80px] w-full disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:z-50 focus-visible:ring-green-500 focus-visible:ring-2 xsm:focus:absolute xsm:focus:top-[50px] xsm:focus:left-0 xsm:focus:right-0 xsm:focus:max-w-[90%] xsm:focus:mx-4"
          id="review-body"
          name="review-body"
          rows={3}
          value={review.body}
          onChange={(e) => setReview({ ...review, body: e.target.value })}
          placeholder="Type your review..."
        />
      </div>
      <Button
        variant="secondary"
        disabled={!review}
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed border">
        Submit
      </Button>
    </form>
  );
};

export const ReviewButton = ({
  booking,
  userId,
}: {
  booking: any;
  userId: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={() => setIsOpen(!isOpen)}>
        <PenLine className="mr-2 h-4 w-4" /> <span>Add Review</span>
      </Button>
      <ReviewDrawerDialog
        booking={booking}
        open={isOpen}
        setOpen={setIsOpen}
        userId={userId}
      />
    </div>
  );
};
