import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/analytics");
      setStats(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  if (!stats) {
    return <div className="p-10 text-center">Loading Analytics...</div>;
  }

  const chartData = [
    {
      name: "Applied",
      count: stats.totalApplied,
    },
    {
      name: "Interview",
      count: stats.interviews,
    },
    {
      name: "Rejected",
      count: stats.rejected,
    },
    {
      name: "Offer",
      count: stats.offers,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white shadow rounded-xl p-5">
            <h3 className="text-gray-500">Applied</h3>
            <p className="text-3xl font-bold">{stats.totalApplied}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h3 className="text-gray-500">Interviews</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {stats.interviews}
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h3 className="text-gray-500">Rejected</h3>
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h3 className="text-gray-500">Offers</h3>
            <p className="text-3xl font-bold text-green-600">{stats.offers}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="count" />
            </BarChart>
            <p>
              Success Rate:
              {stats.successRate}%
            </p>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
