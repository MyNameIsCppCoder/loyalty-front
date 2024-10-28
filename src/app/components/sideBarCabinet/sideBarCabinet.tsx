// src/app/components/SideBarCabinet.tsx

import { axiosWithAuth } from "@/interceptors/interceptors";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SideBarCabinetProps {
  closeSidebar?: () => void;
}

const SideBarCabinet: React.FC<SideBarCabinetProps> = ({ closeSidebar }) => {
  const router = useRouter();
  const pathname = usePathname();

  const logOut = async () => {
    try {
      await axiosWithAuth.get("/auth/logout");
      router.push("/");
      console.log("logout");
      if (closeSidebar) closeSidebar();
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const menuItems = [
    { label: "Главная", path: "/" },
    { label: "Клиенты", path: "/clients" },
    { label: "Статистика", path: "/cabinet" },
    { label: "Доступы", path: "/permissions" },
    { label: "Выйти", path: "/logout", action: logOut },
  ];

  const isActive = (path: string): boolean => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const handleItemClick = (item: any) => {
    if (item.action) {
      item.action();
    } else {
      router.push(item.path);
    }
    if (closeSidebar) {
      closeSidebar();
    }
  };

  return (
    <div className="flex flex-col w-64 h-full bg-gray-100">
      {/* Кнопка закрытия бургер-меню на мобильных устройствах */}
      <div className="md:hidden flex justify-end p-4">
        <button onClick={closeSidebar} aria-label="Закрыть меню">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <ul className="flex flex-col items-center justify-center gap-8 flex-1">
        {menuItems.map((item, index) => {
          const active = isActive(item.path);
          return (
            <li key={index}>
              <button
                onClick={() => handleItemClick(item)}
                className={`w-full text-center px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
                  active ? "bg-pink-600 text-white" : "bg-transparent text-gray-700 hover:bg-pink-600 hover:text-white"
                }`}>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBarCabinet;
