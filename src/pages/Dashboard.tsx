import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - MyApp";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      {/* Header */}
      <header className="bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-lg p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Dashboard
          </h1>
          <nav className="space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 px-6">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gray-700 bg-opacity-50 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 mb-4">
              Welcome to Your Dashboard
            </h2>
            <p className="text-gray-300">
              Explore a modern and intuitive interface designed for your needs.
            </p>
          </div>
        </section>

        {/* Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              Analytics Overview
            </h3>
            <p className="text-gray-400">
              Track your performance with real-time insights and stunning
              visuals.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-purple-300 mb-2">
              Project Management
            </h3>
            <p className="text-gray-400">
              Organize tasks and collaborate seamlessly with your team.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-green-300 mb-2">
              User Settings
            </h3>
            <p className="text-gray-400">
              Customize your experience with personalized options.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500">
          <p>&copy; 2025 MyApp. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
