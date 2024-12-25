import { getUserData } from "@/lib/actions/decodetoken";
import React from "react";

type Props = {};

export default async function page({}: Props) {
  const user = await getUserData();
  return (
    <section className="md:p-2 bg-white md:shadow md:rounded-md md:border">
      <h2 className="font-bold my-2">My Reviews</h2>
    </section>
  );
}
