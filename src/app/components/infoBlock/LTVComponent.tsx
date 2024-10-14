import useRange from "@/hooks/useRange";
import { LifetimeValue } from "@/types/metrics";
import React, { useMemo } from "react";
import QuantilePieChart from "../vizualization/QuantilePieChart";

export interface CustomerLifetimeValueComponentProps {
  customerLifetimeValue: LifetimeValue[];
}

const CustomerLifetimeValueComponent: React.FC<
  CustomerLifetimeValueComponentProps
> = ({ customerLifetimeValue }) => {
  const maxLtv = useMemo(() => {
    if (customerLifetimeValue.length === 0) return 0;
    return Math.max(...customerLifetimeValue.map((item) => item.lifetimeValue));
  }, [customerLifetimeValue]);
  const { processedClients, averageValue, quantilesData } = useRange(
    customerLifetimeValue,
  );
  const averageLtv = useMemo(() => {
    if (customerLifetimeValue.length === 0) return 0;
    const totalLtv = customerLifetimeValue.reduce(
      (acc, item) => acc + item.lifetimeValue,
      0,
    );
    return totalLtv / customerLifetimeValue.length;
  }, [customerLifetimeValue]);

  return (
    <div className="flex flex-col space-y-4">
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold">LTV</h3>
        <p className="mt-2">
          <strong>Максимальное LTV:</strong> ${maxLtv.toFixed(2)}
        </p>
        <p>
          <strong>Среднее LTV:</strong> ${averageLtv.toFixed(2)}
        </p>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <QuantilePieChart data={quantilesData} />
      </section>
    </div>
  );
};

export default CustomerLifetimeValueComponent;
