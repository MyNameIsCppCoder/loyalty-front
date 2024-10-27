# Используем официальный образ Node.js в качестве базового
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Строим приложение
RUN npm run build

# Используем минимальный образ для запуска приложения
FROM node:18-alpine AS runner

WORKDIR /app

# Копируем зависимости и сборку из предыдущего этапа
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Экспонируем порт (обычно 3000 для Next.js)
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]