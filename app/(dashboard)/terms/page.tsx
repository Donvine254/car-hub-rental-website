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
      <div className="flex max-w-5xl mx-auto gap-2 sm:flex-row flex-wrap p-2 md:p-4 lg:p-6 md:relative md:mt-4">
        {/* parent div for the flex box */}
        <div className="bg-green-100 min-w-min w-full md:w-fit text-gray-900 p-4 rounded-md h-fit shadow md:sticky md:top-12">
          <h2 className="text-lg font-bold mb-2 underline underline-offset-4 text-center">
            Table of Contents
          </h2>
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
            <li className="hover:text-blue-600">
              <a href="#5-cross-border-rental">5. Cross-Border Rental</a>
            </li>
            <li className="hover:text-blue-600">
              <a href="#6-vehicle-return">6. Vehicle Return</a>
            </li>
            <li className="hover:text-blue-600">
              <a href="#7-modifications-and-cancellations">
                7. Modifications and Cancellations
              </a>
            </li>
            <li className="hover:text-blue-600">
              <a href="#8-liability-and-disputes">8. Liability and Disputes</a>
            </li>
          </ul>
        </div>
        {/* second child */}
        <div className="flex-1 px-6">
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
            <li>
              This coverage does not include damage to the rental vehicle.
            </li>
          </ul>

          <h3
            id="2-2-theft-protection-insurance"
            className="text-xl font-semibold mb-3 mt-6">
            2.2 Theft Protection Insurance
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              Theft Protection Insurance (TPI) is available for an additional
              fee.
            </li>
            <li>
              TPI reduces the renter&#39;s liability in case of theft or
              attempted theft of the vehicle.
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
              Cash payments are accepted. Ensure to always collect a receipt
              after paying Cash.
            </li>
          </ul>
          <h3
            id="3-3-additional-charges"
            className="text-xl font-semibold mb-3 mt-6">
            3.3 Additional Charges
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong>Fuel:</strong> Vehicles must be returned with the same
              fuel level as at pickup, or a refueling fee will apply.
            </li>
            <li>
              <strong>Late Returns:</strong> Hourly charges apply for late
              returns, up to a maximum of one additional day&#39;s rental.
            </li>
            <li>
              <strong>Fines and Penalties:</strong> The renter is responsible
              for any traffic or parking fines incurred during the rental
              period.
            </li>
          </ul>
          <h2
            id="4-security-measures"
            className="text-2xl font-bold mt-10 mb-4">
            4. Security Measures
          </h2>
          <h3
            id="4-1-vehicle-tracking"
            className="text-xl font-semibold mb-3 mt-6">
            4.1 Vehicle Tracking
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              All vehicles are equipped with GPS tracking devices for security
              purposes.
            </li>
            <li>
              These devices may be used to locate the vehicle in case of theft
              or non-return.
            </li>
          </ul>
          <h3
            id="4-2-identity-verification"
            className="text-xl font-semibold mb-3 mt-6">
            4.2 Identity Verification
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              We reserve the right to verify the renter&#39;s identity and
              driving record.
            </li>
            <li>
              False information provided may result in immediate termination of
              the rental agreement.
            </li>
          </ul>
          <h2
            id="5-cross-border-rental"
            className="text-2xl font-bold mt-10 mb-4">
            5. Cross-Border Rental
          </h2>
          <h3
            id="5-1-permissions-and-restrictions"
            className="text-xl font-semibold mb-3 mt-6">
            5.1 Permissions and Restrictions
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              Cross-border travel must be declared and approved at the time of
              reservation.
            </li>
            <li>
              Additional fees and insurance requirements may apply for
              cross-border rentals.
            </li>
            <li>
              Some vehicle categories may not be eligible for cross-border
              travel.
            </li>
          </ul>
          <h3
            id="5-2-documentation"
            className="text-xl font-semibold mb-3 mt-6">
            5.2 Documentation
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              Renters are responsible for obtaining any necessary documentation
              (e.g., international insurance cards) for cross-border travel.
            </li>
            <li>
              Failure to declare cross-border travel may void insurance coverage
              and result in penalties.
            </li>
          </ul>
          <h2 id="6-vehicle-return" className="text-2xl font-bold mt-10 mb-4">
            6. Vehicle Return
          </h2>
          <h3 id="6-1-condition" className="text-xl font-semibold mb-3 mt-6">
            6.1 Condition
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              Vehicles must be returned in the same condition as received,
              allowing for normal wear and tear.
            </li>
            <li>
              Excessive dirt or stains may result in an additional cleaning fee.
            </li>
          </ul>
          <h3
            id="6-2-personal-property"
            className="text-xl font-semibold mb-3 mt-6">
            6.2 Personal Property
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              The rental company is not responsible for personal property left
              in the vehicle.
            </li>
            <li>
              Items found will be held for 30 days and then disposed of if
              unclaimed.
            </li>
          </ul>
          <h2
            id="7-modifications-and-cancellations"
            className="text-2xl font-bold mt-10 mb-4">
            7. Modifications and Cancellations
          </h2>
          <h3
            id="7-1-reservation-changes"
            className="text-xl font-semibold mb-3 mt-6">
            7.1 Reservation Changes
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              Modifications to reservations are subject to availability and may
              result in price changes.
            </li>
            <li>
              Cancellations made with less than 24 hours&#39; notice may incur a
              fee.
            </li>
          </ul>
          <h2
            id="8-liability-and-disputes"
            className="text-2xl font-bold mt-10 mb-4">
            8. Liability and Disputes
          </h2>
          <h3
            id="8-1-limitation-of-liability"
            className="text-xl font-semibold mb-3 mt-6">
            8.1 Limitation of Liability
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              The rental company&#39;s liability is limited to the value of the
              rental contract.
            </li>
            <li>We are not liable for indirect or consequential damages.</li>
          </ul>
          {/* add other sections */}
          <p className="mt-10 text-sm text-gray-700 bg-green-100 p-3">
            By renting a vehicle from us, you agree to abide by these terms and
            conditions. We reserve the right to modify these terms at any time.
            It is your responsibility to review these terms periodically for
            changes.
          </p>
          <div className="flex items-center justify-between gap-2 my-2 flex-wrap">
            <h3 className=" text-gray-600">Last updated: [25/11/2024]</h3>
            <a
              href="https://utfs.io/f/P083a1ci0xKVKVovj1Tq3lFb8QEWzVHTm9rKuoRC7Zx6k2Ne"
              target="_blank"
              className="bg-green-500 text-white p-2 rounded-md"
              download>
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
