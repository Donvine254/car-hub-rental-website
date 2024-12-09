"use client";

import { PhoneInput } from "@/components/ui/phoneinput";
import React, { FormEvent, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
type Props = {};

export default function DemoContactPage({}: Props) {
  const [data, setData] = useState({
    email: "",
    phone: "",
    name: "",
    message: "",
  });
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    console.log(isValidPhoneNumber(data.phone), Number(data.phone));
  }

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg border shadow mb-12 max-w-max mx-auto">
      <h2 className="text-xl font-bold text-center my-2">
        Need More information?
      </h2>
      <p className="text-base text-center xsm:text-sm">
        Fill up the form below to send us a message and we will get in touch as
        soon as possible.
      </p>

      <div className="space-y-2">
        <label htmlFor="name">
          Name <span className="text-red-600 font-bold">*</span>
        </label>
        <input
          className="h-10 bg-white text-base focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-50"
          id="name"
          type="text"
          name="name"
          placeholder="John Doe"
          value={data.name}
          onChange={handleChange}
          autoComplete="name"
          pattern="^[a-zA-Z\s]*$"
          title="Numbers and special characters are not allowed"
          maxLength={20}
          minLength={3}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone">
          Phone Number <span className="text-red-600 font-bold">*</span>
        </label>
        <PhoneInput
          value={data.phone}
          defaultCountry="KE"
          placeholder="Enter phone number"
          onChange={(value) =>
            setData((prev) => ({
              ...prev,
              phone: value,
            }))
          }
          className="bg-white text-base focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 w-full border-red-500  rounded-md z-50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email">
          Email <span className="text-red-600 font-bold">*</span>
        </label>
        <input
          className="h-10 bg-white text-base focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-50"
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          onChange={handleChange}
          value={data.email}
          title="Enter a valid email address"
          maxLength={60}
          minLength={3}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message">
          Your Message<span className="text-red-600 font-bold">*</span>
        </label>
        <textarea
          className="bg-white text-base focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-50"
          rows={4}
          id="message"
          name="message"
          onChange={handleChange}
          maxLength={500}
          value={data.message}
          minLength={5}
          required
          placeholder="Type your message here..."></textarea>
      </div>
      <div className="flex items-center justify-end gap-4 py-2">
        <button
          type="reset"
          className="border-green-500 hover:border-red-500 border px-4 py-1 rounded-lg focus:outline-none focus:ring-2 transition-colors">
          Clear
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
          Send
        </button>
      </div>
      <p className="text-sm text-center text-gray-500">
        This page is protected by Cloudflare Turnstile, and subject to the
        Cloudflare{" "}
        <a
          href="https://www.cloudflare.com/privacypolicy"
          className="text-emerald-600 hover:text-emerald-700">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://www.cloudflare.com/website-terms"
          className="text-emerald-600 hover:text-emerald-700">
          Terms of Service
        </a>
        .
      </p>
    </form>
  );
}
