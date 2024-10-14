import { format, parse } from "date-fns";
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

interface CohortData {
  [key: string]: number;
}

interface CohortAnalysisBarChartProps {
  data: CohortData[];
  barColor?: string;
}

const CohortAnalysisBarChart: React.FC<CohortAnalysisBarChartProps> = ({
  data,
  barColor = "#8884d8",
}) => {
  // Преобразование данных в нужный формат
  const processedData = useMemo(() => {
    return data.map((item) => {
      const monthKey = Object.keys(item)[0];
      const purchaseCount = item[monthKey];

      // Парсим дату для более удобного отображения
      const parsedDate = parse(`${monthKey}-01`, "yyyy-MM-dd", new Date());
      const formattedMonth = format(parsedDate, "MMM yyyy"); // Например, 'Jun 2024'

      return { month: formattedMonth, purchaseCount };
    });
  }, [data]);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{
              value: "Количество покупок",
              angle: -90,
              position: "insideLeft",
              offset: 10,
            }}
          />
          <Tooltip
            formatter={(value: number) => [`${value}`, "Количество покупок"]}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="purchaseCount" name="Покупки" fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CohortAnalysisBarChart;
