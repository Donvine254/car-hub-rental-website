"use client";

import React, { useEffect } from "react";

type Props = {};

export default function HeroSection({}: Props) {
  useEffect(() => {
    const valueDisplays = document.querySelectorAll<HTMLElement>(".num");
    const interval = 10000;

    valueDisplays.forEach((valueDisplay) => {
      let startValue = 0;
      const endValueAttr = valueDisplay.getAttribute("data-val");
      if (endValueAttr) {
        const endValue = parseInt(endValueAttr, 10);
        const duration = Math.floor(interval / endValue);
        const counter = setInterval(() => {
          startValue += 1;
          valueDisplay.textContent = startValue.toString();
          if (startValue === endValue) {
            clearInterval(counter);
          }
        }, duration);
      }
    });
  }, []);

  return (
    <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="bg-black w-full h-full  bg-opacity-60">
        <div className="p-6 my-12 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
            <h2 className="text-4xl font-bold flex-1 text-white self-start mt-4">
              We offer customers a wide range of{" "}
              <span className="text-green-500">commercial cars</span> and{" "}
              <span className="text-green-500">luxury cars</span> &nbsp; for any
              occasion.
            </h2>
            <p className="mt-4 text-base  flex-1 text-white leading-loose">
              At our car rental agency, we believe that everyone deserves the
              pleasure of driving a reliable and comfortable vehicle, regardless
              of the budget. We have created a diverse fleet with maintained
              cars, ranging from standard to prestigious, SUV to compact
              performance cars.
              <br />
              Our tailored services allow you an easy and convenient way to
              drive luxury vehicles. Whether you need transportation for a
              business event, vacation, emergency, or to enjoy a planned
              getaway, we have flexible rental options to suit.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10 text-white">
            <div className="text-center py-4 px-4 bg-slate-800 bg-opacity-20 rounded-md border">
              <h3 className="text-3xl font-extrabold text-green-500 ">
                <span className="num" data-val="1542">
                  000
                </span>
              </h3>
              <p className="text-sm text-white">Completed Orders</p>
            </div>
            <div className="text-center py-2 px-4 bg-slate-800 bg-opacity-20 rounded-md border">
              <h3 className="text-3xl font-extrabold text-green-500">
                <span className="num" data-val="800">
                  000
                </span>
              </h3>
              <p className="text-sm text-white">Happy Customers</p>
            </div>
            <div className="text-center py-2 px-4 bg-slate-800 bg-opacity-20 rounded-md border">
              <h3 className="text-3xl font-extrabold text-green-500">
                <span className="num" data-val="120">
                  000
                </span>
              </h3>
              <p className="text-sm text-white">Vehicles Fleet</p>
            </div>
            <div className="text-center py-2 px-4 bg-slate-800 bg-opacity-20 rounded-md border">
              <h3 className="text-3xl font-extrabold text-green-500">
                <span className="num" data-val="5">
                  0
                </span>
              </h3>
              <p className="text-sm text-white">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
