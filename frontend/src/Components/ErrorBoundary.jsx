import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so that the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details for debugging.
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4 text-center">
            Something went wrong.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 text-center">
            We're sorry for the inconvenience. Please try refreshing the page or
            come back later.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
