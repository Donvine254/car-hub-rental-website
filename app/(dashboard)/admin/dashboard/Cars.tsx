"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon, X } from "lucide-react";

export default function NewCarEntry() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    modelName: "",
    image: null as File | null,
    year: "",
    pricePerDay: "",
    transmissionType: "",
    bodyType: "",
    fuelConsumption: "",
    seats: "",
    fuelType: "",
    location: "",
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
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
      setFormData({ ...formData, image: e.dataTransfer.files[0] });
    }
  };

  const handleUpload = async (file: File) => {
    // Here you would implement the file upload logic
    console.log("Uploading file:", file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log(formData);
    // Redirect to the cars list page after submission
    router.push("/cars");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="modelName">Model Name</Label>
            <Input
              id="modelName"
              name="modelName"
              value={formData.modelName}
              onChange={handleChange}
              placeholder="Vehicle model name. eg toyota corolla"
              required
            />
          </div>

          <div>
            <Label htmlFor="year">Year of Manufacture</Label>
            <Input
              id="year"
              name="year"
              type="number"
              value={formData.year}
              placeholder="Vehicle year of manufacture. eg 2022"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="pricePerDay">Price Per Day ($)</Label>
            <Input
              id="pricePerDay"
              name="pricePerDay"
              type="number"
              placeholder="Price per day"
              min={20}
              value={formData.pricePerDay}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="transmissionType">Transmission Type</Label>
            <select
              id="transmissionType"
              name="transmissionType"
              value={formData.transmissionType}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md">
              <option value="">Select transmission type</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>

          <div>
            <Label htmlFor="bodyType">Body Type</Label>
            <select
              id="bodyType"
              name="bodyType"
              value={formData.bodyType}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md">
              <option value="">Select body type</option>
              <option value="suv">SUV</option>
              <option value="saloon">Saloon</option>
              <option value="van">Van</option>
              <option value="pickup">Pickup</option>
            </select>
          </div>
          <div>
            <Label htmlFor="seats">Number of Seats</Label>
            <Input
              id="seats"
              name="seats"
              type="number"
              value={formData.seats}
              onChange={handleChange}
              min={2}
              max={50}
              placeholder="Number of seats"
              required
            />
          </div>
          <div>
            <Label htmlFor="fuelType">Fuel Type</Label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md">
              <option value="" hidden>
                Select fuel type
              </option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <Label htmlFor="fuelConsumption">Fuel Consumption (km/l)</Label>
            <Input
              id="fuelConsumption"
              name="fuelConsumption"
              type="number"
              value={formData.fuelConsumption}
              placeholder="Fuel consumption"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md">
              <option value="" hidden>
                Select Vehicle Location
              </option>
              <option value="nairobi">Nairobi</option>
              <option value="thika">Thika</option>
              <option value="mombasa">Mombasa</option>
              <option value="eldoret">Eldoret</option>
              <option value="kisumu">Kisumu</option>
            </select>
          </div>
        </div>
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
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              required
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
              <p className="text-sm text-muted-foreground">Image files only</p>
            </div>
          </div>
          {formData.image && (
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <span className="xsm:text-xs">{formData.image.name}</span>
              </div>
              <div className="flex items-center gap-2 xsm:justify-between">
                <span
                  title="Clear"
                  className="hover:text-red-500 xsm:px-6 xsm:py-2 xsm:bg-black xsm:text-white xsm:rounded-md"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      image: null,
                    })
                  }>
                  <X />
                </span>
                <Button
                  type="button"
                  variant="default"
                  className="bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-100 disabled:text-black disabled:cursor-not-allowed"
                  onClick={() =>
                    formData.image && handleUpload(formData.image)
                  }>
                  Upload
                </Button>
              </div>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-100 disabled:text-black disabled:cursor-not-allowed">
          Add Car
        </Button>
      </form>
    </div>
  );
}
