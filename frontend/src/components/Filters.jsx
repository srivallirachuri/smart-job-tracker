import {
  FaSearch,
  FaMapMarkerAlt,
  FaSortAmountDown,
  FaGlobe,
} from "react-icons/fa";

function Filters({
  keyword,
  setKeyword,
  location,
  setLocation,
  source,
  setSource,
  sort,
  setSort,
  setPage,
}) {
  const clearFilters = () => {
    setKeyword("");
    setLocation("");
    setSource("");
    setSort("latest");
    setPage(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Find Jobs</h2>

          <p className="text-gray-500">Search and filter opportunities</p>
        </div>

        <button
          onClick={clearFilters}
          className="border px-4 py-2 rounded-xl hover:bg-gray-100 transition"
        >
          Clear Filters
        </button>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        {/* Search */}

        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Job title..."
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(1);
            }}
            className="w-full border rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        {/* Location */}

        <div className="relative">
          <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Location..."
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setPage(1);
            }}
            className="w-full border rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        {/* Source */}

        <div className="relative">
          <FaGlobe className="absolute left-4 top-4 text-gray-400" />

          <select
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setPage(1);
            }}
            className="w-full border rounded-xl py-3 pl-11 pr-4 appearance-none focus:ring-2 focus:ring-black outline-none"
          >
            <option value="">All Sources</option>

            <option value="LinkedIn">LinkedIn</option>

            <option value="Indeed">Indeed</option>

            <option value="Naukri">Naukri</option>
          </select>
        </div>

        {/* Sort */}

        <div className="relative">
          <FaSortAmountDown className="absolute left-4 top-4 text-gray-400" />

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="w-full border rounded-xl py-3 pl-11 pr-4 appearance-none focus:ring-2 focus:ring-black outline-none"
          >
            <option value="latest">Latest</option>

            <option value="oldest">Oldest</option>

            <option value="company">Company A-Z</option>

            <option value="location">Location</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;
