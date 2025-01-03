"use client";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CalendarClock, MapPinIcon, PenLine, StarIcon } from "lucide-react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { addCarReview, isReviewed } from "@/lib/actions/car-actions";

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
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] xsm:px-2">
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">Review modal</DialogDescription>
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

const ReviewForm = ({ userId, setOpen, booking }: DrawerProps) => {
  const [review, setReview] = useState({
    title: "",
    body: "",
    rating: 5,
    carId: booking.car.id,
    userId: userId,
    recommend: true,
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
  const handleRecommendChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "yes";
    setReview((prev) => ({ ...prev, recommend: value }));
  };
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await addCarReview(review);
      if (response.success) {
        toast.success("Thank you for your feedback", {
          position: "top-center",
        });
        setOpen(false);
      } else {
        toast.error(response.error, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  }
  return (
    <form className="grid gap-2" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 border shadow p-2 rounded-md bg-white">
        <div
          className="rounded-md flex-1 h-full bg-cover bg-center"
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
                defaultChecked={review.recommend}
                onChange={handleRecommendChange}
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
                defaultChecked={!review.recommend}
                onChange={handleRecommendChange}
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
          className="w-full rounded-md bg-white px-3 py-2 border border-gray-600 focus:ring-1 focus:outline-none focus:ring-green-500 min-h-[80px]"
          id="review-body"
          name="review-body"
          maxLength={250}
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
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  useEffect(() => {
    const checkReviewStatus = async () => {
      try {
        const res = await isReviewed(booking.car.id, userId);
        setHasReviewed(res);
      } catch (error) {
        console.error("Error checking review status:", error);
      }
    };

    checkReviewStatus();
  }, [userId, booking]);
  return (
    <div>
      <Button
        variant="ghost"
        disabled={hasReviewed}
        className="w-full justify-start"
        onClick={() => setIsOpen(!isOpen)}>
        <PenLine className="mr-2 h-4 w-4" /> <span>Add Review</span>
      </Button>
      {!hasReviewed && (
        <ReviewDrawerDialog
          booking={booking}
          open={isOpen}
          setOpen={setIsOpen}
          userId={userId}
        />
      )}
    </div>
  );
};
