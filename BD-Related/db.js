// Ejemplo de conexión a SQL Server usando mssql y variables de entorno
require("dotenv").config();
const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: false, // Cambia a true si usas Azure
    trustServerCertificate: true,
  },
};

// Log de conexión
async function testConnection() {
  try {
    await sql.connect(config);
    console.log("[DB] Conexión exitosa a SQL Server");
  } catch (err) {
    console.error("[DB] Error de conexión a SQL Server:", err.message);
  }
}
testConnection();

module.exports = { sql, config };
