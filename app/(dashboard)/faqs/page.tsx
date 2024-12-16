import type { Metadata } from "next";
import FAQs from "./FAQ";
export const metadata: Metadata = {
  title: "Car Hub - Frequently Asked Questions",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
export default function FAQPage() {
  return (
    <section>
      <FAQs />
    </section>
  );
}
