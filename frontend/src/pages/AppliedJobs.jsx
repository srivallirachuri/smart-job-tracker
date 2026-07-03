import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import api from "../api/axios";

function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const res = await api.get("/applied-jobs");
      setJobs(res.data);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to load applied jobs.",
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this application?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/applied-jobs/${id}`);

      setJobs((prev) => prev.filter((job) => job.id !== id));

      toast.success("Application removed");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to remove application",
      );
    }
  };

  const updateJob = async (id, updates, showToast = false) => {
    try {
      await api.put(`/applied-jobs/${id}`, updates);

      setJobs((prev) =>
        prev.map((job) =>
          job.id === id
            ? {
                ...job,
                ...updates,
              }
            : job,
        ),
      );

      if (showToast) {
        toast.success("Application updated");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700";
      case "Interview":
        return "bg-yellow-100 text-yellow-700";
      case "Offer":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="max-w-6xl mx-auto p-8 text-center text-gray-600">
          Loading applications...
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
            <h1 className="text-3xl font-bold">Applied Jobs</h1>

            <p className="text-gray-500">
              Track interviews, offers and application progress.
            </p>
          </div>

          <span className="bg-black text-white px-5 py-2 rounded-full">
            {jobs.length} Applications
          </span>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            No applied jobs found.
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

                    <p className="text-sm text-gray-400 mt-2">
                      Applied:{" "}
                      {job.applied_date
                        ? new Date(job.applied_date).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-medium ${getStatusColor(
                      job.status,
                    )}`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="font-semibold block mb-2">Status</label>

                    <select
                      value={job.status || "Applied"}
                      onChange={(e) =>
                        updateJob(
                          job.id,
                          {
                            status: e.target.value,
                            notes: job.notes || "",
                            interview_date: job.interview_date,
                          },
                          true,
                        )
                      }
                      className="w-full border rounded-lg p-3"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold block mb-2">
                      Interview Date
                    </label>

                    <input
                      type="datetime-local"
                      value={
                        job.interview_date
                          ? new Date(job.interview_date)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        updateJob(
                          job.id,
                          {
                            status: job.status,
                            notes: job.notes || "",
                            interview_date: e.target.value,
                          },
                          true,
                        )
                      }
                      className="w-full border rounded-lg p-3"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="font-semibold block mb-2">Notes</label>

                  <textarea
                    rows={4}
                    value={job.notes || ""}
                    onChange={(e) =>
                      updateJob(job.id, {
                        status: job.status,
                        notes: e.target.value,
                        interview_date: job.interview_date,
                      })
                    }
                    placeholder="Interview feedback, coding rounds, recruiter comments..."
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div className="mt-6 p-5 rounded-xl bg-gray-50">
                  <h3 className="font-bold text-lg mb-4">Recruiter Details</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      readOnly
                      value={job.recruiter_name || ""}
                      placeholder="Recruiter Name"
                      className="border rounded-lg p-3 bg-white"
                    />

                    <input
                      readOnly
                      value={job.recruiter_email || ""}
                      placeholder="Recruiter Email"
                      className="border rounded-lg p-3 bg-white"
                    />

                    <input
                      readOnly
                      value={job.recruiter_phone || ""}
                      placeholder="Recruiter Phone"
                      className="border rounded-lg p-3 bg-white"
                    />

                    <input
                      readOnly
                      value={job.salary_offered || ""}
                      placeholder="Salary Offered"
                      className="border rounded-lg p-3 bg-white"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  {job.job_link && (
                    <a
                      href={job.job_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white px-5 py-3 rounded-lg hover:opacity-90"
                    >
                      View Job
                    </a>
                  )}

                  <button
                    onClick={() => deleteJob(job.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
                  >
                    Remove Application
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

export default AppliedJobs;
