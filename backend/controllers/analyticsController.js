const db = require("../config/db");

const getAnalytics = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      COUNT(*) AS totalApplied,

      SUM(status='Interview') AS interviews,

      SUM(status='Offer') AS offers,

      SUM(status='Rejected') AS rejected

    FROM applied_jobs

    WHERE user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    const stats = results[0];

    const successRate =
      stats.totalApplied > 0
        ? ((stats.offers / stats.totalApplied) * 100).toFixed(1)
        : 0;

    res.json({
      totalApplied: stats.totalApplied || 0,

      interviews: stats.interviews || 0,

      offers: stats.offers || 0,

      rejected: stats.rejected || 0,

      successRate,
    });
  });
};

module.exports = {
  getAnalytics,
};
