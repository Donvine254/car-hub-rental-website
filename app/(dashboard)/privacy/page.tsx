import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Car Hub - Privacy Policy",
  description:
    "Car Hub is a car rental service that provides customers with ease access to high-end, high-performance and affordable rental vehicles",
};
type Props = {};

export default function Privacy({}: Props) {
  return (
    <section>
      <div className="bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Privacy Policy
          </h1>
        </div>
      </div>
      <div className="flex max-w-5xl mx-auto gap-2 sm:flex-row flex-wrap p-2 md:p-4 lg:p-6 md:relative md:mt-4">
        {/* parent div */}
        <div className="bg-green-100 min-w-min w-full md:w-fit text-gray-900 p-4 rounded-md h-fit shadow md:sticky md:top-12">
          <h2 className="text-lg font-bold mb-2 underline underline-offset-4 text-center">
            Table of Contents
          </h2>
          <ul className="space-y-1">
            <li className="hover:text-blue-600 visited:text-purple-600">
              <a href="#introduction">1. Introduction</a>
            </li>

            <li className="hover:text-blue-600 visited:text-purple-600">
              <a href="#information-we-collect">2. Information We Collect</a>
            </li>

            <li className="hover:text-blue-600 visited:text-purple-600">
              <a href="#how-we-use-your-information">
                3. How We Use Your Information
              </a>
            </li>
            <li className="hover:text-blue-600 visited:text-purple-600">
              <a href="#data-sharing">4. Data Sharing and Disclosure</a>
            </li>
            <li className="hover:text-blue-600 visited:text-purple-600">
              <a href="#data-security">5. Data Security and Confidentiality</a>
            </li>
            <li className="hover:text-blue-600 visited:text-purple-600">
              <a href="#cookies">6. Cookies and Tracking Technologies</a>
            </li>
            <li className="hover:text-blue-600 visited:text-purple-600">
              <a href="#user-responsibilities">7. User Responsibilities</a>
            </li>
            <li className="hover:text-blue-600 visited:text-purple-600">
              <a href="#your-rights-and-choices">8. Your Rights and Choices</a>
            </li>
            <li className="hover:text-blue-600 visited:text-purple-600">
              <a href="#changes">9. Changes to This Privacy Policy</a>
            </li>
          </ul>
        </div>
        {/* second child */}
        <div className="flex-1 px-6">
          <section className="mb-8" id="introduction">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              At Carhub Kenya, we are committed to protecting your privacy and
              personal information. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our car
              rental services or interact with our website.
            </p>
          </section>

          <section className="mb-8" id="information-we-collect">
            <h2 className="text-2xl font-semibold mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-semibold mb-2">
              2.1 Information You Provide
            </h3>
            <p className="mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Personal information (e.g., name, email address, phone number)
              </li>
              <li>Payment information (e.g., credit card details)</li>
              <li>Driver&apos;s license information</li>
              <li>Rental preferences and history</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">
              2.2 Information from Other Sources
            </h3>
            <p className="mb-4">
              We may receive information about you from other sources,
              including:
            </p>
            <ul className="list-disc pl-6">
              <li>
                Social media platforms (e.g., Facebook, Google) when you connect
                your account or interact with our social media pages
              </li>
              <li>
                Business partners, such as travel agencies or affiliate programs
              </li>
              <li>Public databases and identity verification services</li>
            </ul>
          </section>

          <section className="mb-8" id="how-we-use-your-information">
            <h2 className="text-2xl font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6">
              <li>Processing and managing your car rental reservations</li>
              <li>
                Communicating with you about your rentals and our services
              </li>
              <li>Improving our services and developing new features</li>
              <li>
                Personalizing your experience and providing targeted
                advertisements
              </li>
              <li>
                Complying with legal obligations and enforcing our policies
              </li>
            </ul>
          </section>

          <section className="mb-8" id="data-sharing">
            <h2 className="text-2xl font-semibold mb-4">
              4. Data Sharing and Disclosure
            </h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6">
              <li>Service providers who assist us in operating our business</li>
              <li>
                Business partners for joint marketing efforts or promotions
              </li>
              <li>
                Law enforcement or government agencies when required by law
              </li>
              <li>
                Other parties in connection with a company merger, sale, or
                acquisition
              </li>
            </ul>
          </section>
          <section className="mb-8" id="data-security">
            <h2 className="text-2xl font-semibold mb-4">
              5. Data Security and Confidentiality
            </h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the Internet or electronic storage is 100%
              secure.
            </p>
            <p>We maintain confidentiality by:</p>
            <ul className="list-disc pl-6">
              <li>
                Limiting access to personal information to authorized employees
                only
              </li>
              <li>Using encryption for sensitive data transmission</li>
              <li>Regularly updating our security measures</li>
            </ul>
          </section>

          <section className="mb-8" id="cookies">
            <h2 className="text-2xl font-semibold mb-4">
              6. Cookies and Tracking Technologies
            </h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to collect and
              track information about your browsing activities on our website.
              These technologies help us analyze website traffic, personalize
              content, and improve your experience.
            </p>
            <p>
              You can manage your cookie preferences through your browser
              settings. However, disabling cookies may limit your ability to use
              certain features of our website.
            </p>
          </section>

          <section className="mb-8" id="user-responsibilities">
            <h2 className="text-2xl font-semibold mb-4">
              7. User Responsibilities
            </h2>
            <p className="mb-4">
              While we take measures to protect your information, you also play
              a crucial role in maintaining the security of your account. We
              recommend that you:
            </p>
            <ul className="list-disc pl-6">
              <li>Use strong, unique passwords for your account</li>
              <li>Do not share your account credentials with others</li>
              <li>
                Log out of your account after using shared or public computers
              </li>
              <li>Keep your personal information up to date</li>
              <li>
                Be cautious when clicking on links or downloading attachments
                from unknown sources
              </li>
            </ul>
            <p className="mt-4">
              Please note that we cannot be held liable for security breaches
              resulting from your failure to adequately protect your account
              information.
            </p>
          </section>

          <section className="mb-8" id="your-rights-and-choices">
            <h2 className="text-2xl font-semibold mb-4">
              8. Your Rights and Choices
            </h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding
              your personal information, including:
            </p>
            <ul className="list-disc pl-6">
              <li>Accessing and obtaining a copy of your data</li>
              <li>Correcting inaccurate information</li>
              <li>Requesting deletion of your data</li>
              <li>Objecting to or restricting certain processing activities</li>
              <li>Withdrawing consent for data processing</li>
            </ul>
            <p className="mt-4">
              To exercise these rights or if you have any questions about our
              privacy practices, please contact us using the information
              provided in the <a href="/help">Help Center</a> section.
            </p>
          </section>

          <section className="mb-8" id="changes">
            <h2 className="text-2xl font-semibold mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We encourage you to review this policy
              periodically to stay informed about how we protect your
              information.
            </p>
          </section>

          <p className="mt-8  text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </section>
  );
}
