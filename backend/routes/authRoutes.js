const express = require("express");

const router = express.Router();

const { register, login, refresh } = require("../controllers/authController");

const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");

const { loginLimiter } = require("../middleware/rateLimitMiddleware");

const validate = require("../middleware/validationMiddleware");

// Register
router.post("/register", registerValidation, validate, register);

// Login
router.post("/login", loginLimiter, loginValidation, validate, login);

// Refresh Access Token
router.post("/refresh", refresh);

module.exports = router;
