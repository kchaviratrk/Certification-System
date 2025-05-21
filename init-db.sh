#!/bin/bash
# Script para inicializar la base de datos de prueba en el contenedor SQL Server

set -e

DB_CONTAINER=sqlserver-test
SA_PASSWORD=YourStrong!Passw0rd

# Levanta el contenedor en segundo plano

docker-compose up -d

echo "Esperando a que SQL Server esté listo..."
# Espera a que el contenedor esté healthy
until [ "$(docker inspect -f '{{.State.Health.Status}}' $DB_CONTAINER)" == "healthy" ]; do
    sleep 2
    echo -n "."
done

echo "\nSQL Server está listo. Ejecutando scripts de inicialización..."

docker exec -i $DB_CONTAINER /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d master -i /docker-entrypoint-initdb.d/schema.sql

docker exec -i $DB_CONTAINER /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d master -i /docker-entrypoint-initdb.d/sample-queries.sql

echo "Base de datos inicializada correctamente."
