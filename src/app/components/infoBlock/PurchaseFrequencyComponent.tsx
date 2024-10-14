import useRange from "@/hooks/useRange";
import React from "react";
import QuantilePieChart from "../vizualization/QuantilePieChart";

interface PurchaseFrequency {
  clientId: number;
  purchaseFrequency: number;
}

interface PurchaseFrequencyComponentProps {
  clients: PurchaseFrequency[];
}

interface QuantileData {
  quantile: string;
  count: number;
  range: string;
}

export const PurchaseFrequencyComponent: React.FC<
  PurchaseFrequencyComponentProps
> = ({ clients }) => {
  // Используем хук useRange для обработки данных
  const { processedClients, averageValue, quantilesData } = useRange(clients);
  return (
    <div className="flex flex-col space-y-4">
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold">Средняя частота покупок</h3>
        <p className="text-2xl mt-2">{averageValue.toFixed(2)}</p>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <QuantilePieChart data={quantilesData} />
      </section>
    </div>
  );
};
