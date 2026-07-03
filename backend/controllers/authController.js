const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, hashedPassword],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.status(201).json({ message: "User registered successfully" });
      },
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= TOKEN GENERATORS =================
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }, // SHORT LIVED
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }, // LONG LIVED
  );
};

// ================= LOGIN =================
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: "User not found" });
      }

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // Save refresh token in DB
      db.query(
        "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))",
        [user.id, refreshToken],
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          // Send refresh token in cookie
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "Strict",
          });

          res.json({ accessToken });
        },
      );
    },
  );
};

// ================= REFRESH =================
exports.refresh = (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    db.query(
      "SELECT * FROM refresh_tokens WHERE token = ?",
      [token],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = jwt.sign(
          { id: decoded.id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" },
        );

        res.json({ accessToken: newAccessToken });
      },
    );
  } catch (err) {
    return res.status(403).json({ message: "Expired refresh token" });
  }
};
