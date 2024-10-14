import { Cohort } from "@/types/metrics";
import React, { useMemo } from "react";
import CohortAnalysisBarChart from "../vizualization/CohortBar";

interface CohortAnalysisProps {
  cohort: Cohort[];
}

const CohortAnalysis: React.FC<CohortAnalysisProps> = ({ cohort }) => {
  const { maxPurchase, meanPurchase } = useMemo(() => {
    if (!cohort || cohort.length === 0) {
      return { maxPurchase: 0, meanPurchase: 0 };
    }

    const values = cohort.flatMap((entry) => Object.values(entry).map(Number));

    const maxPurchase = Math.max(...values);

    const total = values.reduce((acc, val) => acc + val, 0);
    const meanPurchase = total / values.length;

    return { maxPurchase, meanPurchase };
  }, [cohort]);

  return (
    <div className="flex flex-col space-y-4">
      {/* Первая секция: Текстовое представление */}
      {maxPurchase !== Number(meanPurchase) ? (
        <section className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold">Количество покупок:</h3>
          <p>
            <strong>Макс. покупок в месяц:</strong> {maxPurchase}
          </p>
          <p>
            <strong>Ср. кол-во покупок в месяц:</strong>{" "}
            {meanPurchase.toFixed(1)}
          </p>
        </section>
      ) : (
        <section className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold">Количество покупок:</h3>
          <p>
            <strong>Ср. кол-во покупок в месяц:</strong>{" "}
            {meanPurchase.toFixed(1)}
          </p>
        </section>
      )}

      {/* Вторая секция: Место для визуализации */}
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <CohortAnalysisBarChart data={cohort} />
      </section>
    </div>
  );
};

export default CohortAnalysis;
