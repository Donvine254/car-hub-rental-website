import React from "react";

type Props = {};

export default function AdminDashboard({}: Props) {
  return (
    <section className="bg-gradient-to-r from-green-50 via-slate-50 to-green-50 bg-opacity-70 p-2">
      <div className="flex flex-col gap-4">
        <a href="/admin/dashboard/cars">Create New Car</a>
        <a href="/admin/dashboard/cars">Update Car details</a>
        <a href="/admin/dashboard/cars">Create New Car</a>
      </div>
    </section>
  );
}
