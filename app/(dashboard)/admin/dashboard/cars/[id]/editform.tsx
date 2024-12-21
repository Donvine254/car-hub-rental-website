"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Dropzone from "@/components/ui/dropzone";
import { updateCarDetails } from "@/lib/actions/car-actions";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import SuccessDialog from "@/components/alerts/success-dialog";
import { Car } from "@prisma/client";
import Link from "next/link";
type Props = {
  car: Car;
};
export default function EditForm({ car }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    modelName: car.modelName,
    image: car.image,
    year: car.year,
    pricePerDay: car.pricePerDay,
    transmissionType: car.transmissionType,
    bodyType: car.bodyType,
    fuelConsumption: car.fuelConsumption,
    seats: car.seats,
    fuelType: car.fuelType,
    location: car.location,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!car.image) {
      toast.error("Kindly upload the car image!", { position: "top-right" });
      return false;
    }
    try {
      setLoading(true);
      const result = await updateCarDetails(car.id, {
        ...formData,
        year: Number(formData.year),
        pricePerDay: Number(formData.pricePerDay),
        fuelConsumption: Number(formData.fuelConsumption),
        seats: Number(formData.seats),
      });
      if (result.success) {
        setIsOpen(true);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70 p-2">
      <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Update Car Details</h2>
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
          <Dropzone
            setCarImage={(url: string) => {
              setFormData({ ...formData, image: url });
            }}
            imageUrl={formData.image}
          />
          <div className="flex items-center justify-end gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-500 text-white hover:bg-green-600 disabled:bg-green-100 h-10 border disabled:text-black disabled:cursor-not-allowed w-full">
              {!loading ? (
                "Update Details"
              ) : (
                <Loader
                  className="animate-spin text-green-500"
                  fill="#22C55E"
                />
              )}
            </Button>
            <Link
              href="/admin"
              className="bg-gray-900 text-white hover:bg-red-400 disabled:bg-green-100 h-10 border disabled:text-black disabled:cursor-not-allowed w-full flex items-center justify-center rounded-md">
              Cancel
            </Link>
          </div>

          <SuccessDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Car details updated successfully!"
            description="Car details have been successfully updated in the database."
          />
        </form>
      </div>
    </section>
  );
}
