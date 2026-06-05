import { useState } from "react";

import { Link } from "react-router-dom";

import api from "../api/axios";

function Register() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      alert("Registration successful");

      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>

        <p className="text-gray-500 text-center mb-8">
          Start tracking jobs smarter
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Register
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?
          <Link to="/login" className="ml-1 font-semibold text-black">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
