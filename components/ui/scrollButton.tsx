"use client";

import React, { useState, useEffect, useCallback } from "react";

import { ChevronUpIcon } from "lucide-react";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > window.innerHeight / 1) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, []);

  const handleButtonClick = useCallback(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Dependency array to ensure the correct cleanup

  return (
    <div id="scroll" className="fixed bottom-5 right-5 ">
      {showButton && (
        <button
          onClick={handleButtonClick}
          id="scroll-to-top"
          title="Go to top"
          className="rounded-md shadow px-2 py-1 bg-green-500 text-white">
          <ChevronUpIcon size={30} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
