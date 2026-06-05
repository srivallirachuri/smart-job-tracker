const { query, param } = require("express-validator");

// Validate job query params
const jobsQueryValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),

  query("sort")
    .optional()
    .isIn(["latest", "oldest", "company"])
    .withMessage("Invalid sort option"),
];

// Validate save job
const saveJobValidation = [
  param("jobId").isInt().withMessage("Job ID must be integer"),
];

module.exports = {
  jobsQueryValidation,
  saveJobValidation,
};
