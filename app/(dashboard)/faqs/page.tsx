import React from "react";

type Props = {};
import type { Metadata } from "next";
import FAQAccordion from "./Accordion";
import { MailIcon } from "lucide-react";
export const metadata: Metadata = {
  title: "Car Hub - Frequently Asked Questions",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
export default function FAQs(props: Props) {
  return (
    <section>
      <div className="bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Frequently Asked Questions
          </h1>
        </div>
      </div>
      <div className="container xsm:p-2 bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70">
        <div className="max-w-3xl mx-auto py-8 ">
          <FAQAccordion />
          <div className="mt-10 text-base text-gray-700 bg-green-100 p-3">
            <h2 className="text-2xl font-semibold mb-4">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="mb-4">
              If you couldn&apos;t find the answer to your question, please don
              not hesitate to contact our customer support team. We&apos;re here
              to help!
            </p>
            <a
              href="mailto:support@carbubke.vercel.app"
              className="flex items-center gap-2 w-fit bg-white text-green-600 px-6 py-2 rounded-md border hover:bg-green-500 hover:text-white border-green-600 transition-colors">
              <MailIcon /> Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
