import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Animated 404 Circle */}
      <div className="bg-emerald-700 rounded-full w-32 h-32 flex items-center justify-center animate-bounce shadow-lg">
        <span className="text-white text-5xl font-bold">404</span>
      </div>
      {/* Not Found Message */}
      <h1 className="mt-6 text-4xl font-bold text-gray-800 text-center">
        Oops! Page Not Found.
      </h1>
      <p className="mt-2 text-lg text-gray-600 text-center max-w-md">
        The page you're looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      {/* Link to go back Home */}
      <Link
        to="/"
        className="mt-6 inline-block bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
