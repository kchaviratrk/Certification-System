# Sistema de Certificación – Documentación General

Este proyecto es una plataforma web para la gestión de entrenamientos, checklists y matriz de habilidades de operadores. Incluye backend (Node.js/Express), frontend (React/Vite), scripts de base de datos (SQL Server), instaladores multiplataforma y documentación para usuarios y técnicos.

---

## Estructura del Proyecto

- **backend/**: Lógica de negocio, API REST, autenticación y controladores.
  - `src/controllers/`: Controladores de rutas (entrenamientos, checklists, matriz, usuarios, auth).
  - `src/models/`: Modelos de conexión a la base de datos.
  - `src/routes/`: Definición de rutas y protección por roles.
  - `src/middlewares/`: Middlewares de autenticación y autorización.
  - `tests/`: Pruebas unitarias e integración del backend (Jest/Supertest).
- **frontend/**: Aplicación React (Vite) para la interfaz de usuario.
  - `src/components/`: Componentes reutilizables (tablas, formularios, auth, errores, etc).
  - `src/pages/`: Vistas principales (dashboard, entrenamientos, checklists, matriz, usuarios, login/logout).
  - `__tests__/`: Pruebas de componentes frontend (Vitest/Testing Library).
- **BD-Related/**: Scripts y documentación de la base de datos (SQL Server).
  - `schema.sql`: Estructura de tablas y relaciones.
  - `sample-queries.sql`: Consultas de ejemplo para pruebas y desarrollo.
  - `db.js`: Configuración de conexión a SQL Server.
  - `README.md`: Explicación de la estructura y uso de la base de datos.
  - `.env.example`: Ejemplo de configuración de variables de entorno.
- **Installers/**: Instaladores automáticos para Linux y Windows.
  - `installer.sh`: Instalador para Linux (Node.js, dependencias, instrucciones SQL Server).
  - `installer.bat`: Instalador para Windows (Node.js, dependencias, abre instalador de SSMS).
  - `README.md`: Guía de instalación automática y manual.
- **Users/**: Manuales para usuarios y técnicos.
  - `MANUAL_USUARIO.md`: Guía de uso para usuarios finales.
  - `MANUAL_TECNICO.md`: Guía técnica para despliegue, mantenimiento y soporte.
- **Tests/**: Pruebas de integración y unitarias para backend y frontend.
  - `entrenamientoController.test.js`: Pruebas de endpoints backend.
  - `App.test.jsx`: Pruebas de componentes frontend.
  - `README.md`: Instrucciones para ejecutar las pruebas.
- **Archivos raíz**:
  - `app.js`, `server.js`: Configuración y arranque del backend.
  - `start.sh`: Script para iniciar backend y frontend en paralelo.
  - `docker-compose.yml`: Configuración para levantar SQL Server en Docker.
  - `.env`: Variables de entorno para backend y base de datos.
  - `package.json`: Dependencias y scripts del backend.

---

## Funcionalidades Principales

- **Backend (Node.js/Express):**

  - API RESTful para entrenamientos, checklists, matriz de habilidades y usuarios.
  - Autenticación JWT y autorización por roles.
  - Conexión a SQL Server usando variables de entorno.
  - Pruebas con Jest y Supertest.

- **Frontend (React/Vite):**

  - Login y logout seguro.
  - Dashboard con KPIs, gráficos y accesos rápidos.
  - CRUD de usuarios (solo admin), entrenamientos, checklists y matriz de habilidades.
  - Formularios y tablas responsivas.
  - Manejo global de errores y notificaciones.
  - Pruebas con Vitest y Testing Library.

- **Base de Datos (SQL Server):**

  - Tablas: Usuarios, Entrenamientos, Checklists, Matriz de Habilidades.
  - Scripts para creación y datos de ejemplo.
  - Soporte para Docker y conexión local/remota.

- **Instaladores:**

  - Scripts automáticos para instalar Node.js, dependencias y guiar la instalación de SQL Server.
  - Compatibles con Linux y Windows.

- **Documentación:**
  - Manual de usuario y técnico.
  - Documentación de base de datos y pruebas.

---

## Archivos y Carpetas Clave

- **backend/src/controllers/**: Lógica de cada módulo (entrenamientos, checklists, matriz, usuarios, auth).
- **backend/src/routes/index.js**: Todas las rutas de la API y protección por roles.
- **backend/src/middlewares/auth.js**: Middleware de autenticación y autorización JWT.
- **frontend/src/pages/**: Vistas principales de la app.
- **frontend/src/components/**: Componentes reutilizables (tablas, formularios, auth, errores, etc).
- **BD-Related/schema.sql**: Estructura de la base de datos.
- **Installers/installer.sh y installer.bat**: Instaladores automáticos.
- **Tests/**: Pruebas de backend y frontend.
- **Users/MANUAL_USUARIO.md**: Manual para usuarios finales.
- **Users/MANUAL_TECNICO.md**: Manual para administradores y soporte.

---

## ¿Cómo empezar?

1. Lee el `Installers/README.md` para instalar dependencias y preparar el entorno.
2. Configura las variables de entorno en `.env` (puedes copiar `.env.example`).
3. Ejecuta los scripts de base de datos en `BD-Related/schema.sql`.
4. Usa `start.sh` para iniciar backend y frontend.
5. Accede a la app en `http://localhost:5173`.
6. Consulta los manuales en la carpeta `Users/` para más detalles de uso y soporte.

---

## Soporte

Para dudas técnicas, revisa `Users/MANUAL_TECNICO.md` o contacta al desarrollador principal.
