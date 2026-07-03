const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Load Environment Variables
dotenv.config();

// Config
const env = require("./config/env");

// Middleware
const loggerMiddleware = require("./middleware/loggerMiddleware");
const { apiLimiter } = require("./middleware/rateLimitMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

// Routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const testRoutes = require("./routes/testRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");
const appliedJobRoutes = require("./routes/appliedJobRoutes");
// Cron Jobs (Enable later if needed)
// require("./cron/jobCron");
require("./cron/interviewReminderCron");
const analyticsRoutes = require("./routes/analyticsRoutes");

const resumeRoutes = require("./routes/resumeRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

const path = require("path");
const app = express();

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://YOUR-VERCEL-DOMAIN.vercel.app"],
    credentials: true,
  }),
);

// JSON Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
// Logger
app.use(loggerMiddleware);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rate Limiter
app.use("/api", apiLimiter);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/saved-jobs", savedJobRoutes);
app.use("/api/applied-jobs", appliedJobRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api", testRoutes);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Job Tracker API Running",
  });
});

/*
|--------------------------------------------------------------------------
| Error Handler (ALWAYS LAST)
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

/*
|--------------------------------------------------------------------------
| Server Start
|--------------------------------------------------------------------------
*/

app.listen(env.port, () => {
  console.log(`Environment: ${env.nodeEnv}`);
  console.log(`Server running on port ${env.port}`);
});
