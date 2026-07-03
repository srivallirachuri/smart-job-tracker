import { FaBell, FaSearch } from "react-icons/fa";

function Header() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">{greeting} 👋</h1>

          <p className="text-gray-500 mt-2">
            Welcome back! Let's land your next opportunity.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <button className="relative">
            <FaBell
              size={22}
              className="text-gray-600 hover:text-black transition"
            />

            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"></span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center font-bold">
              S
            </div>

            <div>
              <p className="font-semibold">Srivalli</p>

              <p className="text-xs text-gray-500">Software Developer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-6">
        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          placeholder="Search jobs..."
          className="w-full border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-black outline-none"
        />
      </div>
    </div>
  );
}

export default Header;
