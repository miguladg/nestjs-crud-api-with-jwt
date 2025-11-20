# Test Simple para Crear Vehículo (POST)

Este proyecto incluye un test e2e simple y un script bash para probar el endpoint `POST /vehicles` sin autenticación.

## Archivos

- **Test e2e**: `test/vehicle.post.e2e-spec.ts`
- **Script bash**: `scripts/test-create-vehicle.sh`

## Prerequisitos

**IMPORTANTE**: Asegúrate de tener la base de datos corriendo con Docker antes de ejecutar los tests:

```bash
docker compose up -d
```

## Cómo Ejecutar el Test e2e

1. Asegúrate de que la base de datos esté corriendo (Docker):
   ```bash
   docker compose up -d
   ```

2. Ejecuta el test específico:
   ```bash
   npm run test:e2e -- vehicle.post
   ```

   O ejecuta todos los tests e2e:
   ```bash
   npm run test:e2e
   ```

## Cómo Ejecutar el Script Bash

### Opción 1: Contra la app en Docker (recomendado)

```bash
# Asegúrate que Docker esté corriendo
docker compose up -d

# Ejecuta el script
./scripts/test-create-vehicle.sh
```

### Opción 2: Contra la app local

```bash
# 1. Asegúrate que Docker esté corriendo (solo DB)
docker compose up -d

# 2. Inicia la aplicación localmente
npm run start:dev

# 3. En otra terminal, ejecuta el script
chmod +x scripts/test-create-vehicle.sh
./scripts/test-create-vehicle.sh
```

## Payload de Ejemplo

```json
{
  "make": "Mazda",
  "model": "3",
  "year": 2019
}
```

## Respuesta Esperada

Status: `201 Created`

```json
{
  "id": 1,
  "make": "Mazda",
  "model": "3",
  "year": 2019,
  "createdAt": "2025-11-20T..."
}
```

## Notas Técnicas

### Cambio de bcrypt a bcryptjs

Se reemplazó `bcrypt` por `bcryptjs` para evitar problemas con módulos nativos. `bcryptjs` es una implementación en JavaScript puro que es compatible con `bcrypt` pero no requiere compilación nativa.

### Solución al error "MODULE_NOT_FOUND bcrypt"

Si ves el error `Cannot find module 'bcrypt_lib.node'`, significa que los binarios nativos de bcrypt no se compilaron correctamente. La solución fue:

1. Eliminar dependencias antiguas
2. Limpiar caché de pnpm
3. Cambiar a `bcryptjs`
4. Actualizar imports en `src/auth/auth.service.ts`
