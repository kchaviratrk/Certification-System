@echo off
REM Script de instalación para Windows

REM Instalar Node.js (descarga e instalación silenciosa)
echo Instalando Node.js...
IF NOT EXIST node-v18.19.1-x64.msi (
  powershell -Command "Invoke-WebRequest -Uri https://nodejs.org/dist/v18.19.1/node-v18.19.1-x64.msi -OutFile node-v18.19.1-x64.msi"
)
msiexec /i node-v18.19.1-x64.msi /quiet /norestart

REM Instalar Docker Desktop
echo Instalando Docker Desktop...
powershell -Command "Start-Process 'https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe'"
echo Siga el instalador de Docker Desktop para completar la instalación.

REM Instalar dependencias backend
echo Instalando dependencias del backend...
cd backend
call npm install
cd ..

REM Instalar dependencias frontend
echo Instalando dependencias del frontend...
cd frontend
call npm install
cd ..

REM Instalar dependencias globales de pruebas (Jest, Vitest)
echo Instalando herramientas de pruebas globales...
npm install -g jest vitest

REM Levantar SQL Server en Docker
echo Levantando SQL Server en Docker...
docker-compose up -d

REM Inicializar base de datos (opcional, requiere docker-compose y scripts en BD-Related)
echo Inicializando base de datos de ejemplo...
call bash init-db.sh

REM Instalar SQL Server Management Studio (SSMS)
echo Instalando SQL Server Management Studio (SSMS)...
powershell -Command "Start-Process 'https://aka.ms/ssms'"
echo Siga el instalador de SSMS para completar la instalación.

echo Instalación completada. Configure su base de datos SQL Server y edite el archivo .env según corresponda.
echo Consulte los manuales en la carpeta Users/ y la documentación en BD-Related/.
echo Para ejecutar pruebas: npm test (backend) y cd frontend && npm test (frontend).
echo Para iniciar el sistema: start.sh (Linux) o manualmente en Windows.
