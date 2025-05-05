import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import Transaction from "./Pages/Transactions";
import Budgets from "./Pages/Budgets";
import Reports from "./Pages/Reports";
import NotFound from "./Pages/NotFound";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./Components/ErrorBoundary";
import ProtectedRoute from "./Components/ProtectedRoute";
import Blog from "./Pages/Blog";
import FAQ from "./Pages/Faq";
import Support from "./Pages/Support";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsOfService from "./Pages/TermsOfService";

const App = () => {
  return (
    <>
      <div>
        <ErrorBoundary>
          <AuthProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <Transaction />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/budgets"
                element={
                  <ProtectedRoute>
                    <Budgets />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Reports />{" "}
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/support" element={<Support />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
            <Footer />
          </AuthProvider>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
