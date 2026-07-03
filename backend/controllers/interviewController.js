const db = require("../config/db");

const getUpcomingInterviews = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      aj.id,
      aj.interview_date,
      j.title,
      j.company,
      j.location
    FROM applied_jobs aj

    JOIN jobs j
      ON aj.job_id = j.id

    WHERE aj.user_id = ?
      AND aj.interview_date IS NOT NULL
      AND aj.interview_date > NOW()

    ORDER BY aj.interview_date ASC

    LIMIT 5
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

module.exports = {
  getUpcomingInterviews,
};
