// src/app/pages/ClientPage.tsx

"use client";
import ClientLine from "@/app/components/clientLine/clientLine";
import ModalClientCreate from "@/app/components/modalClient/modalClientCreate";
import ModalClientGet from "@/app/components/modalClient/modalClientGet";
import NavBarClient from "@/app/components/navBarClient/navBarClient";
import SideBarCabinet from "@/app/components/sideBarCabinet/sideBarCabinet";
import { axiosWithAuth } from "@/interceptors/interceptors";
import { useEffect, useState } from "react";

const ClientPage = () => {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalFindOpen, setIsModalFindOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const endpointGetAll = "http://localhost:8080/api/clients/show";

  const reqAllClients = async (endpoint: string) => {
    try {
      const clients = await axiosWithAuth(endpoint);
      return clients.data;
    } catch (error: any) {
      console.log("Error retrieving clients");
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsData = await reqAllClients(endpointGetAll);
        if (Array.isArray(clientsData)) {
          setClients(clientsData);
        } else {
          console.error("Expected array, but got:", clientsData);
        }
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="flex">
      {/* Сайдбар */}
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

      {/* Основной контент */}
      <div className="flex-1 ml-0 md:ml-64">
        <NavBarClient
          openModalCreate={() => setIsModalCreateOpen(true)}
          openModalFind={() => setIsModalFindOpen(true)}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <ModalClientCreate
          isOpen={isModalCreateOpen}
          onClose={() => setIsModalCreateOpen(false)}
        />
        <ModalClientGet
          isOpen={isModalFindOpen}
          onClose={() => setIsModalFindOpen(false)}
        />
        <div className="flex flex-col">
          <ClientLine clients={clients} />
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
