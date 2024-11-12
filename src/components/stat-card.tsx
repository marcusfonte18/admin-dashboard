import { ElementType } from "react";

interface StatCard {
  icon: ElementType;
  label: string;
  value: string;
  trend?: number;
  color: string;
}

export const StatCard = (props: StatCard) => {
  const { icon: Icon, label, value, trend, color } = props;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start justify-between">
      <div className="space-y-2">
        <span className="text-sm text-gray-500">{label}</span>
        <div className="flex items-baseline space-x-2">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <span
              className={`text-sm ${
                trend >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend > 0 ? "+" : ""}
              {trend}%
            </span>
          )}
        </div>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  );
};
