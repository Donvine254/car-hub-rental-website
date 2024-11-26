import React from "react";

type Props = {};
import type { Metadata } from "next";
import FAQAccordion from "./Accordion";
export const metadata: Metadata = {
  title: "Car Hub - Frequently Asked Questions",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
export default function FAQs(props: Props) {
  return (
    <section>
      <div className="bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 md:py-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Frequently Asked Questions
          </h1>
        </div>
      </div>
      <div className="container xsm:p-2 bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70">
        <div className="max-w-3xl mx-auto py-8 ">
          <FAQAccordion />
          <div className="mt-10 text-base text-gray-700 bg-green-100 p-3">
            <p>
              Need more help or did not find the FAQs helpful? Contact us and we
              will respond as soon as possible.
            </p>
            <a
              href="mailto:support@carbubke.vercel.app"
              className="cursor-pointer hover:text-blue-500 hover:underline">
              support@carhubke.vercel.app
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
