#!/bin/bash
# Script de instalación para servidor Linux
set -e

# Instalar Node.js (v18 LTS)
echo "Instalando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar Docker y docker-compose
echo "Instalando Docker y docker-compose..."
sudo apt-get update
sudo apt-get install -y docker.io docker-compose
sudo systemctl enable --now docker

# Instalar dependencias backend
echo "Instalando dependencias del backend..."
cd backend
npm install
cd ..

# Instalar dependencias frontend
echo "Instalando dependencias del frontend..."
cd frontend
npm install
cd ..

# Instalar dependencias globales de pruebas (Jest, Vitest)
echo "Instalando herramientas de pruebas globales..."
sudo npm install -g jest vitest

# Levantar SQL Server en Docker
echo "Levantando SQL Server en Docker..."
docker-compose up -d

# Inicializar base de datos (opcional, requiere docker-compose y scripts en BD-Related)
echo "Inicializando base de datos de ejemplo..."
chmod +x ./init-db.sh
./init-db.sh

# Instrucción para SQL Server y SSMS
echo -e "\nIMPORTANTE: Puede administrar la base de datos con SQL Server Management Studio (SSMS) en Windows. Descargue SSMS desde: https://aka.ms/ssms\n"

echo -e "\nConsulte los manuales en la carpeta Users/ y la documentación en BD-Related/.\nPara ejecutar pruebas: npm test (backend) y cd frontend && npm test (frontend).\nPara iniciar el sistema: ./start.sh\n"