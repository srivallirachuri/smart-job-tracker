const NodeCache = require("node-cache");

const { fetchJobs, countJobs, saveJobToDB } = require("../services/jobService");

const asyncHandler = require("../utils/asyncHandler");

const cache = new NodeCache({
  stdTTL: 60,
});

// ==============================
// GET JOBS
// ==============================
const getJobs = asyncHandler(async (req, res) => {
  // Pagination
  const page = parseInt(req.query.page) || 1;

  const limit = parseInt(req.query.limit) || 5;

  const offset = (page - 1) * limit;

  // Filters
  const keyword = req.query.keyword || "";

  const location = req.query.location || "";

  const source = req.query.source || "";

  // Sorting
  const sort = req.query.sort || "latest";

  let orderBy = "ORDER BY id DESC";

  if (sort === "oldest") {
    orderBy = "ORDER BY id ASC";
  }

  if (sort === "company") {
    orderBy = "ORDER BY company ASC";
  }

  // WHERE conditions
  let whereClauses = [];

  let values = [];

  // Keyword filter
  if (keyword) {
    whereClauses.push("(title LIKE ? OR company LIKE ?)");

    values.push(`%${keyword}%`);

    values.push(`%${keyword}%`);
  }

  // Location filter
  if (location) {
    whereClauses.push("location LIKE ?");

    values.push(`%${location}%`);
  }

  // Source filter
  if (source) {
    whereClauses.push("source = ?");

    values.push(source);
  }

  // Build WHERE SQL
  let whereSQL = "";

  if (whereClauses.length > 0) {
    whereSQL = "WHERE " + whereClauses.join(" AND ");
  }

  // Cache
  const cacheKey = JSON.stringify(req.query);

  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("⚡ Cache HIT");

    return res.json(cachedData);
  }

  console.log("🟡 Cache MISS");

  // Service calls
  const totalJobs = await countJobs(whereSQL, values);

  const jobs = await fetchJobs(whereSQL, orderBy, values, limit, offset);

  const totalPages = Math.ceil(totalJobs / limit);

  // Final response
  const responseData = {
    currentPage: page,

    totalPages,

    totalJobs,

    jobs,
  };

  // Save cache
  cache.set(cacheKey, responseData);

  res.json(responseData);
});

// ==============================
// SAVE JOB
// ==============================
const saveJob = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const jobId = req.params.jobId;

  await saveJobToDB(userId, jobId);

  res.json({
    message: "Job saved",
  });
});

module.exports = {
  getJobs,
  saveJob,
};
