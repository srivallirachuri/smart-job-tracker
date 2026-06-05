const express = require("express");

const router = express.Router();

const { register, login } = require("../controllers/authController");

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
module.exports = router;
