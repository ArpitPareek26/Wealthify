import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import banner from "../assets/banner.jpg";
const Blog = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // Dummy blog post data;
  const posts = [
    {
      id: 1,
      title: "Mastering Budgeting Basics",
      excerpt:
        "Discover how to build and manage a budget that works for you by understanding your cash flow and prioritizing your expenses.",
      date: "April 27, 2025",
      image: img1,
      link: "/blog/mastering-budgeting-basics",
    },
    {
      id: 2,
      title: "Expense Tracking Tips",
      excerpt:
        "Learn essential strategies to track your spending habits and eliminate unnecessary expenses so you can save more.",
      date: "April 26, 2025",
      image: img2,
      link: "/blog/expense-tracking-tips",
    },
    {
      id: 3,
      title: "Savings Strategies for Beginners",
      excerpt:
        "Explore simple yet effective techniques for saving money, building an emergency fund, and achieving financial freedom.",
      date: "April 25, 2025",
      image: banner,
      link: "/blog/savings-strategies-for-beginners",
    },
  ];

  return (
    <div className="min-h-screen mt-16">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800">Wealthify Blog</h1>
          <p className="mt-2 text-lg text-gray-600">
            Empowering you to take control of your finances with insights and
            practical tips.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        {/* Grid layout for blog posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg  overflow-hidden transition transform hover:scale-105 shadow-emerald-700 shadow-md border border-emerald-700"
            >
              <img
                className="w-full h-48 object-cover"
                src={post.image}
                alt={post.title}
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600 mt-2">{post.excerpt}</p>
                <p className="text-gray-500 text-sm mt-4">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;
