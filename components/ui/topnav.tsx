import {
  FacebookIcon,
  TiktokIcon,
  TwitterIcon,
  YoutubeIcon,
  InstagramIcon,
} from "@/assets";
import { Clock, Mail, Phone } from "lucide-react";
import React from "react";

type Props = {};

export default function Topnav({}: Props) {
  return (
    <div className="h-10 fixed top-0 md:z-20 bg-black text-white  flex items-center justify-center md:justify-between w-full py-1 px-2">
      <div className="hidden md:flex items-center gap-4 ">
        <div className="flex items-center gap-1">
          <Phone fill="#22C55E" stroke="none" />
          <a href="tel:+254 702018099" target="_blank">
            +254702018099
          </a>
        </div>
        <div className="flex items-center gap-1">
          <Mail fill="#22C55E" stroke="black" />
          <a href="mailto:admin@carhub.com" target="_blank">
            admin@carhub.com
          </a>
        </div>
        <div className="flex items-center gap-1">
          <Clock fill="#22C55E" stroke="black" />
          <p>Mon - Fri 08.00 - 18.00</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <FacebookIcon />
        <TwitterIcon size={20} />
        <InstagramIcon />
        <YoutubeIcon />
        <TiktokIcon />
      </div>
    </div>
  );
}
