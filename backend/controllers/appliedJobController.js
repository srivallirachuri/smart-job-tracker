const db = require("../config/db");

// Apply Job
const applyJob = (req, res) => {
  const userId = req.user.id;
  const jobId = req.params.jobId;

  db.query(
    "SELECT * FROM applied_jobs WHERE user_id=? AND job_id=?",
    [userId, jobId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (rows.length > 0) {
        return res.status(400).json({
          message: "Already applied",
        });
      }

      db.query(
        "INSERT INTO applied_jobs (user_id, job_id) VALUES (?, ?)",
        [userId, jobId],
        (err) => {
          if (err) {
            return res.status(500).json({
              message: "Database error",
            });
          }

          res.status(201).json({
            message: "Applied successfully",
          });
        },
      );
    },
  );
};
// Get Applied Jobs
const getAppliedJobs = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      aj.id,
      aj.status,
      aj.notes,
      aj.interview_date,
  aj.recruiter_name,
  aj.recruiter_email,
  aj.recruiter_phone,
  aj.salary_offered,
  aj.applied_date,
      aj.applied_date,
      aj.interview_date,
      j.title,
      j.company,
      j.location,
      j.job_link
    FROM applied_jobs aj
    JOIN jobs j
      ON aj.job_id = j.id
    WHERE aj.user_id = ?
    ORDER BY aj.applied_date DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    res.json(results);
  });
};

// Update Status
const updateAppliedJob = (req, res) => {
  const id = req.params.id;

  const {
    status,
    notes,
    interview_date,
    recruiter_name,
    recruiter_email,
    recruiter_phone,
    salary_offered,
  } = req.body;

  const sql = `
    UPDATE applied_jobs
    SET
      status = ?,
      notes = ?,
      interview_date = ?,
      recruiter_name = ?,
      recruiter_email = ?,
      recruiter_phone = ?,
      salary_offered = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      status,
      notes,
      interview_date,
      recruiter_name,
      recruiter_email,
      recruiter_phone,
      salary_offered,
      id,
    ],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      res.json({
        message: "Application updated",
      });
    },
  );
};

// Delete
const deleteAppliedJob = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM applied_jobs WHERE id=?", [id], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    res.json({
      message: "Application deleted",
    });
  });
};

module.exports = {
  applyJob,
  getAppliedJobs,
  updateAppliedJob,
  deleteAppliedJob,
};
