import React from "react";
import { Search } from "lucide-react";
type Props = {};

export default function Cars({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-10 xsm:mx-auto md:w-3/4 md:mx-auto">
      <h1 className="text-xl md:text-2xl font-bold my-2 capitalize">
        Home page for displaying all cars
      </h1>
      <form className="p-1 flex items-center">
        <input
          type="search"
          placeholder="Search by model name"
          className="rounded-md h-10 px-3 py-1  flex-1 outline-none border focus:border-blue-600 border-gray-300 "
        />
        <button className="px-3  border border-blue-500 hover:bg-blue-600 hover:text-white h-10 rounded-md mx-2">
          <Search width={20} height={20} />
        </button>
      </form>
    </div>
  );
}
