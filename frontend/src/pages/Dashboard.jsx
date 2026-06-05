import { useEffect, useState } from "react";

import { getJobs } from "../services/jobService";

import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [keyword, setKeyword] = useState("");

  const [location, setLocation] = useState("");

  const [source, setSource] = useState("");

  const [sort, setSort] = useState("latest");

  const [loading, setLoading] = useState(false);

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const data = await getJobs(page, keyword, location, source, sort);

      setJobs(data.jobs);

      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto fetch
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchJobs();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [page, keyword, location, source, sort]);

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <Filters
          keyword={keyword}
          setKeyword={setKeyword}
          location={location}
          setLocation={setLocation}
          source={source}
          setSource={setSource}
          sort={sort}
          setSort={setSort}
          setPage={setPage}
        />

        {/* Loading */}
        {loading && <p className="text-center text-gray-600">Loading...</p>}

        {/* Empty */}
        {!loading && jobs.length === 0 && (
          <p className="text-center text-gray-500">No jobs found</p>
        )}

        {/* Jobs */}
        <div className="grid gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}

export default Dashboard;
