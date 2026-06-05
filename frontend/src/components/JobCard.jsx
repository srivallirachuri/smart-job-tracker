import { saveJob } from "../services/jobService";

function JobCard({ job }) {
  const handleSaveJob = async () => {
    try {
      const data = await saveJob(job.id);

      alert(data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save");
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-black">{job.title}</h2>

          <p className="text-gray-700 mt-1">{job.company}</p>

          <p className="text-sm text-gray-500 mt-1">{job.location}</p>
        </div>

        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          {job.source}
        </span>
      </div>

      <div className="flex gap-3 mt-6 flex-wrap">
        <a
          href={job.job_link}
          target="_blank"
          rel="noreferrer"
          className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          Apply
        </a>

        <button
          onClick={handleSaveJob}
          className="border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default JobCard;
