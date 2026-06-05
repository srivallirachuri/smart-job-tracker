const db = require("../config/db");

// Fetch jobs from DB
const fetchJobs = (whereSQL, orderBy, values, limit, offset) => {
  return new Promise((resolve, reject) => {
    const jobsQuery = `
      SELECT *
      FROM jobs
      ${whereSQL}
      ${orderBy}
      LIMIT ?
      OFFSET ?
    `;

    db.query(jobsQuery, [...values, limit, offset], (err, results) => {
      if (err) {
        return reject(err);
      }

      resolve(results);
    });
  });
};

// Count jobs
const countJobs = (whereSQL, values) => {
  return new Promise((resolve, reject) => {
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM jobs
      ${whereSQL}
    `;

    db.query(countQuery, values, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result[0].total);
    });
  });
};

// Save job
const saveJobToDB = (userId, jobId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `
      INSERT INTO saved_jobs
      (user_id, job_id)
      VALUES (?, ?)
      `,
      [userId, jobId],
      (err, result) => {
        if (err) {
          return reject(err);
        }

        resolve(result);
      },
    );
  });
};

module.exports = {
  fetchJobs,
  countJobs,
  saveJobToDB,
};
