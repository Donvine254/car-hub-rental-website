import fetchCars from "@/lib/actions/fetchCars";
import { NextResponse } from "next/server";

export async function GET() {
  const cars = await fetchCars();
  return NextResponse.json(cars, { status: 200 });
}

export async function POST() {
  //create a new car in the database
}
