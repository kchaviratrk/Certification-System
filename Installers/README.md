# README Instalación de Dependencias del Sistema de Certificación

Este documento explica cómo instalar todas las dependencias necesarias para ejecutar el sistema completo (backend, frontend y base de datos).

## Requisitos previos

- **Node.js** v18 o superior
- **npm** (incluido con Node.js)
- **SQL Server** (puede ser local o remoto)
- **Git** (opcional, para clonar el repositorio)

## Instalación automática (recomendado)

### En Linux

1. Abre una terminal en la carpeta raíz del proyecto.
2. Da permisos de ejecución al instalador:
   ```bash
   chmod +x Installers/installer.sh
   ```
3. Ejecuta el instalador:
   ```bash
   ./Installers/installer.sh
   ```
   Esto instalará Node.js, las dependencias de backend y frontend, y mostrará instrucciones para SQL Server.

### En Windows

1. Abre una terminal (cmd o PowerShell) en la carpeta raíz del proyecto.
2. Ejecuta el instalador:
   ```bat
   Installers\installer.bat
   ```
   Esto instalará Node.js, las dependencias de backend y frontend, y abrirá el instalador de SQL Server Management Studio (SSMS).

## Instalación manual (alternativa)

1. Instala Node.js desde [nodejs.org](https://nodejs.org/).
2. Instala dependencias del backend:
   ```bash
   cd backend
   npm install
   cd ..
   ```
3. Instala dependencias del frontend:
   ```bash
   cd frontend
   npm install
   cd ..
   ```
4. Instala SQL Server en tu servidor o conecta a una instancia existente.
5. (Opcional) Instala SQL Server Management Studio (SSMS) en Windows para administrar la base de datos: [Descargar SSMS](https://aka.ms/ssms)

## Notas adicionales

- Configura las variables de entorno en el backend (`.env`) según tu entorno (ver MANUAL_TECNICO.md).
- Ejecuta los scripts de base de datos en `BD-Related/schema.sql` usando SSMS o Azure Data Studio.
- Para iniciar el sistema, usa el script `start.sh` en Linux o ejecuta manualmente los comandos de backend y frontend.

## Soporte

Consulta el `MANUAL_TECNICO.md` para detalles avanzados o solución de problemas.
