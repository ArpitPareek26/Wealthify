import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Form state variables
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic password match check
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Build the form data object to send to the server
    const formData = {
      name: fullName,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/users/register",
        formData
      );
      toast.success("Sign-up successful! Please login to continue.", {
        duration: 5000,
      });
      navigate("/login");
    } catch (error) {
      // Check if the error is from the server's response
      if (error.response) {
        // Log detailed error information
        console.error("Error response:", error.response.data);

        if (error.response.status === 409) {
          // 409 Conflict: User already exists
          toast.error(error.response.data.message || "User already exists!");
        } else if (error.response.status === 500) {
          // 500 Internal Server Error
          toast.error("Internal server error. Please try again later.");
        } else {
          // Any other error with a response status
          toast.error(
            error.response.data.message ||
              "An error occurred. Please try again."
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error(
          "No response received from the server. Please try again later."
        );
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error("An error occurred: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-15">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Wealthify</h1>
          <p className="mt-2 text-sm text-gray-600">
            Start building your financial future today.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
          >
            Sign Up
          </button>
          <p className="mt-6 text-center text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
