import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TermsOfService = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen flex flex-col mt-16">
      {/* Header Section */}
      <header className="">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800">Terms of Service</h1>
          <p className="mt-2 text-lg text-gray-600">
            Please read these Terms of Service ("Terms") carefully before using
            the Wealthify application.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-6 space-y-8 shadow-emerald-700 shadow-md border border-emerald-700">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">
              1. Introduction
            </h2>
            <p className="mt-2 text-gray-700">
              Welcome to Wealthify—your trusted personal finance and budgeting
              application. These Terms govern your use of our services. By
              accessing or using Wealthify, you agree to be bound by these
              Terms.
            </p>
          </section>

          {/* 2. Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">
              2. Acceptance of Terms
            </h2>
            <p className="mt-2 text-gray-700">
              By creating an account and using Wealthify, you agree to abide by
              these Terms, as well as any updates or changes made in the future.
              If you do not agree with these Terms, please do not use our
              services.
            </p>
          </section>

          {/* 3. User Obligations */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">
              3. User Obligations
            </h2>
            <p className="mt-2 text-gray-700">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. Misuse or unauthorized access is strictly prohibited.
            </p>
          </section>

          {/* 4. Account and Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">
              4. Account and Security
            </h2>
            <p className="mt-2 text-gray-700">
              It is your responsibility to ensure that all information provided
              is accurate. Wealthify reserves the right to suspend or terminate
              accounts found to be in breach of these Terms.
            </p>
          </section>

          {/* 5. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">
              5. Limitation of Liability
            </h2>
            <p className="mt-2 text-gray-700">
              Wealthify is provided on an "as-is" basis without any warranties,
              express or implied. We are not liable for any indirect,
              incidental, or consequential damages arising from your use of our
              application.
            </p>
          </section>

          {/* 6. Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">
              6. Governing Law
            </h2>
            <p className="mt-2 text-gray-700">
              These Terms shall be governed by and construed in accordance with
              the laws applicable in your jurisdiction, without regard to
              conflict of law principles.
            </p>
          </section>

          {/* 7. Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">
              7. Changes to Terms
            </h2>
            <p className="mt-2 text-gray-700">
              Wealthify reserves the right to modify or update these Terms at
              any time. We will notify users of significant changes by updating
              this page. Your continued use of the service implies acceptance of
              any modified Terms.
            </p>
          </section>

          {/* 8. Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">
              8. Contact Information
            </h2>
            <p className="mt-2 text-gray-700">
              If you have any questions, concerns, or feedback about these
              Terms, please contact us at{" "}
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

export default TermsOfService;
