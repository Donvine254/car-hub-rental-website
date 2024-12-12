import React from "react";
import NewCarEntry from "./Cars";
type Props = {};

export default function AdminDashboard({}: Props) {
  return (
    <section className="bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70 p-2">
      <NewCarEntry />
    </section>
  );
}
