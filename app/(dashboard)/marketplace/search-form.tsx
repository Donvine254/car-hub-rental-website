import { Button } from "@/components/ui/button";
import React from "react";

const bodyTypes = [
  "Saloon",
  "SUV",
  "Hatchback",
  "Pickup",
  "Van",
  "Coupe",
  "Convertible",
];
const fuelTypes = ["Diesel", "Petrol", "Hybrid", "Plugin Hybrid", "Electric"];
const colors = [
  "Black",
  "White",
  "Silver",
  "Red",
  "Blue",
  "Grey",
  "Green",
  "Other",
];

const inputClasses =
  "mt-1 block w-full rounded-md border-2 border-gray-200 p-2 shadow-sm focus:border-green-500 focus:ring-green-500";
const selectClasses =
  "mt-1 block w-full rounded-md border-2 border-gray-200 p-2 shadow-sm focus:border-green-500 focus:ring-green-500";

export default function SearchForm() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white shadow border rounded-lg p-6">
        <h2 className="text-2xl font-semibold my-1 text-center">
          Let&apos; Find Your Dream Car
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          We recommend the best and finest cars for a friendly price.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Make
            </label>
            <input
              type="text"
              className={inputClasses}
              placeholder="e.g., Toyota"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <input
              type="text"
              className={inputClasses}
              placeholder="e.g., Camry"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input type="number" className={inputClasses} placeholder="2024" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mileage (km)
            </label>
            <div className="flex gap-2">
              <input type="number" className={inputClasses} placeholder="Min" />
              <input type="number" className={inputClasses} placeholder="Max" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Power (HP)
            </label>
            <input
              type="number"
              className={inputClasses}
              placeholder="e.g., 150"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transmission
            </label>
            <select className={selectClasses}>
              <option value="">Select</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fuel Type
            </label>
            <select className={selectClasses}>
              <option value="">Select</option>
              {fuelTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Body Type
            </label>
            <select className={selectClasses}>
              <option value="">Select</option>
              {bodyTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            variant="default"
            className="w-full md:w-auto bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Search Cars
          </Button>
        </div>
      </div>
    </div>
  );
}
