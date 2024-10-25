import React, { useState } from "react";
import { onBuyClick } from "../bank/buyMin";
import ModalBuy from "../modalBuy/modalBuy";

export const Subscribe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<"start" | "business">("start");

  const handleBuyClick = (tariff: "start" | "business") => {
    setSelectedTariff(tariff);
    setIsModalOpen(true);
  };

  // Данные для тарифов
  const tariffs = [
    {
      name: "Стандарт",
      description: "Входит добавление менеджеров и 150 клиентов",
      price: "От 500 рублей или 2 чашек кофе",
      tariffType: "start",
    },
    {
      name: "Бизнес",
      description: "Входит добавление менеджеров и 1000 клиентов",
      price: "От 800 рублей или 4 чашек кофе",
      tariffType: "business",
    },
  ];

  // Варианты подписки
  const subscriptionOptions = [
    { months: 1, price: { start: 500, business: 800 } },
    { months: 3, price: { start: 1425, business: 2280 } },
    { months: 6, price: { start: 2700, business: 4320 } },
    { months: 12, price: { start: 5100, business: 8160 } },
  ];

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold text-center">Тарифы</h2>
      <div className="flex justify-center gap-5 py-2 mt-5">
        {tariffs.map((tariff) => (
          <div key={tariff.name} className="bg-white shadow-md rounded-lg py-4 px-4 flex flex-col justify-center gap-2">
            <h2 className="text-xl font-semibold text-center">{tariff.name}</h2>
            <p>{tariff.description}</p>
            <p>{tariff.price}</p>
            <button
              onClick={() => handleBuyClick(tariff.tariffType as "start" | "business")}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-200 self-center">
              Купить
            </button>
          </div>
        ))}
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <ModalBuy onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-center mb-4">Выберите период подписки</h2>
            <div className="flex flex-wrap justify-center gap-5">
              {subscriptionOptions.map((option) => (
                <div key={option.months} className="bg-white shadow-md rounded-lg py-4 px-4 flex flex-col justify-center gap-2 w-48">
                  <h3 className="text-lg font-semibold text-center">
                    {option.months} месяц{option.months > 1 ? "ев" : ""}
                  </h3>
                  <p className="text-center">{option.price[selectedTariff]} рублей</p>
                  <button
                    onClick={() => onBuyClick(selectedTariff, option.months)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition duration-200 self-center">
                    Купить
                  </button>
                </div>
              ))}
            </div>
          </div>
        </ModalBuy>
      )}
    </div>
  );
};
