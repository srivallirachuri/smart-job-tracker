const errorMiddleware = (err, req, res, next) => {
  console.error("❌ ERROR:", {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  // Duplicate entry
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(400).json({
      message: "Duplicate entry",
    });
  }

  // JWT
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  // Expired JWT
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token expired",
    });
  }

  // Default
  res.status(500).json({
    message: err.message || "Server Error",
  });
};

module.exports = errorMiddleware;
