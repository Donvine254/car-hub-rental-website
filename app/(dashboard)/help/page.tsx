import React from "react";
import type { Metadata } from "next";
import { Mail, Phone, SearchIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "./contact";
import { WhatsappIcon } from "@/assets";
import { Chatbot } from "@/components/chatbot";
export const metadata: Metadata = {
  title: "Car Hub - Help Page",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};

type Props = {};

export default function Help({}: Props) {
  return (
    <section>
      <div className="bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/v1732663821/illustrations/rbjvkffgkhbvn6mmjoxs.png')] bg-cover  bg-bottom bg-no-repeat ">
        <div className="bg-black flex flex-col items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20 ">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize xsm:text-xl  text-white md:py-4 ">
            How can we help you?
          </h1>
          <div className="relative w-full max-w-96">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Describe your issue"
              className="w-full px-10 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="container xsm:p-2 bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70">
        <section className="max-w-3xl mx-auto py-8">
          {/* parent section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 ">
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="md:text-2xl font-semibold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/faqs" className="text-blue-600 hover:underline">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking"
                    className="text-blue-600 hover:underline">
                    How to Book a Car
                  </Link>
                </li>
              </ul>
            </section>

            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="md:text-2xl font-semibold mb-4">Contact Us</h2>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Phone className=" mr-2 fill-green-500 stroke-none" />
                  <span>+254702018099</span>
                </li>
                <li className="flex items-center">
                  <Mail className=" mr-2 " fill="#22C55E" stroke="white" />
                  <a
                    href="mailto:info@carhubke.vercel.app"
                    className="text-blue-600 hover:underline">
                    info@carhubke.com
                  </a>
                </li>
                <li className="flex items-center">
                  <WhatsappIcon className="mr-2 " fill="#22C55E" />
                  <Link
                    href="https://api.whatsapp.com/send?phone=254702018079"
                    className="text-blue-600 hover:underline">
                    Chat on Whatsapp
                  </Link>
                </li>
              </ul>
            </section>
          </div>
          <ContactForm />

          <section className="bg-green-100 p-6">
            <h2 className="text-2xl font-semibold mb-4 xsm:text-base">
              Looking for something else?
            </h2>
            <p className="mb-4 xsm:text-xs">
              If you couldn&apos;t find the answer to your question, please
              don&apos;t hesitate to use the contact form above or reach out to
              our customer support team directly. We&apos;re here to help!
            </p>
            <div className="flex xsm:flex-col items-center justify-between gap-4">
              <a
                href="mailto:support@carbubke.vercel.app"
                className="flex items-center xsm:justify-center gap-2 w-fit xsm:w-full bg-white text-green-600 px-6 py-2 rounded-md border hover:bg-green-500 hover:text-white border-green-600 transition-colors">
                <MailIcon /> Contact Support
              </a>
              <Chatbot />
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}
