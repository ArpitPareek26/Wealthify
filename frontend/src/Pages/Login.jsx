import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../AuthContext";

const Login = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth(); // Retrieve the global login function

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Build the form data from component state
    const formData = { email, password };

    try {
      const response = await axios.post(
        "https://wealthify-backend.onrender.com/api/auth/users/login",
        formData, {
        withCredentials: true,}
      );

      if (response.status === 200) {
        toast.success("Login successful!");
        console.log("Login successful", response.data);

        // Assume the API returns { token, user } in response.data
        const { token, user } = response.data;

        // Update the global authentication state using the AuthContext
        login(token, user);

        // Navigate to the homepage after logging in
        navigate("/");
      } else {
        toast.error("Login failed!");
        console.error("Login failed", response.data.message);
      }
    } catch (error) {
      // Check if the server provided a response
      if (error.response) {
        console.error("Error response:", error.response);

        if (error.response.status === 401) {
          toast.error(
            "Invalid credentials! Please check your email and password."
          );
        } else if (error.response.status === 400) {
          toast.error("Bad request. Please verify your input values.");
        } else if (error.response.status === 500) {
          toast.error("Internal server error. Please try again later.");
        } else {
          toast.error(
            error.response.data.message ||
              "An error occurred. Please try again."
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error(
          "No response from server. Please check your network connection."
        );
        console.error("Error request:", error.request);
      } else {
        // Something happened when setting up the request
        toast.error("Error: " + error.message);
        console.error("General error:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-12">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Wealthify</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your personal finances effortlessly.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
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
              className="w-full px-4 py-2 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
              placeholder="you@example.com"
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
              className="w-full px-4 py-2 border border-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-emerald-700 border border-emerald-700 rounded focus:ring-emerald-700"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div>
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
          >
            Login
          </button>
          <p className="mt-6 text-center text-gray-700">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
