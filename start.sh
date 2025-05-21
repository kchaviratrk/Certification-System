#!/bin/bash
# Script para arrancar backend, frontend y base de datos en paralelo

# Obtener IP local para mostrar URLs de acceso
LOCAL_IP=$(hostname -I | awk '{print $1}')

# Levantar base de datos con Docker Compose
if [ -f docker-compose.yml ]; then
  echo "Levantando base de datos SQL Server en Docker..."
  docker-compose up -d
else
  echo "No se encontró docker-compose.yml, omitiendo base de datos en Docker."
fi

# Arrancar backend
echo "Iniciando backend (Node.js)..."
cd backend
npm install
npm start > ../backend.log 2>&1 &
cd ..

# Arrancar frontend
cd frontend
npm install
echo "Iniciando frontend (Vite) en modo accesible desde la red..."
npm run dev -- --host &
cd ..

sleep 2

# Mensajes de acceso
cat <<EOF

========================================
Sistema de Certificación iniciado

Acceso desde esta computadora:
  Frontend:   http://localhost:5173/login
  Backend:    http://localhost:3000/api

Acceso desde otros dispositivos en la red:
  Frontend:   http://$LOCAL_IP:5173/login
  Backend:    http://$LOCAL_IP:3000/api

(Verifica que el firewall permita los puertos 5173 y 3000)

Logs del backend: backend.log
========================================
EOF

# Esperar a que los procesos terminen (opcional)
wait
