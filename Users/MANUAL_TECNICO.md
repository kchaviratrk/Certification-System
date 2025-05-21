# MANUAL TECNICO – Sistema de Certificación

## Descripción General

Este documento está dirigido a administradores y personal técnico encargado del mantenimiento y despliegue del Sistema de Certificación. Aquí se detallan aspectos de arquitectura, instalación, configuración, estructura de carpetas y tareas comunes de soporte.

---

## Estructura del Proyecto

- **backend/**: Código fuente del backend (Node.js + Express)
  - `src/controllers/`: Lógica de negocio y controladores de rutas
  - `src/models/`: Modelos de datos
  - `src/routes/`: Definición de rutas
  - `src/middlewares/`: Middlewares de autenticación y autorización
- **frontend/**: Código fuente del frontend (React + Vite)
  - `src/components/`: Componentes reutilizables
  - `src/pages/`: Vistas principales
- **BD-Related/**: Scripts y documentación de base de datos
  - `schema.sql`: Estructura de tablas
  - `sample-queries.sql`: Consultas de ejemplo
  - `README.md`: Documentación técnica de la base de datos
- **start.sh**: Script para instalar dependencias y arrancar ambos servidores

---

## Instalación y Puesta en Marcha

1. **Requisitos**:

   - Node.js (v18+ recomendado)
   - npm
   - SQL Server (local o remoto)

2. **Configuración**:

   - Clonar el repositorio en el servidor destino.
   - Configurar las variables de entorno en el backend (`.env`):
     - `DB_USER`, `DB_PASSWORD`, `DB_SERVER`, `DB_DATABASE`, `JWT_SECRET`, etc.
   - Crear la base de datos ejecutando los scripts en `BD-Related/schema.sql`.

3. **Ejecución**:
   - Dar permisos de ejecución a `start.sh` (`chmod +x start.sh`).
   - Ejecutar `./start.sh` para instalar dependencias y levantar backend y frontend.
   - El frontend estará disponible en `http://localhost:5173` (o el puerto configurado).

---

## Mantenimiento y Soporte

- **Logs**: Revisar logs de errores en consola o configurar salida a archivos.
- **Actualización de dependencias**: Ejecutar `npm update` en backend y frontend periódicamente.
- **Respaldo de base de datos**: Realizar backups regulares de SQL Server.
- **Usuarios y roles**: Los roles y permisos se gestionan en la tabla de usuarios. Para agregar roles, modificar la lógica en los middlewares de backend.
- **Seguridad**: Cambiar periódicamente el `JWT_SECRET` y las contraseñas de la base de datos.

---

## Estructura de la Base de Datos

- Consultar `BD-Related/schema.sql` para la estructura de tablas.
- Consultar `BD-Related/sample-queries.sql` para ejemplos de inserción y consulta.

---

## Contacto y Soporte

Para soporte técnico, contactar al desarrollador principal o consultar la documentación en la carpeta `BD-Related`.
