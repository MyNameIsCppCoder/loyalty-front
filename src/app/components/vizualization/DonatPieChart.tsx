import React, { useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Text,
  Tooltip,
} from "recharts";

interface ChurnRateData {
  name: string;
  value: number;
}

interface ChurnRateDonutChartProps {
  churnedClientCount: number;
  totalClientCount: number;
}

const COLORS = ["#FF8042", "#00C49F"];

const ChurnRateDonutChart: React.FC<ChurnRateDonutChartProps> = ({
  churnedClientCount,
  totalClientCount,
}) => {
  // Расчёт процента оттока
  const churnRate = useMemo(() => {
    if (totalClientCount === 0) return 0;
    return (churnedClientCount / totalClientCount) * 100;
  }, [churnedClientCount, totalClientCount]);

  // Подготовка данных для диаграммы
  const data: ChurnRateData[] = useMemo(() => {
    return [
      { name: "Отток клиентов", value: churnedClientCount },
      {
        name: "Оставшиеся клиенты",
        value: totalClientCount - churnedClientCount,
      },
    ];
  }, [churnedClientCount, totalClientCount]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
            startAngle={90}
            endAngle={-270} // Для того чтобы сегменты начинались сверху
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => {
              const { payload } = entry;
              return `${payload.name}`;
            }}
          />
          {/* Текст в центре диаграммы */}
          <Text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xl font-semibold"
          >
            {`${churnRate.toFixed(1)}%`}
          </Text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChurnRateDonutChart;
