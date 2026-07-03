const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const {
  uploadResume,
  getResume,
  deleteResume,
} = require("../controllers/resumeController");

const { verifyAccessToken } = require("../middleware/authMiddleware");

router.post(
  "/upload",
  verifyAccessToken,
  upload.single("resume"),
  uploadResume,
);
router.delete("/", verifyAccessToken, deleteResume);

router.get("/", verifyAccessToken, getResume);

module.exports = router;
