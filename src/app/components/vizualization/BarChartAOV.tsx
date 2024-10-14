// components/AverageOrderValueBarChart.tsx
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RawAverageOrderValueData {
  [key: string]: number;
}

interface ProcessedAverageOrderValueData {
  month: string;
  averageOrderValue: number;
}

interface AverageOrderValueBarChartProps {
  data: RawAverageOrderValueData[];
}

const AverageOrderValueBarChart: React.FC<AverageOrderValueBarChartProps> = ({
  data,
}) => {
  // Преобразование данных в нужный формат
  const processedData: ProcessedAverageOrderValueData[] = useMemo(() => {
    return data.map((item) => {
      const month = Object.keys(item)[0];
      const averageOrderValue = item[month];
      return { month, averageOrderValue };
    });
  }, [data]);

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            label={{ value: "Месяц", position: "insideBottom", offset: -10 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{ value: "Средний чек", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            formatter={(value: number) => [
              `${value.toFixed(2)}`,
              "Средний чек",
            ]}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="averageOrderValue" fill="#8884d8" name="Средний чек" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageOrderValueBarChart;
