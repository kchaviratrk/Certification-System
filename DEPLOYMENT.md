# DEPLOYMENT.md

## Despliegue y Montaje del Sistema de Certificación

Este documento describe el proceso recomendado para instalar y poner en marcha el sistema en servidores Windows (Windows 11/Server 2019) y Linux, integrando los instaladores automáticos y los pasos manuales necesarios.

---

### 1. Requisitos Previos

- **Windows 11/Server 2019** o **Linux (Ubuntu recomendado)**
- Acceso de administrador
- Conexión a internet

---

### 2. Clonar el Repositorio

```sh
git clone <URL_DEL_REPOSITORIO>
cd Certification System
```

---

### 3. Instalación Automática

#### **En Windows**

1. Abre una terminal (CMD o PowerShell) como administrador.
2. Ejecuta:
   ```bat
   Installers\installer.bat
   ```
   - Instala Node.js, Docker Desktop, dependencias backend/frontend y abre el instalador de SSMS.
   - Sigue las instrucciones en pantalla para completar la instalación de Docker Desktop y SSMS.

#### **En Linux**

1. Abre una terminal en la carpeta raíz del proyecto.
2. Da permisos de ejecución:
   ```sh
   chmod +x Installers/installer.sh
   ```
3. Ejecuta:
   ```sh
   ./Installers/installer.sh
   ```
   - Instala Node.js, Docker, dependencias y levanta SQL Server en Docker.

---

### 4. Configuración de Variables de Entorno

- Copia el archivo `.env.example` a `.env` y edítalo según tu entorno (usuario, contraseña, nombre de base de datos, etc).

---

### 5. Base de Datos

- Los scripts de base de datos se ejecutan automáticamente si usas los instaladores.
- Si necesitas hacerlo manualmente:
  1. Abre `BD-Related/schema.sql` en SSMS o Azure Data Studio.
  2. Ejecuta el script para crear las tablas.
  3. (Opcional) Ejecuta `sample-queries.sql` para datos de ejemplo.

---

### 6. Arranque de la Aplicación

#### **En Windows**

- Levanta SQL Server con Docker Desktop (si no está corriendo).
- Inicia backend y frontend:
  1. Abre dos terminales:
     - Backend:
       ```sh
       cd backend
       npm start
       ```
     - Frontend:
       ```sh
       cd frontend
       npm run dev
       ```
  2. O usa el script `start.sh` en entornos compatibles con bash.

#### **En Linux**

- Ejecuta:
  ```sh
  ./start.sh
  ```

---

### 7. Acceso a la Aplicación

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000/api](http://localhost:3000/api)
- Base de datos: Accesible por SSMS en `localhost,1433` (usuario/contraseña según `.env`)

---

### 8. Pruebas

- Backend:
  ```sh
  npm test
  ```
- Frontend:
  ```sh
  cd frontend
  npm test
  ```

---

### 9. Notas y Soporte

- Consulta los manuales en la carpeta `Users/` y la documentación en `BD-Related/`.
- Para problemas con Docker o SSMS, revisa la documentación oficial o contacta al administrador.

---
