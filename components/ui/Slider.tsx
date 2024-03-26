import React, { useState } from "react";

const PriceRangeFilter: React.FC = () => {
  const [value, setValue] = useState(50); // Initial value set to 50

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value)); // Update the value state
  };

  return (
    <div className="w-full">
      <h1 className="font-bold text-gray-600">Price Range ($)</h1>
      <div className="flex items-center w-full justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>Min</span>
          <input
            type="number"
            name="min"
            className="border !bg-white outline-none px-2 w-14"
            value={10}
          />
        </div>
        <div>&#8212;</div>
        <div className="flex items-center gap-2">
          <span>Max</span>
          <input
            type="number"
            className="border !bg-white outline-none px-2 w-14"
            name="max"
            value={value}
            onChange={handleRangeChange}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <input
          type="range"
          min="10"
          max="50"
          name="price"
          value={value}
          onChange={handleRangeChange}
          className="w-full py-2 accent-green-500 slider outline-none"
          id="myRange"
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
