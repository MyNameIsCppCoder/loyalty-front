"use client";
import { axiosWithAuth } from "@/interceptors/interceptors";
import { useEffect, useState } from "react";
import SideBarCabinet from "@/app/components/sideBarCabinet/sideBarCabinet";
import ModalManagersGet from "@/app/components/modalManagers/modalManagersGet";
import ModalManagersCreate from "@/app/components/modalManagers/modalManagersCreate";
import ManagerLine from "@/app/components/managerLine/managerLine";
import { Settings } from "../components/settings/settings";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Subscribe } from "../components/subscribe/subscribe";

interface Manager {
  id: number;
  username: string;
  name: string | null;
  email: string;
  updatedAt: string;
  createdAt: string;
}

const Page = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalFindOpen, setIsModalFindOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await axiosWithAuth.get("manager/show");

        // Преобразуем данные в нужный формат
        const data = res.data;
        console.log(data);
        // Проверяем, является ли data массивом с одним объектом
        if (Array.isArray(data) && data.length === 1 && typeof data[0] === "object") {
          // Преобразуем объект с числовыми ключами в массив
          const managersArray: Manager[] = Object.values(data[0]);
          setManagers(managersArray);
        } else {
          // Если данные уже в нужном формате
          setManagers(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchManagers();
  }, []);
  return (
    <div className="flex">
      {/* Сайдбар */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-100 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0`}>
        <SideBarCabinet closeSidebar={() => setIsSidebarOpen(false)} />
      </div>
      {/* Полупрозрачный фон при открытом сайдбаре на мобильных устройствах */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Основной контент */}
      <div className="flex-1 ml-0 md:ml-64">
        {/* Модальное окно для создания менеджера */}
        <ModalManagersCreate isOpen={isModalCreateOpen} onClose={() => setIsModalCreateOpen(false)} />

        {/* Контейнер для контента */}
        <div className="w-full bg-gray-300 min-h-screen flex flex-col p-4">
          {/* Контейнер для верхних блоков */}
          <div className="flex w-full">
            {/* Блок с менеджерами */}
            <div className="w-full md:w-1/2 flex flex-col bg-gray-200 shadow px-4 py-5 rounded m-2">
              <h3 className="text-2xl text-gray-800 text-center mb-4">Менеджеры:</h3>
              <button onClick={() => setIsModalCreateOpen(true)} className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-200 w-fit self-center">
                Добавить
              </button>
              {managers.length > 0 && (
                <div className="flex flex-col">
                  <ManagerLine managers={managers} />
                </div>
              )}
            </div>

            {/* Блок с настройками */}
            <div className="w-full md:w-1/2 flex flex-col bg-gray-200 shadow px-4 py-5 rounded m-2">
              <Settings />
            </div>
          </div>

          {/* Блок с подпиской */}
          <div className="flex flex-col bg-gray-200 shadow px-4 py-5 rounded m-2">
            <Subscribe />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
