FROM node:18-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Dependencias necesarias para compilar módulos nativos (better-sqlite3)
# `sqlite-dev` proporciona las cabeceras necesarias para compilar bindings de sqlite
RUN apk add --no-cache build-base python3 linux-headers sqlite-dev

# Copiar archivos de dependencias e instalar todas las dependencias (dev incl.)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Forzar compilación del binding nativo de better-sqlite3 (alpine/linux)
RUN pnpm rebuild better-sqlite3 --build-from-source || true

# Opcional: eliminar herramientas de compilación si no son necesarias más adelante
# mantenemos sqlite-dev hasta después de la compilación, y luego limpiamos
RUN apk del build-base linux-headers sqlite-dev || true

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