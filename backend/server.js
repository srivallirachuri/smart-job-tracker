const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Load env variables
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

// Cron Jobs
require("./cron/jobCron");

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Parse JSON
app.use(express.json());

// Parse Cookies
app.use(cookieParser());

// Logger
app.use(loggerMiddleware);

// Rate Limiter
app.use("/api", apiLimiter);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api", testRoutes);

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

/*
|--------------------------------------------------------------------------
| Server Start
|--------------------------------------------------------------------------
*/

console.log(`Environment: ${env.nodeEnv}`);

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});
