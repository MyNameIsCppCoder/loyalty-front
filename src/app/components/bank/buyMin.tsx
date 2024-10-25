import { axiosWithAuth } from "@/interceptors/interceptors";

export const onBuyClick = async (tariff: "start" | "business", months: number) => {
  try {
    // Формируем URL для соответствующего тарифа и количества месяцев
    const endpoint = tariff === "start" ? `bank/buy/start/${months}` : `bank/buy/business/${months}`;

    // Получаем данные для оплаты с вашего сервера
    const res = await axiosWithAuth.get(endpoint);
    const data = res.data;

    // Создаём форму и добавляем её к документу
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://pay.modulbank.ru/pay";

    Object.keys(data).forEach((key) => {
      if (data[key] !== "") {
        // Исключаем пустые поля
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
      }
    });
    console.log(data);
    document.body.appendChild(form);
    form.submit();
  } catch (error) {
    console.error("Ошибка при получении данных для оплаты:", error);
  }
};
