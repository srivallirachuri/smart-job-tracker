const express = require("express");

const router = express.Router();

const {
  applyJob,
  getAppliedJobs,
  updateAppliedJob,
  deleteAppliedJob,
} = require("../controllers/appliedJobController");

const { verifyAccessToken } = require("../middleware/authMiddleware");

router.post("/:jobId", verifyAccessToken, applyJob);

router.get("/", verifyAccessToken, getAppliedJobs);

router.put("/:id", verifyAccessToken, updateAppliedJob);

router.delete("/:id", verifyAccessToken, deleteAppliedJob);

module.exports = router;
