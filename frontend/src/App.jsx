import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SavedJobs from "./pages/SavedJobs";
import AppliedJobs from "./pages/AppliedJobs";
import Analytics from "./pages/Analytics";
import Resume from "./pages/Resume";
// import UploadResume from "./pages/UploadResume";
function App() {
  const token = localStorage.getItem("accessToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />

        <Route
          path="/saved"
          element={token ? <SavedJobs /> : <Navigate to="/login" />}
        />

        <Route
          path="/applied"
          element={token ? <AppliedJobs /> : <Navigate to="/login" />}
        />

        <Route
          path="/analytics"
          element={token ? <Analytics /> : <Navigate to="/login" />}
        />

        <Route
          path="/resume"
          element={token ? <Resume /> : <Navigate to="/login" />}
        />
        {/* <Route
          path="/upload-resume"
          element={token ? <UploadResume /> : <Navigate to="/login" />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
