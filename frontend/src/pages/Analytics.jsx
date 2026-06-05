import { useEffect, useState } from "react";

import api from "../api/axios";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

import { Link } from "react-router-dom";

function Analytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/jobs/analytics");

      setStats(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  if (!stats) {
    return <p>Loading...</p>;
  }

  const chartData = [
    {
      name: "Applied",
      count: stats.applied || 0,
    },

    {
      name: "Interview",
      count: stats.interviews || 0,
    },

    {
      name: "Rejected",
      count: stats.rejected || 0,
    },

    {
      name: "Offers",
      count: stats.offers || 0,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Analytics Dashboard</h1>

      <Link to="/">Dashboard</Link>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <p>
          Total Applied:
          {stats.totalApplied}
        </p>

        <p>
          Interviews:
          {stats.interviews}
        </p>

        <p>
          Rejected:
          {stats.rejected}
        </p>

        <p>
          Offers:
          {stats.offers}
        </p>
      </div>

      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="count" />
      </BarChart>
    </div>
  );
}

export default Analytics;
