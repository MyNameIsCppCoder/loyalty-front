import { format, parse } from "date-fns";
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ProcessedLtvData, RawLtvData } from "../types";

interface AverageLtvBarChartProps {
  data: RawLtvData[];
  barColor?: string;
}

const AverageLtvBarChart: React.FC<AverageLtvBarChartProps> = ({
  data,
  barColor = "#8884d8",
}) => {
  // Преобразование данных в нужный формат
  const processedData: ProcessedLtvData[] = useMemo(() => {
    return data.map((item) => {
      const month = Object.keys(item)[0];
      const averageLtv = item[month];
      return { month, averageLtv };
    });
  }, [data]);

  // Форматирование месяца для лучшего отображения
  const formattedData = useMemo(() => {
    return processedData.map((item) => {
      const parsedDate = parse(`${item.month}-01`, "yyyy-MM-dd", new Date());
      const formattedMonth = format(parsedDate, "yyyy-MM"); // Например, 'Jun 2024'
      return { ...item, month: formattedMonth };
    });
  }, [processedData]);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{
              value: "Средний LTV",
              angle: -90,
              position: "insideLeft",
              offset: 10,
            }}
          />
          <Tooltip
            formatter={(value: number) => [
              `${value.toFixed(2)}`,
              "Средний LTV",
            ]}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="averageLtv" name="Средний LTV" fill={barColor}>
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageLtvBarChart;
