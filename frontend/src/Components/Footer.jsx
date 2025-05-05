import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-emerald-700 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Branding Section */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold">Wealthify</h2>
            <p className="mt-2">
              Empowering you to take control of your finances.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul>
                <li className="mb-2 hover:underline">
                  <Link to="/">Home</Link>
                </li>
                <li className="mb-2 hover:underline">
                  <Link to="/about">About</Link>
                </li>
                <li className="mb-2 hover:underline">
                  <Link to="/services">Services</Link>
                </li>
                <li className="hover:underline">
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Resources</h3>
              <ul>
                <li className="mb-2 hover:underline">
                  <Link to="/blog">Blog</Link>
                </li>
                <li className="mb-2 hover:underline">
                  <Link to="/faq">FAQ</Link>
                </li>
                <li className="hover:underline">
                  <Link to="/support">Support</Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Legal</h3>
              <ul>
                <li className="mb-2 hover:underline">
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li className="hover:underline">
                  <Link to="/terms">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gary-200 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="">
            &copy; {new Date().getFullYear()} Wealthify. All rights reserved by
            Arpit Pareek.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
