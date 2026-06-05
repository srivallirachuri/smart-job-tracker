import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    window.location.href = "/login";
  };

  return (
    <div className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-black">Smart Job Tracker</h1>

      <div className="flex gap-4 items-center">
        <Link to="/saved" className="text-gray-700 hover:text-black">
          Saved Jobs
        </Link>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
