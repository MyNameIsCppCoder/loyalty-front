import { useMemo } from "react";
import AverageOrderValueBarChart from "../vizualization/BarChartAOV";

const AOVComponent = ({ averageOrderValue }: any) => {
  const { actualAverageOrderValue, maxValue, averageValue } = useMemo(() => {
    if (!averageOrderValue || averageOrderValue.length === 0) {
      return {
        actualAverageOrderValue: [],
        maxValue: 0,
        averageValue: 0,
      };
    }

    // Извлекаем значения из объектов
    const actualAverageOrderValue = averageOrderValue.map((el) => {
      const values = Object.values(el);
      return values[0]; // Предполагаем, что в каждом объекте только одна пара ключ-значение
    });

    // Находим максимальное значение
    const maxValue = Math.max(...actualAverageOrderValue);

    // Рассчитываем среднее значение
    const sum = actualAverageOrderValue.reduce((acc, val) => acc + val, 0);
    const averageValue = sum / actualAverageOrderValue.length;

    return {
      actualAverageOrderValue,
      maxValue,
      averageValue,
    };
  }, [averageOrderValue]);
  return (
    <div className="flex flex-col space-y-4">
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        {averageValue === maxValue ? (
          <h3 className="text-lg font-semibold">
            <span>Средний чек: {averageValue.toFixed(2)} рублей </span>
          </h3>
        ) : (
          <h3 className="text-lg font-semibold">
            <span>Средний чек: {averageValue.toFixed(2)} рублей </span>
            <span>Максимальный чек: {maxValue.toFixed(2)}</span>
          </h3>
        )}
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <AverageOrderValueBarChart data={averageOrderValue} />
      </section>
    </div>
  );
};

export default AOVComponent;
