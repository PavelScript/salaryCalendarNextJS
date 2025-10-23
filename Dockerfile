# Этап 1: сборка
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем зависимости
COPY package*.json ./

# Устанавливаем ВСЕ зависимости для сборки
RUN npm ci && npm cache clean --force

# Копируем исходный код
COPY . .

# Собираем Next.js приложение
RUN npm run build

# Этап 2: production
FROM node:20-alpine AS runner

WORKDIR /app

# Создаем пользователя без root-прав
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Копируем только необходимое из builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Порт по умолчанию для Next.js
EXPOSE 3000

# Запуск с указанием хоста
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]