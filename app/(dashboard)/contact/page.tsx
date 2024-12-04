import { redirect } from "next/navigation";

type Props = {};

export default function ContactPage({}: Props) {
  return redirect("/help");
}
