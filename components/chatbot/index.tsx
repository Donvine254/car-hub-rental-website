"use client";

import { useState, useEffect } from "react";

import { ChatBox } from "./chatbox";
type Props = {
  setIsOpen: (state:boolean) => void;
};
export const Chatbot = ({ setIsOpen }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <div
        className={`fixed ${isMobile ? "inset-0" : "bottom-4 right-4"} z-50`}>
        <ChatBox isMobile={isMobile} onClose={() => setIsOpen(false)} />
      </div>
    </>
  );
};
