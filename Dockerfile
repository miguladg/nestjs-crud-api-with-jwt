FROM node:18-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos de dependencias e instalar todas las dependencias (dev incl.)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copiar el resto del proyecto y compilar
COPY . .
RUN pnpm run build

FROM node:18-alpine AS runner

WORKDIR /app

# Instalar pnpm (en el runner solo para instalaciones de prod)
RUN npm install -g pnpm

# Copiar package/lock y solo instalar dependencias de producción
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# Copiar artefactos de build y archivos necesarios (prisma, env)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY .env ./

EXPOSE 3000

CMD ["node", "dist/main.js"]