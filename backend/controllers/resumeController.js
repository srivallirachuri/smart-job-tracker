const db = require("../config/db");

const uploadResume = (req, res) => {
  const userId = req.user.id;

  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  const fileName = req.file.filename;

  const filePath = req.file.path;

  db.query(
    `
    INSERT INTO resumes
    (user_id, file_name, file_path)
    VALUES (?, ?, ?)
    `,
    [userId, fileName, filePath],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      res.status(201).json({
        message: "Resume uploaded successfully",
      });
    },
  );
};

const getResume = (req, res) => {
  const userId = req.user.id;

  db.query(
    `
    SELECT *
    FROM resumes
    WHERE user_id=?
    ORDER BY uploaded_at DESC
    LIMIT 1
    `,
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "No resume found",
        });
      }

      res.json(results[0]);
    },
  );
};
const fs = require("fs");

const deleteResume = (req, res) => {
  const userId = req.user.id;

  db.query(
    `
    SELECT * FROM resumes
    WHERE user_id=?
    ORDER BY uploaded_at DESC
    LIMIT 1
    `,
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Resume not found",
        });
      }

      const resume = results[0];

      if (fs.existsSync(resume.file_path)) {
        fs.unlinkSync(resume.file_path);
      }

      db.query("DELETE FROM resumes WHERE id=?", [resume.id], (err) => {
        if (err) {
          return res.status(500).json({
            message: "Database error",
          });
        }

        res.json({
          message: "Resume deleted successfully",
        });
      });
    },
  );
};

module.exports = {
  uploadResume,
  getResume,
  deleteResume,
};
