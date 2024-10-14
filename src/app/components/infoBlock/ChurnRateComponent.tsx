import React, { useMemo } from "react";
import ChurnRateDonutChart from "../vizualization/DonatPieChart";

interface ChurnRateProps {
  totalClient: number;
  churnedClient: number;
}

const ChurnRateComponent: React.FC<ChurnRateProps> = ({
  totalClient,
  churnedClient,
}) => {
  const churnRate = useMemo(() => {
    if (totalClient === 0) return 0;
    return (churnedClient / totalClient) * 100;
  }, [totalClient, churnedClient]);

  return (
    <div className="flex flex-col space-y-4">
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold">Обзор возвращаемости</h3>
        <p className="mt-2">
          <strong>Отток:</strong> {churnRate.toFixed(2)}%
        </p>
        <p>
          <strong>Всего клиентов:</strong> {totalClient}
        </p>
        <p>
          <strong>Вернувшихся:</strong> {churnedClient}
        </p>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <ChurnRateDonutChart
          churnedClientCount={churnedClient}
          totalClientCount={totalClient}
        />
      </section>
    </div>
  );
};

export default ChurnRateComponent;
