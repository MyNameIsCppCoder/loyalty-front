// src/app/components/clientLine/clientLine.tsx

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import SortDown from "../../../public/sort/sort-asc.svg";
import SortUp from "../../../public/sort/sort-up.svg";
import ModalClientAddPurchase from "../modalClient/modalClientAddPurchase";

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  birthDate: string | null;
  cashbackPercentage: number;
  totalCashback: number;
  createdAt: string;
  updatedAt: string;
  visits: { id: number; clientId: number; visitDate: string }[];
}

interface ClientWithLastVisit extends Client {
  lastVisitDate: Date | null;
  formattedLastVisitDate: string;
}

const ClientLine: React.FC<{ clients: Client[] }> = ({ clients }) => {
  const getLastVisitDate = (client: Client) => {
    try {
      const lastVisit = client.visits[client.visits.length - 1];
      return lastVisit ? new Date(lastVisit.visitDate) : null;
    } catch (error) {
      return null;
    }
  };

  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: "asc" | "desc";
    icon: string;
  }>({
    key: "",
    direction: "asc",
    icon: SortDown,
  });

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({
      key,
      direction,
      icon: direction === "asc" ? SortDown : SortUp,
    });
  };

  const getSortIndicator = (key: string) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === "asc" ? (
      <Image src={SortDown} className="inline-block w-4 h-4 m-1" alt="down" />
    ) : (
      <Image src={SortUp} className="inline-block w-4 h-4 m-1" alt="up" />
    );
  };

  const sortedClients = React.useMemo(() => {
    let sortableClients: ClientWithLastVisit[] = clients.map((client) => {
      const lastVisitDate = getLastVisitDate(client);
      const formattedLastVisitDate = lastVisitDate
        ? lastVisitDate.toISOString().split("T")[0]
        : "Не бывал";
      return {
        ...client,
        lastVisitDate,
        formattedLastVisitDate,
      };
    });

    if (sortConfig.key !== "") {
      sortableClients.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortConfig.key) {
          case "name":
            aValue = a.name;
            bValue = b.name;
            break;
          case "phone":
            aValue = a.phone;
            bValue = b.phone;
            break;
          case "cashbackPercentage":
            aValue = a.cashbackPercentage;
            bValue = b.cashbackPercentage;
            break;
          case "totalCashback":
            aValue = a.totalCashback;
            bValue = b.totalCashback;
            break;
          case "lastVisit":
            aValue = a.lastVisitDate ? a.lastVisitDate.getTime() : 0;
            bValue = b.lastVisitDate ? b.lastVisitDate.getTime() : 0;
            break;
          default:
            aValue = "";
            bValue = "";
        }

        // Обработка undefined или null значений
        if (aValue === undefined || aValue === null) aValue = "";
        if (bValue === undefined || bValue === null) bValue = "";

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableClients;
  }, [clients, sortConfig]);

  const [buttonModal, setShowModal] = React.useState({
    isOpen: false,
    id: "",
  });
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            {/* Телефон */}
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => handleSort("phone")}
            >
              <span>Телефон</span> {getSortIndicator("phone")}
            </th>

            {/* Имя */}
            <th
              className="py-3 px-2 text-left cursor-pointer xl:table-cell lg:table-cell md:table-cell sm:table-cell xs:hidden"
              onClick={() => handleSort("name")}
            >
              <span>Имя</span> {getSortIndicator("name")}
            </th>

            {/* Посещение */}
            <th
              className="py-3 px-2 text-left cursor-pointer xl:table-cell lg:table-cell md:table-cell sm:hidden"
              onClick={() => handleSort("lastVisit")}
            >
              <span>Посещение</span> {getSortIndicator("lastVisit")}
            </th>

            {/* Процент */}
            <th
              className="py-3 px-2 text-left cursor-pointer xl:table-cell lg:table-cell md:hidden"
              onClick={() => handleSort("cashbackPercentage")}
            >
              <span>Процент</span> {getSortIndicator("cashbackPercentage")}
            </th>

            {/* Сумма */}
            <th
              className="py-3 px-2 text-left cursor-pointer xl:table-cell lg:hidden"
              onClick={() => handleSort("totalCashback")}
            >
              <span>Сумма</span> {getSortIndicator("totalCashback")}
            </th>

            {/* Добавить покупку */}
            <th className="py-3 px-6 text-left xl:table-cell lg:hidden">
              Добавить покупку
            </th>

            {/* Посмотреть покупки */}
            <th className="py-3 px-6 text-left xl:table-cell lg:hidden">
              Посмотреть покупки
            </th>

            {/* Списать баллы */}
            <th className="py-3 px-6 text-left xl:table-cell lg:hidden">
              Списать баллы
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {sortedClients.map((client) => (
            <tr
              key={client.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              {/* Телефон */}
              <td className="py-3 px-6 text-left">
                <span>{client.phone}</span>
              </td>

              {/* Имя */}
              <td className="py-3 px-6 text-left whitespace-nowrap xl:table-cell lg:table-cell md:table-cell sm:table-cell xs:hidden">
                <span className="font-medium">{client.name}</span>
              </td>

              {/* Посещение */}
              <td className="py-3 px-6 text-left xl:table-cell lg:table-cell md:table-cell sm:hidden">
                <span>{client.formattedLastVisitDate}</span>
              </td>

              {/* Процент */}
              <td className="py-3 px-6 text-left text-teal-500 font-medium xl:table-cell lg:table-cell md:hidden">
                {client.cashbackPercentage}%
              </td>

              {/* Сумма */}
              <td className="py-3 px-6 text-left font-bold text-gray-700 xl:table-cell lg:hidden">
                ${client.totalCashback}
              </td>

              {/* Добавить покупку */}
              <td className="py-3 px-6 text-center font-bold text-gray-700 xl:table-cell lg:hidden">
                <button
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full border hover:bg-pink-600 hover:shadow-lg transition duration-300 ease-in-out"
                  onClick={() =>
                    setShowModal({ isOpen: true, id: client.id.toString() })
                  }
                >
                  Добавить
                </button>
              </td>

              {/* Посмотреть покупки */}
              <td className="py-3 px-6 text-center font-bold text-gray-700 xl:table-cell lg:hidden">
                <button
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full border hover:bg-pink-600 hover:shadow-lg transition duration-300 ease-in-out"
                  onClick={() => router.push(`clients/current/${client.id}`)}
                >
                  Посмотреть
                </button>
              </td>

              {/* Списать баллы */}
              <td className="py-3 px-6 text-center font-bold text-gray-700 xl:table-cell lg:hidden">
                <button
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full border hover:bg-pink-600 hover:shadow-lg transition duration-300 ease-in-out"
                  onClick={() =>
                    setShowModal({ isOpen: true, id: client.id.toString() })
                  }
                >
                  Списать
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalClientAddPurchase
        isOpen={buttonModal}
        onClose={() => setShowModal({ isOpen: false, id: "" })}
      />
    </div>
  );
};

export default ClientLine;
