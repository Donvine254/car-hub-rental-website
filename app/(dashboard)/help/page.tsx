import type { Metadata } from "next";
import { Mail, Phone, SearchIcon, MailIcon } from "lucide-react";
import Help from "./help";

export const metadata: Metadata = {
  title: "Car Hub - Help Page",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};

type Props = {};

export default function HelpPage({}: Props) {
  return (
    <section>
      <Help />
    </section>
  );
}
