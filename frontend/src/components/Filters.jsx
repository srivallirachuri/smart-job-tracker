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
  return (
    <div className="bg-white rounded-2xl shadow p-6 grid md:grid-cols-4 gap-4 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search jobs"
        value={keyword}
        onChange={(e) => {
          setPage(1);
          setKeyword(e.target.value);
        }}
        className="border rounded-lg px-4 py-3"
      />

      {/* Location */}
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => {
          setPage(1);
          setLocation(e.target.value);
        }}
        className="border rounded-lg px-4 py-3"
      />

      {/* Source */}
      <select
        value={source}
        onChange={(e) => {
          setPage(1);
          setSource(e.target.value);
        }}
        className="border rounded-lg px-4 py-3"
      >
        <option value="">All Sources</option>

        <option value="RemoteOK">RemoteOK</option>
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => {
          setPage(1);
          setSort(e.target.value);
        }}
        className="border rounded-lg px-4 py-3"
      >
        <option value="latest">Latest</option>

        <option value="oldest">Oldest</option>

        <option value="company">Company</option>
      </select>
    </div>
  );
}

export default Filters;
