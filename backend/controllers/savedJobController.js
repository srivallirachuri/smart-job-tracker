const db = require("../config/db");

const getSavedJobs = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      sj.id,
      j.title,
      j.company,
      j.location,
      j.source,
      j.job_link
    FROM saved_jobs sj
    JOIN jobs j
      ON sj.job_id = j.id
    WHERE sj.user_id = ?
    ORDER BY sj.created_at DESC
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

const deleteSavedJob = (req, res) => {
  const savedId = req.params.id;

  db.query("DELETE FROM saved_jobs WHERE id=?", [savedId], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    res.json({
      message: "Job removed successfully",
    });
  });
};

module.exports = {
  getSavedJobs,
  deleteSavedJob,
};
