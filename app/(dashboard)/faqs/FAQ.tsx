"use client";

import React, { useState } from "react";

type Props = {};

import FAQAccordion from "./Accordion";
import { MailIcon } from "lucide-react";
import Image from "next/image";
import { Chatbot } from "@/components/chatbot";
import { Button } from "@/components/ui/button";

export default function FAQs(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section>
      <div className="bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Frequently Asked Questions
          </h1>
        </div>
      </div>
      <div className="container xsm:p-2 bg-[#f8f9fa]">
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
            <div className="flex xsm:flex-col items-center justify-between gap-4">
              <a
                href="mailto:support@carbubke.vercel.app"
                className="flex items-center xsm:justify-center gap-2 w-fit xsm:w-full bg-white text-green-600 px-6 py-2 rounded-md border hover:bg-green-500 hover:text-white border-green-600 transition-colors">
                <MailIcon /> Contact Support
              </a>
              <Button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center md:justify-start  w-full md:w-fit bg-white text-green-600 px-6 py-2 rounded-md border hover:bg-gray-600 hover:text-white border-green-600">
                <Image
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1733141454/illustrations/ai-svgrepo-com_boip47.svg"
                  alt="AI logo"
                  height={24}
                  width={24}
                  priority
                />
                <p>Ask AI Support Agent</p>
              </Button>
            </div>
          </div>
        </div>
        {isOpen && <Chatbot setIsOpen={setIsOpen} />}
      </div>
    </section>
  );
}
