import { useMemo } from "react";
import assignQuantiles from "@/utils/quantiles";

interface Client {
  clientId: number;
  lifetimeValue?: number; // Или purchaseFrequency, в зависимости от данных
  purchaseFrequency?: number;
}

interface ProcessedClient extends Client {
  quantile: string;
  range: string;
}

interface QuantileData {
  quantile: string;
  count: number;
  range: string;
}

const useRange = (
  clients: Client[],
): {
  processedClients: ProcessedClient[];
  averageValue: number;
  quantilesData: QuantileData[];
} => {
  const { processedClients, averageValue, quantilesData } = useMemo(() => {
    if (clients.length === 0) {
      return { processedClients: [], averageValue: 0, quantilesData: [] };
    }
    let key;
    if ([...clients][0].purchaseFrequency) {
      key = "purchaseFrequency";
    } else {
      key = "lifetimeValue";
    }
    // Назначение квантилей
    const categorizedClients = assignQuantiles([...clients], key, 4);

    // Группировка клиентов по квантилям
    const quantileGroups: { [key: string]: Client[] } = {};
    categorizedClients.forEach((client: any) => {
      // Используйте корректный тип вместо any
      const q = client.quantile;
      if (q) {
        if (!quantileGroups[q]) {
          quantileGroups[q] = [];
        }
        quantileGroups[q].push(client);
      }
    });

    // Вычисление диапазонов для каждого квантиля
    const quantileRanges: { [key: string]: string } = {};
    Object.keys(quantileGroups).forEach((q) => {
      const group = quantileGroups[q];
      const values = group.map((c) =>
        c.lifetimeValue ? c.lifetimeValue : c.purchaseFrequency,
      );
      const min = Math.min(...values);
      const max = Math.max(...values);
      quantileRanges[q] = `${min}-${max}`;
    });

    // Добавление свойства range к каждому клиенту
    const processedClients: ProcessedClient[] = categorizedClients.map(
      (client) => ({
        ...client,
        range: client.quantile ? quantileRanges[client.quantile] : "",
      }),
    );

    // Подготовка данных для Pie Chart
    const quantilesData = Object.keys(quantileGroups).map((q) => {
      const group = quantileGroups[q];
      const count = group.length;
      const frequencies = group.map((client) =>
        client.lifetimeValue ? client.lifetimeValue : client.purchaseFrequency,
      );
      const min = Math.min(...frequencies);
      const max = Math.max(...frequencies);
      return {
        quantile: q,
        count,
        range: `${min}-${max}`,
      };
    });

    // Вычисление средней стоимости жизни
    const totalValue = clients.reduce(
      (acc, client) =>
        acc +
        (client.lifetimeValue
          ? client.lifetimeValue
          : client.purchaseFrequency),
      0,
    );
    const average = clients.length ? totalValue / clients.length : 0;

    return { processedClients, averageValue: average, quantilesData };
  }, [clients]);

  return { processedClients, averageValue, quantilesData };
};

export default useRange;
