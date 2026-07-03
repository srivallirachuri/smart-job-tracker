const express = require("express");
const router = express.Router();

const {
  getSavedJobs,
  deleteSavedJob,
} = require("../controllers/savedJobController");

const { verifyAccessToken } = require("../middleware/authMiddleware");

// Test Route
router.get("/test", (req, res) => {
  res.json({
    message: "Saved Jobs Route Working",
  });
});

// Get Saved Jobs
router.get("/", verifyAccessToken, getSavedJobs);

// Delete Saved Job
router.delete("/:id", verifyAccessToken, deleteSavedJob);

module.exports = router;
