# 🚀 NestJS CRUD API con Autenticación JWT

API REST profesional construida con NestJS que implementa autenticación JWT, gestión de usuarios y CRUD completo de vehículos con PostgreSQL.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Endpoints API](#-endpoints-api)
- [Documentación Swagger](#-documentación-swagger)
- [Testing](#-testing)
- [Docker](#-docker)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Autor](#-autor)

## ✨ Características

- ✅ **Autenticación JWT** - Sistema completo de registro y login
- ✅ **CRUD Completo** - Gestión de vehículos (Create, Read, Update, Delete)
- ✅ **PostgreSQL** - Base de datos relacional robusta
- ✅ **TypeORM** - ORM moderno para TypeScript
- ✅ **Validación de Datos** - class-validator y class-transformer
- ✅ **Documentación Swagger** - API docs interactiva
- ✅ **Docker Ready** - Configuración completa con docker-compose
- ✅ **Testing E2E** - Tests de integración configurados
- ✅ **Seguridad** - Passwords hasheados con bcryptjs
- ✅ **TypeScript** - Tipado estático completo

## 🛠 Tecnologías

- **Framework**: NestJS 10.x
- **Runtime**: Node.js 18+
- **Lenguaje**: TypeScript 5.x
- **Base de Datos**: PostgreSQL 16
- **ORM**: TypeORM 0.3.x
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: class-validator
- **Testing**: Jest
- **Documentación**: Swagger/OpenAPI
- **Package Manager**: pnpm

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recomendado) o npm
- **Docker** y **Docker Compose** (opcional, pero recomendado)
- **PostgreSQL** 16 (si no usas Docker)

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/miguladg/nestjs-crud-api-with-jwt.git
cd nestjs-crud-api-with-jwt
```

### 2. Instalar dependencias

```bash
pnpm install
```

Si usas npm:
```bash
npm install
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nestdb

# JWT Configuration
JWT_SECRET=tu_secreto_super_seguro_aqui_cambiar_en_produccion
JWT_EXPIRES_IN=1d

# Application
PORT=3000
NODE_ENV=development
```

**⚠️ IMPORTANTE**: En producción, usa un `JWT_SECRET` fuerte y único.

## 🚀 Ejecución

### Opción 1: Con Docker (Recomendado)

Inicia todos los servicios (PostgreSQL, pgAdmin y NestJS):

```bash
docker compose up -d
```

La aplicación estará disponible en:
- **API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api/docs
- **pgAdmin**: http://localhost:8080 (admin@admin.com / admin123)

Para ver los logs:
```bash
docker compose logs -f nestjs
```

Para detener los servicios:
```bash
docker compose down
```

### Opción 2: Desarrollo Local

1. Inicia PostgreSQL con Docker:
```bash
docker compose up -d postgres
```

2. Ejecuta la aplicación en modo desarrollo:
```bash
pnpm run start:dev
```

3. La aplicación se reiniciará automáticamente al hacer cambios en el código.

### Opción 3: Producción

1. Construye el proyecto:
```bash
pnpm run build
```

2. Ejecuta la aplicación:
```bash
pnpm run start:prod
```

## 📚 Endpoints API

### 🔐 Autenticación

#### Registrar Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Respuesta** (201):
```json
{
  "message": "Usuario registrado exitosamente",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Iniciar Sesión
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Respuesta** (200):
```json
{
  "message": "Login exitoso",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### 🚗 Vehículos (Requiere JWT)

#### Obtener Todos los Vehículos
```http
GET /vehicles
Authorization: Bearer {token}
```

#### Obtener Vehículo por ID
```http
GET /vehicles/:id
Authorization: Bearer {token}
```

#### Crear Vehículo
```http
POST /vehicles
Authorization: Bearer {token}
Content-Type: application/json

{
  "make": "Toyota",
  "model": "Corolla",
  "year": 2023,
  "description": "Sedán 4 puertas, color blanco"
}
```

#### Actualizar Vehículo
```http
PATCH /vehicles/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "year": 2024,
  "description": "Actualizado"
}
```

#### Eliminar Vehículo
```http
DELETE /vehicles/:id
Authorization: Bearer {token}
```

## 📖 Documentación Swagger

Accede a la documentación interactiva de la API en:

**http://localhost:3000/api/docs**

Swagger proporciona:
- 📝 Documentación completa de todos los endpoints
- 🧪 Interfaz para probar los endpoints directamente
- 🔐 Autenticación JWT integrada
- 📊 Modelos de datos y ejemplos
- ✅ Códigos de respuesta HTTP

### Cómo usar Swagger con JWT:

1. Abre http://localhost:3000/api/docs
2. Ejecuta `POST /auth/login` para obtener un token
3. Copia el `access_token` de la respuesta
4. Haz clic en el botón **"Authorize"** (🔒) en la parte superior
5. Pega el token y haz clic en **"Authorize"**
6. Ahora puedes probar todos los endpoints protegidos

## 🧪 Testing

### Tests E2E

Ejecuta los tests de integración:

```bash
# Todos los tests
pnpm run test:e2e

# Test específico de vehículos
pnpm run test:e2e -- vehicle.post
```

### Script de Prueba con cURL

Prueba rápida del endpoint POST /vehicles:

```bash
chmod +x scripts/test-create-vehicle.sh
./scripts/test-create-vehicle.sh
```

## 🐳 Docker

### Servicios Disponibles

El `docker-compose.yml` incluye:

1. **postgres** - Base de datos PostgreSQL 16
   - Puerto: 5432
   - Usuario: nestuser
   - Password: nestpass
   - Database: nestdb

2. **pgadmin** - Interfaz web para PostgreSQL
   - Puerto: 8080
   - Email: admin@admin.com
   - Password: admin123

3. **nestjs** - Aplicación NestJS
   - Puerto: 3000

### Comandos Docker Útiles

```bash
# Iniciar todos los servicios
docker compose up -d

# Ver logs en tiempo real
docker compose logs -f

# Detener servicios
docker compose down

# Reconstruir imágenes
docker compose up --build

# Eliminar volúmenes (⚠️ elimina datos)
docker compose down -v

# Ejecutar comando dentro del contenedor
docker compose exec nestjs sh
```

## 📁 Estructura del Proyecto

```
nestjs-crud-api-with-jwt/
├── src/
│   ├── auth/                 # Módulo de autenticación
│   │   ├── dto/             # DTOs de login/register
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── jwt.strategy.ts  # Estrategia JWT Passport
│   ├── users/               # Módulo de usuarios
│   │   ├── user.entity.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── vehicles/            # Módulo de vehículos
│   │   ├── dto/            # DTOs create/update
│   │   ├── vehicle.entity.ts
│   │   ├── vehicles.controller.ts
│   │   ├── vehicles.service.ts
│   │   └── vehicles.module.ts
│   ├── app.module.ts        # Módulo principal
│   └── main.ts              # Entry point + Swagger config
├── test/                    # Tests E2E
│   ├── vehicle.post.e2e-spec.ts
│   └── jest-e2e.json
├── scripts/                 # Scripts de utilidad
│   └── test-create-vehicle.sh
├── docker-compose.yml       # Configuración Docker
├── Dockerfile              # Imagen Docker
├── .env                    # Variables de entorno
├── package.json
├── tsconfig.json
└── README.md
```

## 🔒 Seguridad

- ✅ Passwords hasheados con **bcryptjs**
- ✅ JWT con expiración configurable
- ✅ Validación de datos con **class-validator**
- ✅ Variables de entorno para secretos
- ✅ Guards de autenticación en rutas protegidas

**⚠️ Recomendaciones de Producción:**
- Cambia `JWT_SECRET` a un valor fuerte y único
- Usa HTTPS
- Implementa rate limiting
- Habilita CORS de manera restrictiva
- Usa variables de entorno seguras (no commitees `.env`)

## 📝 Scripts Disponibles

```bash
# Desarrollo
pnpm run start:dev          # Modo watch con hot-reload

# Producción
pnpm run build              # Compilar TypeScript
pnpm run start:prod         # Ejecutar versión compilada

# Testing
pnpm run test               # Tests unitarios
pnpm run test:e2e           # Tests E2E
pnpm run test:cov           # Coverage de tests

# Linting
pnpm run lint               # Ejecutar ESLint con fix
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 👨‍💻 Autor

**Miguel Angel Duarte**
- Email: migul.a.d.g@gmail.com
- GitHub: [@miguladg](https://github.com/miguladg)

## 📄 Licencia

Este proyecto no tiene licencia especificada. Contacta al autor para más información.

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub
