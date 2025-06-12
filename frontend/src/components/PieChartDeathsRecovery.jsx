import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Color palette: alternating between deaths and recoveries
const COLORS = ["#FF6B6B", "#00C49F", "#FF8C42", "#4ECDC4", "#A29BFE", "#FFC300"];

export default function PieChartDeathsRecovery({ data }) {
  // Flatten the data: each disease gives 2 segments — deaths & recoveries
  const chartData = data.flatMap((item) => [
    { name: `${item.name} - Deaths`, value: item.deaths },
    { name: `${item.name} - Recoveries`, value: item.recoveries },
  ]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        {/* <Legend layout="horizontal" verticalAlign="bottom" align="center" /> */}
      </PieChart>
    </ResponsiveContainer>
  );
}

