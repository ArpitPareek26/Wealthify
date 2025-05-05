import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Update form data as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    navigate("/");
    console.log("Form submitted:", formData);
    // Clear form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col mt-16">
      {/* Header */}
      <header className="">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Wealthify Support
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            We're here to help you on your personal finance journey. Reach out
            to us anytime.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <section className="bg-white rounded-lg p-6 shadow-emerald-700 shadow-md border border-emerald-700">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Contact Support
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-emerald-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 p-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-emerald-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 p-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-emerald-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 p-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Describe your issue in detail..."
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-emerald-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 p-2"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-semibold rounded-md text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
          </section>

          {/* Other Support Options */}
          <section className="bg-white rounded-lg  p-6 shadow-emerald-700 shadow-md border border-emerald-700">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Other Ways to Get Support
            </h2>
            <ul className="space-y-6">
              <li>
                <h3 className="text-lg font-medium text-gray-700">Email:</h3>
                <p className="text-gray-600">support@wealthify.com</p>
              </li>
              <li>
                <h3 className="text-lg font-medium text-gray-700">Phone:</h3>
                <p className="text-gray-600">+1 (123) 456-7890</p>
              </li>
              <li>
                <h3 className="text-lg font-medium text-gray-700">
                  Live Chat:
                </h3>
                <p className="text-gray-600">Available 9am — 5pm (Mon-Fri)</p>
              </li>
              <li>
                <h3 className="text-lg font-medium text-gray-700">FAQ:</h3>
                <p className="text-gray-600">
                  For quick answers, visit our FAQ page which covers a range of
                  common questions on budgeting, expense tracking, and more.
                </p>
                <a
                  href="/faq"
                  className="text-indigo-600 hover:text-indigo-800 font-medium inline-block mt-2"
                >
                  Go to FAQ
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          © 2025 Wealthify. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Support;
