function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="border px-4 py-2 rounded-lg disabled:opacity-50 bg-white"
      >
        Previous
      </button>

      <span className="font-medium">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages || totalPages === 0}
        onClick={() => setPage(page + 1)}
        className="border px-4 py-2 rounded-lg disabled:opacity-50 bg-white"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
