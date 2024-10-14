"use client";

import ModalClientAddPurchase from "@/app/components/modalClient/modalClientAddPurchase";
import { ModalClientBuyBalance } from "@/app/components/modalClient/modalClientBuyBalance";
import { ModalClientDelete } from "@/app/components/modalClient/modalClientDelete";
import { ModalClientUpdate } from "@/app/components/modalClient/modalClientUpdate";
import SideBarCabinet from "@/app/components/sideBarCabinet/sideBarCabinet";
import { axiosWithAuth } from "@/interceptors/interceptors";
import { ClientResponse } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ClientPage: React.FC = () => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Не указано";
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const params = useParams();
  const id = params?.id as string | undefined;

  const [client, setClient] = useState<ClientResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState({ isOpen: false, id: "" });
  const [showModalBuy, setShowModalBuy] = useState({ isOpen: false, id: "" });
  const [showModalDelete, setShowModalDelete] = useState({
    isOpen: false,
    id: "",
  });
  const [showPurchase, setShowPurchase] = useState(false);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    if (!id) return;

    const clientReq = async () => {
      try {
        const responseClient = await axiosWithAuth(`/clients/id/${id}/`);
        const responsePurchases = await axiosWithAuth(`purchase/client/${id}/`);
        console.log(responseClient.data);
        const dataClient = {
          ...responseClient.data,
          amount: responseClient.data.cashBackTransaction.reduce(
            (acc, el) => acc + el.amount,
            0,
          ),
        };
        console.log(responsePurchases.data);
        setClient(dataClient);
        setPurchases(responsePurchases.data);
        setLoading(false);
      } catch (err: any) {
        console.log("Error: ", err);
        setError("Не удалось получить данные клиента.");
        setLoading(false);
      }
    };

    clientReq();
  }, [id, showModalUpdate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Загрузка...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex justify-center items-center h-screen">
        Клиент не найден.
      </div>
    );
  }

  return (
    <div className="flex h-svh">
      <SideBarCabinet />
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Информация о клиенте
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700">Имя</h3>
            <p className="mt-1 text-gray-600">{client.name}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700">Телефон</h3>
            <p className="mt-1 text-gray-600">{client.phone}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700">Почта</h3>
            <p className="mt-1 text-gray-600">{client.email}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700">Дата рождения</h3>
            <p className="mt-1 text-gray-600">{formatDate(client.birthDate)}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700">
              Процент кешбэка
            </h3>
            <p className="mt-1 text-teal-500 font-semibold">
              {client.cashbackPercentage}%
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700">Общий кешбэк</h3>
            <p className="mt-1 text-gray-600">
              $
              {typeof client.amount === "number"
                ? client.amount
                : client.amount}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700">Дата создания</h3>
            <p className="mt-1 text-gray-600">{formatDate(client.createdAt)}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700">
              Дата обновления
            </h3>
            <p className="mt-1 text-gray-600">{formatDate(client.updatedAt)}</p>
          </div>
          {/* start of buttons */}

          <div className="col-span-2 flex justify-between gap-10 min-w-full">
            <button
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full border hover:bg-pink-600 hover:shadow-lg transition duration-300 ease-in-out"
              onClick={() =>
                setShowModalAdd({ isOpen: true, id: String(client.id) })
              }
            >
              Добавить покупку
            </button>
            <button
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full border hover:bg-pink-600 hover:shadow-lg transition duration-300 ease-in-out"
              onClick={() =>
                setShowModalBuy({ isOpen: true, id: String(client.id) })
              }
            >
              Списать баллы
            </button>
            <button
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full border hover:bg-pink-600 hover:shadow-lg transition duration-300 ease-in-out"
              onClick={() => setShowModalUpdate(true)}
            >
              Обновить
            </button>
            <button
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full border hover:bg-pink-600 hover:shadow-lg transition duration-300 ease-in-out"
              onClick={() =>
                setShowModalDelete({ isOpen: true, id: String(client.id) })
              }
            >
              Удалить
            </button>
          </div>
          {/* end of buttons */}
          <button
            className={`col-span-2 w-2/3 m-auto text-center bg-gray-500 text-white font-bold py-2
                px-4 rounded-full border hover:bg-pink-600 hover:shadow-lg transition duration-300 ease-in-out
                ${showPurchase ? "bg-pink-600" : "bg-gray-500"}`}
            onClick={() => setShowPurchase(!showPurchase)}
          >
            <p>{showPurchase ? "Скрыть покупки" : "Посмотреть покупки"}</p>
          </button>
          {showPurchase && (
            <div
              className={`col-span-2 mt-6 space-y-4 transition-opacity duration-500 ease-in-out ${showPurchase ? "opacity-100" : "opacity-0"}`}
            >
              <h3 className="text-xl font-semibold mb-4 text-center">
                Покупки клиента
              </h3>
              {purchases.length > 0 ? (
                purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="bg-gray-100 p-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-200"
                  >
                    <p className="text-md font-semibold">
                      Сумма: ${purchase.amount}
                    </p>
                    <p className="text-sm text-gray-600">
                      Дата покупки: {formatDate(purchase.createdAt)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">Покупок нет.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <ModalClientUpdate
        isActive={showModalUpdate}
        onClose={() => setShowModalUpdate(false)}
        id={client.id}
        setNewClient={setClient}
        oldClient={client}
      />
      <ModalClientAddPurchase
        isOpen={showModalAdd}
        onClose={() => setShowModalAdd({ isOpen: false, id: "" })}
        setNewClient={setClient}
        oldClient={client}
      />
      <ModalClientBuyBalance
        isOpen={showModalBuy}
        onClose={() => setShowModalBuy({ isOpen: false, id: "" })}
        setNewClient={setClient}
        oldClient={client}
      />
      <ModalClientDelete
        isOpen={showModalDelete}
        onClose={() => setShowModalDelete({ isOpen: false, id: "" })}
        client={client}
      />
    </div>
  );
};

export default ClientPage;
