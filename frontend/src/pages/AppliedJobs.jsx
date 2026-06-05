import { useEffect, useState } from "react";

import api from "../api/axios";

import { Link } from "react-router-dom";

function AppliedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const res = await api.get("/jobs/applied");

      setJobs(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const updateStatus = async (appliedId, status) => {
    try {
      await api.put(`/jobs/applied/${appliedId}`, {
        status,
        notes: "",
      });

      setJobs((prev) =>
        prev.map((job) =>
          job.applied_id === appliedId ? { ...job, status } : job,
        ),
      );
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Applied Jobs</h1>

      <Link to="/">Dashboard</Link>

      {jobs.map((job) => (
        <div
          key={job.applied_id}
          style={{
            border: "1px solid gray",

            margin: "10px 0",

            padding: "10px",
          }}
        >
          <h2>{job.title}</h2>

          <p>{job.company}</p>

          <p>{job.location}</p>

          <p>
            Status:
            <strong>{job.status}</strong>
          </p>

          <select
            value={job.status}
            onChange={(e) => updateStatus(job.applied_id, e.target.value)}
          >
            <option value="Applied">Applied</option>

            <option value="Interview">Interview</option>

            <option value="Rejected">Rejected</option>

            <option value="Offer">Offer</option>
          </select>

          <br />
          <br />

          <a href={job.job_link} target="_blank" rel="noreferrer">
            Open Job
          </a>
        </div>
      ))}
    </div>
  );
}

export default AppliedJobs;
