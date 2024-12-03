"use client";
import DialogComponent from "@/components/alerts/dialog";
import TurnstileComponent from "@/components/ui/turnstile";
import verifyTurnstileToken from "@/lib/actions/verifycaptcha";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isDev = process.env.NODE_ENV === "development";
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    if (emailValue.trim() === "") {
      setError(null);
    } else if (!emailValue.match(pattern)) {
      setError("Please enter a valid email address");
    } else {
      setError(null);
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    //verify captcha first
    if (!isDev) {
      const result = await verifyTurnstileToken(token);
      if (!result) {
        toast.error("Failed to validate captcha");
        return false;
      }
    }
    const name = (form.elements.namedItem("fullname") as HTMLInputElement)
      ?.value;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      ?.value;

    toast.success("Submitting form...", {
      position: "top-center",
    });

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "c0376663-dd70-4ab4-ba1b-e849ba57eecc",
        name,
        email,
        message,
        from_name: "Carhub Kenya",
        subject: "You have a new message at carhubke.vercel.app.",
      }),
    });

    const result = await response.json();
    if (result.success) {
      setIsOpen(true);
      form.reset();
    } else {
      toast.error("Failed to send message. Please try again.");
    }
  }

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow mb-12">
      <h2 className="text-xl font-bold text-center my-2">
        Need More information?
      </h2>
      <p className="text-base text-center xsm:text-sm">
        Fill up the form below to send us a message and we will get in touch as
        soon as possible.
      </p>
      <input type="checkbox" name="botcheck" id="" className="hidden" />
      <div className="space-y-2">
        <label htmlFor="name">
          Name <span className="text-red-600 font-bold">*</span>
        </label>
        <input
          className="h-10 bg-white text-base focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md z-50"
          id="name"
          type="text"
          name="fullname"
          placeholder="John Doe"
          autoComplete="name"
          pattern="^[a-zA-Z\s]*$"
          title="Numbers and special characters are not allowed"
          maxLength={20}
          minLength={3}
          required
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
          onInput={handleInput}
          title="Enter a valid email address"
          maxLength={60}
          minLength={3}
          required
        />
        <p
          className={`text-red-500 text-sm  ${
            error ? "visible opacity-100" : "invisible opacity-0"
          }`}>
          {error}
        </p>
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
          maxLength={500}
          minLength={5}
          required
          placeholder="Type your message here..."></textarea>
        {!isDev && <TurnstileComponent onVerify={(token) => setToken(token)} />}
      </div>
      <div className="flex items-center justify-end gap-4 py-2">
        <button
          type="reset"
          className="border-green-500 hover:border-red-500 border px-4 py-1 rounded-lg focus:outline-none focus:ring-2 transition-colors">
          Clear
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          disabled={!isDev ? !token : false}>
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
      <DialogComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Message Sent Successfully"
        description="Thank you for your message. We'll get back to you soon! Kindly note we might take some time to respond if this message was sent outside our working hours."
      />
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        Open
      </button>
    </form>
  );
}
