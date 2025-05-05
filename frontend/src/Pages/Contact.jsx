import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    navigate("/");
    console.log(formData);
    // Reset the form
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
    <div className="w-full mt-12">
      {/* Hero Section */}
      <section className="py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-700">
            Have questions or need assistance? Reach out to us and we’ll be
            happy to help!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-6">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Get in Touch
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full border border-emerald-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full border border-emerald-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full border border-emerald-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="6"
                  className="w-full border border-emerald-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-md hover:bg-emrald-800 transition duration-300 cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Office Address */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Office
              </h2>
              <p className="text-gray-600">
                123 Finance Street, Suite 100
                <br />
                Bhilwara, Rajasthan 311001
                <br />
                India
              </p>
            </div>
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Contact Details
              </h2>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Phone:</span> +1 234 567 890
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Email:</span>{" "}
                support@wealthify.com
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Business Hours:</span> Mon -
                Fri: 9 AM - 5 PM
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
