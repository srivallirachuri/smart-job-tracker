import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaBookmark,
  FaBriefcase,
  FaChartBar,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  const linkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-black text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">
          <div className="bg-black text-white p-3 rounded-xl">
            <FaBriefcase size={22} />
          </div>

          <div>
            <h1 className="font-bold text-2xl">Smart Job Tracker</h1>

            <p className="text-sm text-gray-500">Track every opportunity</p>
          </div>
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-2">
          <Link to="/" className={linkClass("/")}>
            <FaHome />
            Dashboard
          </Link>

          <Link to="/saved" className={linkClass("/saved")}>
            <FaBookmark />
            Saved
          </Link>

          <Link to="/applied" className={linkClass("/applied")}>
            <FaBriefcase />
            Applied
          </Link>

          <Link to="/analytics" className={linkClass("/analytics")}>
            <FaChartBar />
            Analytics
          </Link>

          <Link to="/resume" className={linkClass("/resume")}>
            <FaFileAlt />
            Resume
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
