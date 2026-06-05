const express = require("express");

const router = express.Router();

const { getJobs, saveJob } = require("../controllers/jobController");

const {
  jobsQueryValidation,
  saveJobValidation,
} = require("../validators/jobValidator");

const validate = require("../middleware/validationMiddleware");

const { verifyAccessToken } = require("../middleware/authMiddleware");

// Get jobs
router.get("/", verifyAccessToken, jobsQueryValidation, validate, getJobs);

// Save job
router.post(
  "/save/:jobId",
  verifyAccessToken,
  saveJobValidation,
  validate,
  saveJob,
);

module.exports = router;
