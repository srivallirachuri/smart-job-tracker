import Card from "../common/Card";

function StatCard({ title, value, icon, color, subtitle }) {
  return (
    <Card>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-4xl font-bold mt-2">{value}</h2>

          {subtitle && <p className="text-sm text-gray-400 mt-3">{subtitle}</p>}
        </div>

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}

export default StatCard;
