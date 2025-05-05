import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PrivacyPolicy = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen flex flex-col mt-16">
      {/* Header Section */}
      <header className="">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
          <p className="mt-2 text-lg text-gray-600">
            At Wealthify, we are committed to protecting your privacy and
            ensuring the security of your personal and financial data.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-6 shadow-emerald-700 shadow-md border border-emerald-700">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Introduction</h2>
            <p className="mt-2 text-gray-700">
              This Privacy Policy explains how Wealthify collects, uses, and
              discloses your information when you use our Personal Finance &
              Budgeting application. We are dedicated to providing a secure and
              trustworthy service.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Information We Collect
            </h2>
            <p className="mt-2 text-gray-700">
              Wealthify collects various types of information to help you manage
              your finances. This includes:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>
                <strong>Personal Information:</strong> Your name, email address,
                and contact details.
              </li>
              <li>
                <strong>Financial Information:</strong> Data about your income,
                expenses, budgeting details, and spending patterns.
              </li>
              <li>
                <strong>Usage Data:</strong> Information on how you interact
                with the app to help improve our services.
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              How We Use Your Information
            </h2>
            <p className="mt-2 text-gray-700">
              The information we gather is used for several purposes, including:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Providing and maintaining our service</li>
              <li>Personalizing your experience with Wealthify</li>
              <li>Communicating updates and important information</li>
              <li>Offering customer support and troubleshooting issues</li>
              <li>Monitoring and analyzing usage trends</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Data Security</h2>
            <p className="mt-2 text-gray-700">
              We value your trust and use commercially acceptable means to
              protect your personal and financial data. However, please remember
              that no method of transmission over the internet is 100% secure.
            </p>
          </section>

          {/* Cookies and Tracking Technologies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Cookies and Tracking Technologies
            </h2>
            <p className="mt-2 text-gray-700">
              We use cookies and similar tracking technologies to enhance your
              experience, analyze site performance, and gather demographic
              information. You have the option to disable cookies through your
              browser settings, but this might affect some functionalities.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Your Rights</h2>
            <p className="mt-2 text-gray-700">
              You have the right to access, update, or delete your personal
              information at any time. If you have any questions or would like
              to exercise your rights, please contact us at{" "}
              <a
                href="mailto:support@wealthify.com"
                className="text-indigo-600 hover:text-indigo-800"
              >
                support@wealthify.com
              </a>
              .
            </p>
          </section>

          {/* Changes to This Privacy Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Changes to This Privacy Policy
            </h2>
            <p className="mt-2 text-gray-700">
              We may update our Privacy Policy from time to time. Any changes
              will be posted on this page, and we recommend reviewing our policy
              periodically to stay informed.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
            <p className="mt-2 text-gray-700">
              If you have any questions regarding this Privacy Policy, please
              feel free to contact us by email at{" "}
              <a
                href="mailto:support@wealthify.com"
                className="text-indigo-600 hover:text-indigo-800"
              >
                support@wealthify.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          © 2025 Wealthify. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
