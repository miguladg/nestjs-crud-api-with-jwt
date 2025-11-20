FROM node:18-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos de dependencias e instalar todas las dependencias (dev incl.)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar el resto del proyecto y compilar
COPY . .
RUN pnpm run build

FROM node:18-alpine AS runner

WORKDIR /app

# Ejecutar en modo producción
ENV NODE_ENV=production

# Instalar pnpm (necesario para pnpm install --prod)
RUN npm install -g pnpm

# Copiar package/lock e instalar solo dependencias de producción

# Copiar node_modules construidos en la etapa builder (incluye bindings nativos)
COPY --from=builder /app/node_modules ./node_modules

# Copiar artefactos de build
COPY --from=builder /app/dist ./dist

# No existe prisma en este proyecto: no copiar ni instalar nada de Prisma
EXPOSE 3000

CMD ["node", "dist/main.js"]