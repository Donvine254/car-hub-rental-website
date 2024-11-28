import React from "react";
import type { Metadata } from "next";
import { Orders } from "./orders";

export const metadata: Metadata = {
  title: "Car Hub - My Orders ",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
type Props = {};

export default function OrdersPage({}: Props) {
  return (
    <section>
      <Orders />
    </section>
  );
}
