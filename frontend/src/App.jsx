import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import SavedJobs from "./pages/SavedJobs";

import AppliedJobs from "./pages/AppliedJobs";

import Analytics from "./pages/Analytics";

function App() {
  const token = localStorage.getItem("accessToken");

  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard */}
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />

        {/* Saved */}
        <Route
          path="/saved"
          element={token ? <SavedJobs /> : <Navigate to="/login" />}
        />

        {/* Applied */}
        <Route
          path="/applied"
          element={token ? <AppliedJobs /> : <Navigate to="/login" />}
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={token ? <Analytics /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
