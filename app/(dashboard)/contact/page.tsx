import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export default function ContactPage({}: Props) {
  return redirect("/me/profile");
}
