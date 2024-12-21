"use client";
import React, { useRef, useState } from "react";
import { Loader, X } from "lucide-react";
import { Button } from "./button";
import { Label } from "./label";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/utils/cloudinaryupload";
type Props = {
  setCarImage: (url: string) => void;
  imageUrl: string;
};
export default function Dropzone({ setCarImage, imageUrl }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxAllowedSize = 5 * 1024 * 1024;
    if (e.target.files && e.target.files[0].size > maxAllowedSize) {
      toast.error("Image is too big, max allowed size is 5MB");
      setImage(null);
      return false;
    }
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image || !(image instanceof File)) {
      toast.error("Kindly select an image first");
      return false;
    } else {
      setLoading(true);
      const validTypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/webp",
        "image/avif",
      ];

      if (validTypes.includes(image.type)) {
        const imageUrl = URL.createObjectURL(image);
        const img = new Image();
        img.onload = async () => {
          const aspectRatio = (img.width / img.height).toFixed(2);
          if (Number(aspectRatio) !== 1.78) {
            setLoading(false);
            toast.error(
              "Image must have a 16:9 aspect ratio for better results"
            );
            console.log(aspectRatio);
            setImage(null);
            return;
          }
          await uploadToCloudinary(image, "cars", setCarImage);
          setLoading(false);
          setImage(null);
        };

        img.onerror = () => {
          setLoading(false);
          toast.error("Failed to load image. Please try again.");
          setImage(null);
        };

        // Start loading the image
        img.src = imageUrl;
      } else {
        setLoading(false);
        toast.error("Unsupported file type. Please upload a valid image.");
      }
    }
  };

  return (
    <div className="space-y-4">
      <Label>Image</Label>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-primary bg-primary/10"
            : "hover:border-primary/50"
        }`}>
        <input
          type="file"
          name="image"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <div className="flex flex-col items-center gap-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-16 h-16 text-muted-foreground">
            <path d="M12 13v8" />
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="m8 17 4-4 4 4" />
          </svg>
          <p className="text-lg font-medium">
            Drag and drop a file or click to browse
          </p>
          <p className="text-sm text-muted-foreground">
            Image files only. Max size 5mb and 16:9 in aspect ratio.
          </p>
        </div>
      </div>
      {imageUrl ? (
        <div className=" p-4 bg-gray-100 rounded-lg gap-3">
          <div className="flex items-center justify-between xsm:flex-col gap-2">
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              className="object-center h-[90px] w-[160px] italic"
              alt="image"
              height={160}
              width={90}
            />
            <div className="flex items-center justify-end gap-4 xsm:justify-between">
              <Button
                type="button"
                variant="default"
                disabled={loading}
                className="bg-green-500 text-white hover:bg-green-600"
                onClick={() => {
                  fileInputRef.current?.click();
                }}>
                Change
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={loading}
                className="disabled:bg-gray-200 border disabled:text-black disabled:cursor-not-allowed"
                onClick={() => {
                  setCarImage("");
                }}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      ) : image ? (
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg flex-wrap gap-3">
          <div className="flex items-center gap-2 xsm:flex-col xsm:w-full">
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={URL.createObjectURL(image)}
              className="object-center h-[90px] w-[160px] xsm:w-full xsm:h-auto italic"
              alt="image"
              height={160}
              width={90}
            />
            <span className="xsm:text-xs">
              {image.name} | {(image.size / 1000).toFixed(1)} KB
            </span>
          </div>
          <div className="flex items-center gap-2 xsm:justify-between xsm:w-full">
            <span
              title="Clear"
              className="hover:text-red-500 xsm:px-6 xsm:py-2 xsm:bg-black xsm:text-white xsm:rounded-md"
              onClick={() => setImage(null)}>
              <X />
            </span>
            <Button
              type="button"
              variant="default"
              title="upload"
              disabled={loading}
              className="bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-200 border disabled:text-black disabled:cursor-not-allowed"
              onClick={() => image && handleUpload()}>
              {!loading ? (
                "Upload"
              ) : (
                <Loader
                  className="animate-spin text-green-500"
                  fill="#22C55E"
                />
              )}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
