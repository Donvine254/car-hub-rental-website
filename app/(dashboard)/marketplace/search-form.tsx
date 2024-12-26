"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [showAdvanced, setShowAdvanced] = useState(false);
  return (
    <div className="w-full max-w-7xl mx-auto px-2 py-8 sm:px-6 lg:px-8">
      <div className="bg-white shadow border rounded-lg p-6">
        <h2 className="text-2xl font-semibold my-1 text-center">
          Let&apos; Find Your Dream Car
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          We recommend the best and finest cars for a friendly price.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-2">
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
          <div className="hidden md:block lg:hidden">
            <label className="block text-sm font-medium text-gray-700">
              Mileage (km)
            </label>
            <div className="flex gap-2">
              <input type="number" className={inputClasses} placeholder="Min" />
              <input type="number" className={inputClasses} placeholder="Max" />
            </div>
          </div>
        </div>
        {/* advanced search */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-2 transition-all duration-300 ease-in-out overflow-hidden mt-2 ${
            showAdvanced
              ? "opacity-100 max-h-[500px] delay-300"
              : "opacity-0 max-h-0 delay-150 "
          }`}>
          <div className="md:hidden lg:block">
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <select className={selectClasses}>
              <option value="">Select</option>
              {colors.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-green-500 hover:text-green-600 hover:bg-green-50">
            {showAdvanced ? (
              <span className="flex items-center gap-2">
                Less Filters <ChevronUp className="h-4 w-4" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Advanced Search <ChevronDown className="h-4 w-4" />
              </span>
            )}
          </Button>
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
