import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`flex items-center gap-2 px-5 py-3 rounded-xl transition
          ${
            page === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-black hover:text-white shadow"
          }`}
      >
        <FaChevronLeft />
        Previous
      </button>

      <div className="bg-black text-white px-6 py-3 rounded-xl font-semibold shadow">
        Page {page} of {totalPages}
      </div>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className={`flex items-center gap-2 px-5 py-3 rounded-xl transition
          ${
            page === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-black hover:text-white shadow"
          }`}
      >
        Next
        <FaChevronRight />
      </button>
    </div>
  );
}

export default Pagination;
