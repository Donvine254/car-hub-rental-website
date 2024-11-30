"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
type Props = {};

export default function VerificationPage({}: Props) {
  return (
    <section className="flex flex-col items-center justify-center w-full min-h-screen px-4">
      <div
        className="border text-card-foreground w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white p-6"
        data-v0-t="card">
        <div className="flex flex-col space-y-1.5 px-6 py-4">
          <p>Loading....</p>
          <div className="loader"></div>
        </div>
      </div>
    </section>
  );
}
