import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBookmark,
  FaBriefcase,
  FaChartBar,
  FaFilePdf,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const menu =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200";

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg border-r">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">Smart Job Tracker</h1>

        <p className="text-sm text-gray-500 mt-1">Placement Dashboard</p>
      </div>

      <nav className="p-4 space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${menu} ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`
          }
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `${menu} ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`
          }
        >
          <FaBookmark />
          Saved Jobs
        </NavLink>

        <NavLink
          to="/applied"
          className={({ isActive }) =>
            `${menu} ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`
          }
        >
          <FaBriefcase />
          Applications
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `${menu} ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`
          }
        >
          <FaChartBar />
          Analytics
        </NavLink>

        <NavLink
          to="/resume"
          className={({ isActive }) =>
            `${menu} ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`
          }
        >
          <FaFilePdf />
          Resume
        </NavLink>
      </nav>

      <div className="absolute bottom-8 left-4 right-4">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
