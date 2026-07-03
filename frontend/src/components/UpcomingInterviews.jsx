import { useEffect, useState } from "react";
import { FaCalendarAlt, FaBuilding, FaClock } from "react-icons/fa";

import api from "../api/axios";

function UpcomingInterviews() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchUpcoming();
  }, []);

  const fetchUpcoming = async () => {
    try {
      const res = await api.get("/interviews/upcoming");

      setInterviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Upcoming Interviews</h2>

          <p className="text-gray-500">Your next scheduled interviews</p>
        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
          {interviews.length}
        </div>
      </div>

      {interviews.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-5xl mb-3">📅</div>

          <p className="text-gray-500">No upcoming interviews scheduled.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {interviews.map((item) => (
            <div
              key={item.id}
              className="border rounded-2xl p-5 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{item.title}</h3>

                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <FaBuilding />

                    {item.company}
                  </div>
                </div>

                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
                  Interview
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mt-5 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />

                  {new Date(item.interview_date).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">
                  <FaClock />

                  {new Date(item.interview_date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingInterviews;
