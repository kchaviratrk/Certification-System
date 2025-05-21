# Pruebas del Sistema de Certificación

Este directorio contiene pruebas unitarias y de integración para el backend (Node.js/Express) y el frontend (React).

## Estructura

- `entrenamientoController.test.js`: Pruebas de endpoints del backend (Jest/Supertest)
- `App.test.jsx`: Pruebas de componentes del frontend (Vitest/Testing Library)

## Ejecución de pruebas

### Backend (Jest)

Desde la raíz del proyecto:

```bash
npm test
```

Esto ejecuta todas las pruebas de backend ubicadas en este directorio.

### Frontend (Vitest)

Desde la carpeta `frontend`:

```bash
cd frontend
npm test
```

Vitest está configurado para buscar pruebas en la carpeta `../Tests/`.

## Notas

- Asegúrate de tener las dependencias instaladas (`npm install` en raíz y en `frontend/`).
- Puedes agregar más archivos de prueba en este directorio para cubrir más módulos.
