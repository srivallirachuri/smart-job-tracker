import { useEffect, useState } from "react";

import api from "../api/axios";

import { Link } from "react-router-dom";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(false);

  // Fetch saved jobs
  const fetchSavedJobs = async () => {
    try {
      setLoading(true);

      const res = await api.get("/jobs/saved");

      setJobs(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  // Remove saved job
  const handleRemove = async (savedId) => {
    try {
      await api.delete(`/jobs/saved/${savedId}`);

      // Optimistic UI update
      setJobs((prevJobs) => prevJobs.filter((job) => job.saved_id !== savedId));
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Saved Jobs</h1>

      <Link to="/">Back to Dashboard</Link>

      {loading && <p>Loading...</p>}

      {!loading && jobs.length === 0 && <p>No saved jobs</p>}

      {jobs.map((job) => (
        <div
          key={job.saved_id}
          style={{
            border: "1px solid gray",

            margin: "10px 0",

            padding: "10px",
          }}
        >
          <h2>{job.title}</h2>

          <p>{job.company}</p>

          <p>{job.location}</p>

          <p>{job.source}</p>

          <a href={job.job_link} target="_blank" rel="noreferrer">
            Apply
          </a>

          <br />
          <br />

          <button onClick={() => handleRemove(job.saved_id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default SavedJobs;
