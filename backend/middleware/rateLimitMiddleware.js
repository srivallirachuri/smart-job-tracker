const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // allow 1000 requests
  message: {
    message: "Too many requests. Try again later.",
  },

  standardHeaders: true,

  legacyHeaders: false,
});

// Strict login limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 10000,

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
