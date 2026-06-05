const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middleware/authMiddleware");

router.get("/test", verifyAccessToken, (req, res) => {
  res.json({ message: "Protected route working" });
});

module.exports = router;
