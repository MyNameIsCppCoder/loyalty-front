function assignQuantiles(data: any[], key: string, numQuantiles: number = 4) {
  if (!Array.isArray(data)) {
    throw new Error("Первый аргумент должен быть массивом объектов.");
  }

  if (typeof key !== "string") {
    throw new Error(
      "Второй аргумент должен быть строкой, представляющей ключ объекта.",
    );
  }

  if (typeof numQuantiles !== "number" || numQuantiles <= 0) {
    throw new Error("Третий аргумент должен быть положительным числом.");
  }

  // Клонируем массив, чтобы не мутировать исходные данные
  const sortedData = [...data].sort((a, b) => a[key] - b[key]);

  const total = sortedData.length;
  const quantileSize = Math.floor(total / numQuantiles);

  // Обработка случаев, когда количество данных не делится нацело
  const quantiles = [];
  for (let i = 0; i < numQuantiles; i++) {
    const start = i * quantileSize;
    const end = i === numQuantiles - 1 ? total : (i + 1) * quantileSize;
    const quantileGroup = sortedData.slice(start, end);
    quantiles.push(quantileGroup);
  }

  // Создаём карту clientId -> quantile для быстрого присвоения
  const quantileMap = new Map();
  quantiles.forEach((group, index) => {
    group.forEach((client) => {
      quantileMap.set(client.clientId, index + 1); // Квантили начинаются с 1
    });
  });

  // Добавляем поле 'quantile' к каждому клиенту
  const categorizedData = data.map((client) => ({
    ...client,
    quantile: quantileMap.get(client.clientId) || null,
  }));

  return categorizedData;
}

export default assignQuantiles;
