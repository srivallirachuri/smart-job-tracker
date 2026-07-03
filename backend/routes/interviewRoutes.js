const express = require("express");

const router = express.Router();

const { getUpcomingInterviews } = require("../controllers/interviewController");

const { verifyAccessToken } = require("../middleware/authMiddleware");

router.get("/upcoming", verifyAccessToken, getUpcomingInterviews);

module.exports = router;
