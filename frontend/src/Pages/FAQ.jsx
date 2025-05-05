import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// FAQItem component for individual FAQ entries
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <span className="text-2xl text-gray-500">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="mt-2 text-gray-700">{answer}</div>}
    </div>
  );
};

// Main FAQ page
const FAQ = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // List of FAQ items
  const faqData = [
    {
      question: "What is Wealthify?",
      answer:
        "Wealthify is a powerful personal finance application that empowers you to take control of your finances by tracking income and expenses, setting budgets, and analyzing spending patterns.",
    },
    {
      question: "How can I track my expenses?",
      answer:
        "You can track your expenses by entering your transactions manually or linking your bank accounts for automated tracking. The app then categorizes and analyzes your spending so you can pinpoint areas for improvement.",
    },
    {
      question: "Can I set budgets for different spending categories?",
      answer:
        "Absolutely. Wealthify lets you create custom budgets by category, so you can manage your finances with clarity and focus on the areas that matter most to you.",
    },
    {
      question: "Will I receive alerts if I exceed my budget?",
      answer:
        "Yes, Wealthify provides real-time notifications when your spending approaches or exceeds your preset limits, helping you stay informed and in control.",
    },
  ];

  return (
    <div className="min-h-screen mt-16">
      {/* Header Section */}
      <header className="">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800">Wealthify FAQ</h1>
          <p className="mt-2 text-lg text-gray-600">
            Frequently Asked Questions to help you master your personal
            finances.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-6 shadow-emerald-700 shadow-md border border-emerald-700">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FAQ;
