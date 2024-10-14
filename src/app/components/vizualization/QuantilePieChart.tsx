// components/vizualization/QuantilePieChart.tsx
import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface QuantileData {
  quantile: string;
  count: number;
  range: string;
}

interface QuantilePieChartProps {
  data: QuantileData[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Цвета для квантилей

const QuantilePieChart: React.FC<QuantilePieChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="quantile"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="horizontal" // Горизонтальное расположение
          verticalAlign="bottom" // Выравнивание по нижнему краю
          align="center" // Центрирование по горизонтали
          formatter={(value, entry) => {
            const correspondingData = data.find((d) => d.quantile === value);
            return correspondingData
              ? `${correspondingData.quantile}: ${correspondingData.range}`
              : value;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default QuantilePieChart;
