import { useMemo } from "react";
import AverageLtvBarChart from "../vizualization/AOVPlot";

const AverageLifetimeValue = ({ averageLifetimeValue }: any) => {
  const { averageValue, meanValue, maxValue } = useMemo(() => {
    const average = averageLifetimeValue.map((el) => {
      const val = Object.values(el);
      return val;
    });
    const mean = average.reduce((acc, val) => acc + val, 0) / average.length;

    const max = Math.max(...average);

    return {
      averageValue: average,
      meanValue: mean,
      maxValue: max,
    };
  }, [averageLifetimeValue]);
  return (
    <div className="flex flex-col space-y-4">
      {/* Первая секция: Текстовое представление */}
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        {meanValue === maxValue ? (
          <h3 className="text-lg font-semibold">
            Средний LTV: {meanValue.toFixed(2) || 0} рублей
          </h3>
        ) : (
          <h3 className="text-lg font-semibold">
            <span>Средний LTV: {meanValue.toFixed(2) || 0} рублей </span>
            <span>Максимальный LTV: {maxValue.toFixed(2) || 0}</span>
          </h3>
        )}
      </section>
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <AverageLtvBarChart data={averageLifetimeValue} />
      </section>
    </div>
  );
};

export default AverageLifetimeValue;
