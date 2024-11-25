import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Car Hub - Terms and Conditions",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
type Props = {};

export default function Terms({}: Props) {
  return (
    <section>
      <div className="bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 md:py-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Rental Terms and Conditions
          </h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto p-6 ">
        <div className="bg-gray-200 text-gray-900 p-4 rounded-md">
          <h2 className="text-lg font-bold mb-2">Table of Contents</h2>
          <ul className="space-y-1">
            <li className="hover:text-blue-600">
              <a href="#1-eligibility-and-requirements">
                1. Eligibility and Requirements
              </a>
            </li>

            <li className="hover:text-blue-600">
              <a href="#2-insurance-and-protection">
                2. Insurance and Protection
              </a>
            </li>

            <li className="hover:text-blue-600">
              <a href="#3-terms-of-payment">3. Terms of Payment</a>
            </li>
            <li className="hover:text-blue-600">
              <a href="#4-security-measures">4. Security Measures</a>
            </li>
          </ul>
        </div>

        <h2
          id="1-eligibility-and-requirements"
          className="text-2xl font-bold mb-4">
          1. Eligibility and Requirements
        </h2>

        <h3
          id="1-1-driving-license"
          className="text-xl font-semibold mb-3 mt-6">
          1.1 Driving License
        </h3>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>All renters must possess a valid driving license.</li>
          <li>The license must be held for a minimum of one year.</li>
          <li>
            International renters must provide a valid international driving
            permit along with their original license.
          </li>
        </ul>

        <h3
          id="1-2-age-restrictions"
          className="text-xl font-semibold mb-3 mt-6">
          1.2 Age Restrictions
        </h3>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>The minimum age for renting a vehicle is 18 years old.</li>
          <li>The maximum age for renting a vehicle is 70 years.</li>
          <li>Some vehicle categories may have higher age restrictions.</li>
        </ul>

        <h2
          id="2-insurance-and-protection"
          className="text-2xl font-bold mt-10 mb-4">
          2. Insurance and Protection
        </h2>

        <h3
          id="2-1-basic-insurance"
          className="text-xl font-semibold mb-3 mt-6">
          2.1 Basic Insurance
        </h3>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            All rentals include basic third-party liability insurance as
            required by law.
          </li>
          <li>This coverage does not include damage to the rental vehicle.</li>
        </ul>

        <h3
          id="2-2-theft-protection-insurance"
          className="text-xl font-semibold mb-3 mt-6">
          2.2 Theft Protection Insurance
        </h3>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            Theft Protection Insurance (TPI) is available for an additional fee.
          </li>
          <li>
            TPI reduces the renter&#39;s liability in case of theft or attempted
            theft of the vehicle.
          </li>
          <li>
            Exceptions and deductibles apply; please refer to the specific
            policy for details.
          </li>
          <li>
            All vehicles should be locked when unattended The vehicle must not
            be parked in a public area for long periods. The hirer is
            responsible for the security of the vehicle.
          </li>
        </ul>

        <h3
          id="2-3-collision-damage-waiver"
          className="text-xl font-semibold mb-3 mt-6">
          2.3 Collision Damage Waiver
        </h3>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            Collision Damage Waiver (CDW) is offered for an additional fee.
          </li>
          <li>
            CDW reduces the renter&#39;s liability for damage to the rental
            vehicle.
          </li>
          <li>
            CDW does not cover damage to tires, windshield, or undercarriage.
          </li>
          <li>
            A deductible may still apply; amount varies based on vehicle
            category.
          </li>
          <li>
            The insurance might be void in cases of drunk driving or
            over-speeding/careless driving.
          </li>
        </ul>

        {/* Additional sections */}
        <h2 id="3-terms-of-payment" className="text-2xl font-bold mt-10 mb-4">
          3. Terms of Payment
        </h2>

        <h3
          id="3-1-reservation-and-deposit"
          className="text-xl font-semibold mb-3 mt-6">
          3.1 Reservation and Deposit
        </h3>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>A valid credit card is required for reservation.</li>
          <li>
            A pre-authorization hold will be placed on the credit card at the
            time of pickup.
          </li>
          <li>
            The hold amount will vary based on the vehicle category and rental
            duration.
          </li>
        </ul>

        <h3
          id="3-2-payment-methods"
          className="text-xl font-semibold mb-3 mt-6">
          3.2 Payment Methods
        </h3>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            We accept major credit cards (Visa, MasterCard, American Express,
            Mpesa, Airtel Money).
          </li>
          <li>
            Debit cards are accepted for payment upon return but not for
            reservation or deposit.
          </li>
          <li>
            Cash payments are accepted. Ensure to always collect a receipt after
            paying Cash.
          </li>
        </ul>

        <p className="mt-10 text-sm text-gray-700 bg-gray-200 p-3">
          By renting a vehicle from us, you agree to abide by these terms and
          conditions. We reserve the right to modify these terms at any time. It
          is your responsibility to review these terms periodically for changes.
        </p>
        <p className="text-sm text-gray-600">Last updated: [25/11/2024]</p>
      </div>
    </section>
  );
}
