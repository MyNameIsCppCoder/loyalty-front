// src/app/pages/MainPage.tsx

"use client";
import InfoBlock from "@/app/components/infoBlock/infoBlock";
import SideBarCabinet from "@/app/components/sideBarCabinet/sideBarCabinet";
import { useMetrics } from "@/hooks/useMetrics";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DateFilter from "../components/setDataFilter/setDataFilter";
import LoadingScreen from "../components/loading/loading";

const MainPage = () => {
  const router = useRouter();
  const [date, setDate] = useState<{
    daysGone?: number;
    startDate?: string;
    endDate?: string;
  }>({
    daysGone: undefined,
    startDate: undefined,
    endDate: undefined,
  });
  const { metrics } = useMetrics(date);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/");
      return;
    }
  }, []);

  if (!metrics) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex">
      {/* Сайдбар */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-100 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0`}>
        <SideBarCabinet closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Полупрозрачный фон при открытом сайдбаре на мобильных устройствах */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Основной контент */}
      <div className="flex-1 ml-0 md:ml-64 p-4">
        {/* Кнопка для открытия сайдбара на мобильных устройствах */}
        <div className="md:hidden fixed top-4 left-4">
          <button onClick={() => setIsSidebarOpen(true)} aria-label="Открыть меню">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Компонент фильтра даты */}
        <DateFilter setData={setDate} />

        {/* Блок информации */}
        <InfoBlock
          averagePurchaseFrequency={metrics.purchaseFrequency}
          customerActivityDays={metrics.activityDays}
          customerLifetimeValue={metrics.ltv}
          churnRate={metrics.churnRate}
          repeatPurchaseRate={metrics.repeatRate}
          activeClientByMentionedDay={metrics.activeClients}
          averageOrderValueByAllClient={metrics.meanCheck}
          averageLifetimeValue={metrics.meanLtv}
          meanLtv={metrics.meanLtv}
          cohort={metrics.cohort}
        />
      </div>
    </div>
  );
};

export default MainPage;
