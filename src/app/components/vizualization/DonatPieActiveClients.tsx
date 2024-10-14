// components/ActiveClientsDonutChart.tsx
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

interface ActiveClientsData {
  name: string;
  value: number;
}

interface ActiveClientsDonutChartProps {
  activeClientCount: number;
  totalClientCount: number;
}

const COLORS = ["#00C49F", "#FF8042"]; // Цвета для активных и неактивных клиентов

const ActiveClientsDonutChart: React.FC<ActiveClientsDonutChartProps> = ({
  activeClientCount,
  totalClientCount,
}) => {
  // Расчёт процента активных клиентов
  const activeRate = useMemo(() => {
    if (totalClientCount === 0) return 0;
    return (activeClientCount / totalClientCount) * 100;
  }, [activeClientCount, totalClientCount]);

  // Подготовка данных для диаграммы
  const data: ActiveClientsData[] = useMemo(() => {
    return [
      { name: "Активные", value: activeClientCount },
      {
        name: "Неактивные",
        value: totalClientCount - activeClientCount,
      },
    ];
  }, [activeClientCount, totalClientCount]);

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
            layout="horizontal" // Горизонтальное расположение
            verticalAlign="bottom" // Выравнивание по нижнему краю
            align="center" // Центрирование по горизонтали
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
            {`${activeRate.toFixed(1)}%`}
          </Text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActiveClientsDonutChart;
