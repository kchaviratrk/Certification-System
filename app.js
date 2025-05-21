require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Habilita CORS para preflight requests (OPTIONS)
app.options("*", cors());

// Rutas
const routes = require("./backend/src/routes");
app.use("/api", routes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("[APP][ERROR] Error global:", err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

module.exports = app; // Exporta solo la app, sin escuchar el puerto
