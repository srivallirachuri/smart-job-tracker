import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        email,
        password,
      });

      toast.success("Account created successfully!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 700);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-black">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Start tracking your job applications smarter
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password (minimum 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 font-semibold text-black hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
