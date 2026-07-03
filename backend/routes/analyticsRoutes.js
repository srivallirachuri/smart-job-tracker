const express = require("express");

const router = express.Router();

const { getAnalytics } = require("../controllers/analyticsController");

const { verifyAccessToken } = require("../middleware/authMiddleware");

router.get("/", verifyAccessToken, getAnalytics);

module.exports = router;
