import { HeartIcon } from "lucide-react";
import React, { useState } from "react";
type Props = {};

export default function CustomHeartIcon({}: Props) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  return (
    <HeartIcon
      className={`text-gray-300 cursor-pointer hover:text-red-600 ${
        isClicked ? "text-red-600" : ""
      }`}
      fill="currentColor"
      size={16}
      onClick={() => {
        setIsClicked(!isClicked);
      }}
    />
  );
}
