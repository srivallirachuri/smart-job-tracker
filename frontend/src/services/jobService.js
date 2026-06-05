import api from "../api/axios";

// Get jobs
export const getJobs = async (page, keyword, location, source, sort) => {
  const res = await api.get(
    `/jobs?page=${page}&limit=5&keyword=${keyword}&location=${location}&source=${source}&sort=${sort}`,
  );

  return res.data;
};

// Save job
export const saveJob = async (jobId) => {
  const res = await api.post(`/jobs/save/${jobId}`);

  return res.data;
};

// Get saved jobs
export const getSavedJobs = async () => {
  const res = await api.get("/jobs/saved");

  return res.data;
};
