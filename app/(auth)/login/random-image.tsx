"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const RandomImage = () => {
  const imageSources = [
    "https://res.cloudinary.com/dipkbpinx/image/upload/v1734537690/cars/b2irjm7jub55tqtxaqya.png",
    "https://res.cloudinary.com/dipkbpinx/image/upload/v1735229935/cars/mjt3l1eatzgqqndludxs.png",
    "https://res.cloudinary.com/dipkbpinx/image/upload/v1706566320/cars/wi2vgjmhzqnsqn0h86cp.png",
    "https://res.cloudinary.com/dipkbpinx/image/upload/v1704846148/cars/w7fluonkjjwx5ukwlyhm.png",
  ];

  const [currentImage, setCurrentImage] = useState(imageSources[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * imageSources.length);
      setCurrentImage(imageSources[randomIndex]);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <Image
      src={currentImage}
      alt="Car rental illustration"
      width={800}
      height={450}
      className="my-auto"
      priority
    />
  );
};

export default RandomImage;
