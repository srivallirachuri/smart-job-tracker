import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Resume() {
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await api.get("/resume");

      setResume(res.data);
    } catch {
      setResume(null);
    }
  };

  const uploadResume = async () => {
    if (!file) {
      toast.error("Please select a PDF resume.");
      toast.error("Upload failed");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);

    try {
      await api.post("/resume/upload", formData);

      toast.success("Resume uploaded successfully!");

      fetchResume();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteResume = async () => {
    try {
      await api.delete("/resume");

      setResume(null);

      toast.success("Resume deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Resume Manager</h1>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <button
          onClick={uploadResume}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Upload Resume
        </button>

        {resume && (
          <div className="mt-8">
            <h2 className="font-bold text-xl mb-4">Current Resume</h2>

            <a
              href={`http://localhost:5000/${resume.file_path}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View Resume
            </a>

            <br />

            <button
              onClick={deleteResume}
              className="mt-4 bg-red-500 text-white px-5 py-2 rounded-lg"
            >
              Delete Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Resume;
