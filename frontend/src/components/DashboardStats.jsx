import { useEffect, useState } from "react";
import api from "../api/axios";

function DashboardStats() {
  const [stats, setStats] = useState({
    totalApplied: 0,
    offers: 0,
    rejected: 0,
    successRate: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/analytics");

      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    {
      title: "Applications",
      value: stats.totalApplied,
      color: "bg-blue-500",
      icon: "📄",
    },
    {
      title: "Offers",
      value: stats.offers,
      color: "bg-green-500",
      icon: "🎯",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      color: "bg-red-500",
      icon: "❌",
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      color: "bg-purple-500",
      icon: "⭐",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition p-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">{card.title}</p>

              <h2 className="text-4xl font-bold mt-3">{card.value}</h2>
            </div>

            <div
              className={`${card.color} text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;
