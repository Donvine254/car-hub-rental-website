"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import { Button } from "../ui/button";
import { ChatBox } from "./chatbox";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        onClick={toggleChat}
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
      <div
        className={`fixed ${isMobile ? "inset-0" : "bottom-4 right-4"} z-50`}>
        {isOpen && (
          <ChatBox isMobile={isMobile} onClose={() => setIsOpen(false)} />
        )}
      </div>
    </>
  );
};
