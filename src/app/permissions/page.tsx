'use client'
import { axiosWithAuth } from '@/interceptors/interceptors';
import { useEffect, useState } from 'react';
import NavBarManagers from '@/app/components/navBarManagers/navBarManagers';
import SideBarCabinet from '@/app/components/sideBarCabinet/sideBarCabinet';
import ModalManagersGet from '@/app/components/modalManagers/modalManagersGet';
import ModalManagersCreate from '@/app/components/modalManagers/modalManagersCreate';
import ManagerLine from '@/app/components/managerLine/managerLine';

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

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await axiosWithAuth.get('manager/show');

        // Преобразуем данные в нужный формат
        const data = res.data;
        console.log(data)
        // Проверяем, является ли data массивом с одним объектом
        if (Array.isArray(data) && data.length === 1 && typeof data[0] === 'object') {
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
    <div>
      <div className="flex-1 ml-0 md:ml-64">
        <NavBarManagers
          openModalCreate={() => setIsModalCreateOpen(true)}
          openModalFind={() => setIsModalFindOpen(true)}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <ModalManagersCreate
          isOpen={isModalCreateOpen}
          onClose={() => setIsModalCreateOpen(false)}
        />
        <ModalManagersGet
          isOpen={isModalFindOpen}
          onClose={() => setIsModalFindOpen(false)}
        />
        <div className="flex">
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-gray-100 z-50 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 md:translate-x-0`}
          >
            <SideBarCabinet closeSidebar={() => setIsSidebarOpen(false)} />
          </div>
          {/* Полупрозрачный фон при открытом сайдбаре на мобильных устройствах */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
        </div>
        <div className={'w-full bg-gray-300 h-screen'}>
          {managers.length > 0 && (
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
              <h3 className={'p-4 mt-4 text-2xl text-gray-800 text-center'}>Менеджеры:</h3>
            <ManagerLine managers={managers} />
              </div>
          </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Page;