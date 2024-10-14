import { ActivityDay } from "@/types/metrics";
import React, { useMemo } from "react";
import ActiveDaysChart from "../vizualization/HistogramChart";

interface CustomerActivityDaysProps {
  customerActivityDays: ActivityDay[];
}

const CustomerActivityDays: React.FC<CustomerActivityDaysProps> = ({
  customerActivityDays,
}) => {
  const maxActiveDays = useMemo(() => {
    if (customerActivityDays.length === 0) return 0;
    return Math.max(...customerActivityDays.map((item) => item.activeDays));
  }, [customerActivityDays]);

  const averageActiveDays = useMemo(() => {
    if (customerActivityDays.length === 0) return 0;
    const totalActiveDays = customerActivityDays.reduce(
      (acc, item) => acc + item.activeDays,
      0,
    );
    return totalActiveDays / customerActivityDays.length;
  }, [customerActivityDays]);
  return (
    <div className="flex flex-col space-y-4">
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold">Обзор активности</h3>
        <p className="mt-2">
          <strong>Максимальное количество посещений:</strong> {maxActiveDays}
        </p>
        <p>
          <strong>Среднее количество посещений:</strong>{" "}
          {averageActiveDays.toFixed(2)}
        </p>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <ActiveDaysChart clients={customerActivityDays} />
      </section>
    </div>
  );
};

export default CustomerActivityDays;
