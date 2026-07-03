import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import Header from "../components/Header";
import DashboardStats from "../components/DashboardStats";
import UpcomingInterviews from "../components/UpcomingInterviews";
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";

import { getJobs } from "../services/jobService";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("latest");

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

  useEffect(() => {
    const delay = setTimeout(fetchJobs, 400);

    return () => clearTimeout(delay);
  }, [page, keyword, location, source, sort]);

  return (
    <Layout>
      <Header />

      <DashboardStats />

      <UpcomingInterviews />

      <div className="mt-8">
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
      </div>

      {loading && (
        <div className="mt-10 text-center text-gray-500">Loading jobs...</div>
      )}

      {!loading && jobs.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center mt-8">
          <h2 className="text-2xl font-bold">No Jobs Found</h2>

          <p className="text-gray-500 mt-3">
            Try changing filters or search keywords.
          </p>
        </div>
      )}

      {!loading && jobs.length > 0 && (
        <div className="grid gap-6 mt-8">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      <div className="mt-10">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </Layout>
  );
}

export default Dashboard;
