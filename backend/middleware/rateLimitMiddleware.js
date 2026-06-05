const rateLimit = require("express-rate-limit");

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins

  max: 100, // max requests

  message: {
    message: "Too many requests, try again later",
  },

  standardHeaders: true,

  legacyHeaders: false,
});

// Strict login limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 5,

  message: {
    message: "Too many login attempts",
  },

  standardHeaders: true,

  legacyHeaders: false,
});

module.exports = {
  apiLimiter,
  loginLimiter,
};
