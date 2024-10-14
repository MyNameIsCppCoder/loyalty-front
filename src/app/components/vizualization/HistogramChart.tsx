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

interface ClientActiveDays {
  clientId: number;
  activeDays: number;
}

interface ActiveDaysChartProps {
  clients: ClientActiveDays[];
}

interface ActiveDaysData {
  activeDays: number;
  count: number;
}

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
];

const ActiveDaysChart: React.FC<ActiveDaysChartProps> = ({ clients }) => {
  const data: ActiveDaysData[] = useMemo(() => {
    const counts: { [key: number]: number } = {};

    clients.forEach((client) => {
      const days = client.activeDays;
      counts[days] = (counts[days] || 0) + 1;
    });

    const aggregatedData: ActiveDaysData[] = Object.keys(counts).map((key) => ({
      activeDays: Number(key),
      count: counts[Number(key)],
    }));

    aggregatedData.sort((a, b) => a.activeDays - b.activeDays);

    return aggregatedData;
  }, [clients]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="activeDays"
          label={{
            value: "Количество активных дней",
            position: "insideBottom",
            offset: -5,
          }}
        />

        <YAxis
          allowDecimals={false}
          label={{
            value: "Количество клиентов",
            angle: -90,
            position: "insideLeft",
          }}
        />

        <Tooltip />

        <Legend />

        <Bar dataKey="count" name="Клиенты" fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ActiveDaysChart;
