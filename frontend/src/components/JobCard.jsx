import {
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaBookmark,
  FaClock,
  FaBuilding,
} from "react-icons/fa";

import toast from "react-hot-toast";

import api from "../api/axios";
import { saveJob } from "../services/jobService";

function JobCard({ job }) {
  const handleSaveJob = async () => {
    try {
      const data = await saveJob(job.id);

      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to save job");
    }
  };

  const applyJob = async () => {
    try {
      await api.post(`/applied-jobs/${job.id}`);

      toast.success("Application added");
    } catch (err) {
      toast.error(err.response?.data?.message || "Already applied");
    }
  };

  const sourceColor = () => {
    switch (job.source?.toLowerCase()) {
      case "linkedin":
        return "bg-blue-100 text-blue-700";

      case "indeed":
        return "bg-green-100 text-green-700";

      case "naukri":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1 p-6">
      {/* Header */}

      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">{job.title}</h2>

          <div className="flex items-center gap-2 mt-2 text-gray-700">
            <FaBuilding />

            {job.company}
          </div>

          <div className="flex items-center gap-2 mt-2 text-gray-500">
            <FaMapMarkerAlt />

            {job.location}
          </div>
        </div>

        <span className={`px-4 py-2 rounded-full font-medium ${sourceColor()}`}>
          {job.source}
        </span>
      </div>

      {/* Tags */}

      <div className="flex flex-wrap gap-3 mt-6">
        <span className="bg-gray-100 px-3 py-2 rounded-full text-sm">
          💻 Software
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm">
          🌍 Remote
        </span>

        <span className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-full text-sm">
          Full Time
        </span>
      </div>

      {/* Description */}

      <div className="mt-6 text-gray-600 leading-7">
        {job.description
          ? `${job.description.substring(0, 180)}...`
          : "No description available."}
      </div>

      {/* Posted */}

      <div className="flex items-center gap-2 mt-5 text-gray-500 text-sm">
        <FaClock />
        Posted Recently
      </div>

      {/* Buttons */}

      <div className="flex flex-wrap gap-4 mt-8">
        <a
          href={job.job_link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:scale-105 transition"
        >
          <FaExternalLinkAlt />
          View Job
        </a>

        <button
          onClick={handleSaveJob}
          className="flex items-center gap-2 border border-black px-5 py-3 rounded-xl hover:bg-gray-100 transition"
        >
          <FaBookmark />
          Save
        </button>

        <button
          onClick={applyJob}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default JobCard;
