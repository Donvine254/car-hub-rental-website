import { redirect } from "next/navigation";
import DemoContactPage from "./contact";

type Props = {};

// export default function ContactPage({}: Props) {
//   return redirect("/help");
// }
export default function ContactPage({}: Props) {
  return (
    <section className="container w-full">
      <DemoContactPage />
    </section>
  );
}
