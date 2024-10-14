import { useState, useEffect } from "react";
import { axiosWithAuth } from "@/interceptors/interceptors";

interface IMetrics {
  meanCheck: any;
  activeClients: any;
  cohort: any;
  repeatRate: any;
  churnRate: any;
  ltv: any;
  meanLtv: any;
  activityDays: any;
  purchaseFrequency: any;
  mainMetrics?: any;
}

interface UseMetricsResult {
  metrics: IMetrics | null;
  loading: boolean;
  error: any;
}

interface IUseMetricsProps {
  daysGone?: number;
  startDate?: string;
  endDate?: string;
}

export const useMetrics = (date: IUseMetricsProps = {}): UseMetricsResult => {
  const [metrics, setMetrics] = useState<IMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const { daysGone, startDate, endDate } = date;

    const param = new URLSearchParams();

    if ((endDate && startDate) || daysGone !== undefined) {
      if (daysGone !== undefined) {
        param.append("days", daysGone.toString());
      } else if (endDate && startDate) {
        for (const [key, value] of Object.entries({ endDate, startDate })) {
          param.append(key, value as string);
        }
      }
      console.log(param.toString());
    }

    const fetchAllMetrics = async () => {
      try {
        const endpoints: { [key in keyof IMetrics]: string } = {
          meanCheck: "/report/mean-check/",
          activeClients: "/report/active/",
          cohort: "/report/cohort",
          repeatRate: "/report/repeat",
          churnRate: "/report/churn",
          ltv: "/report/ltv",
          meanLtv: "report/average-ltv",
          activityDays: "/report/activity-days",
          purchaseFrequency: "/report/purchase-frequency",
          mainMetrics: "/report/main-metrics",
        };

        const paramString = param.toString();
        const params = paramString ? `?${paramString}` : '';

        const requests = Object.entries(endpoints).map(([key, endpoint]) => {
          return axiosWithAuth
            .get(`${endpoint}${params}`)
            .then((response) => ({
              key: key as keyof IMetrics,
              data: response.data,
            }));
        });

        const responses = await Promise.all(requests);

        const fetchedMetrics: IMetrics = responses.reduce(
          (acc, { key, data }) => {
            acc[key] = data;
            return acc;
          },
          {} as IMetrics,
        );

        setMetrics(fetchedMetrics);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching metrics:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchAllMetrics();
  }, [date.daysGone, date.startDate, date.endDate]);


  return { metrics, loading, error };
};
