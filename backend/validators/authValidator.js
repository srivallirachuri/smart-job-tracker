const { body } = require("express-validator");

// Register validation
const registerValidation = [
  body("email").isEmail().withMessage("Valid email required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// Login validation
const loginValidation = [
  body("email").isEmail().withMessage("Valid email required"),

  body("password").notEmpty().withMessage("Password required"),
];

module.exports = {
  registerValidation,
  loginValidation,
};
