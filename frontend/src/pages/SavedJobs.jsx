import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import api from "../api/axios";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const res = await api.get("/saved-jobs");

      setJobs(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to load saved jobs.");
    } finally {
      setLoading(false);
    }
  };

  const removeJob = async (id) => {
    const confirmDelete = window.confirm("Remove this saved job?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/saved-jobs/${id}`);

      setJobs((prev) => prev.filter((job) => job.id !== id));

      toast.success("Job removed successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove job.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="max-w-6xl mx-auto p-8 text-center text-gray-600">
          Loading saved jobs...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Saved Jobs</h1>

            <p className="text-gray-500">Jobs you've bookmarked for later.</p>
          </div>

          <span className="bg-black text-white px-5 py-2 rounded-full">
            {jobs.length} Saved
          </span>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">No Saved Jobs</h2>

            <p className="text-gray-500">
              Save interesting jobs from the dashboard and they'll appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{job.title}</h2>

                    <p className="text-gray-700 mt-1">{job.company}</p>

                    <p className="text-gray-500">{job.location}</p>
                  </div>

                  <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                    Saved
                  </span>
                </div>

                <div className="flex gap-4 mt-8 flex-wrap">
                  <a
                    href={job.job_link}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-black text-white px-5 py-3 rounded-lg hover:opacity-90 transition"
                  >
                    View Job
                  </a>

                  <button
                    onClick={() => removeJob(job.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedJobs;
