import React from "react";
import type { Metadata } from "next";
import CouponCenter from "./couponspage";

export const metadata: Metadata = {
  title: "Car Hub - Coupon Center ",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
type Props = {};

export default function CouponPage({}: Props) {
  return (
    <section className="md:container">
      <CouponCenter />
    </section>
  );
}
