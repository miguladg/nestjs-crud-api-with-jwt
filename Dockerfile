FROM node:18-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias de producción
RUN pnpm install --prod

# Copiar el resto del proyecto
COPY . .

# Copiar archivos necesarios para Prisma
COPY .env ./
COPY prisma ./prisma

# Construir la aplicación
RUN pnpm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]