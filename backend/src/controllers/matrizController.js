const { sql, config } = require("../models/Matriz");

// Obtener todas las matrices
exports.getMatrices = async (req, res) => {
  console.log("[API] GET /matrices");
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Matrices`;
    res.json(result.recordset);
  } catch (err) {
    console.error("[API][ERROR] GET /matrices:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Registrar una nueva matriz
exports.createMatriz = async (req, res) => {
  console.log("[API] POST /matrices", req.body);
  try {
    const { areaLinea, operadores } = req.body;
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO Matrices (areaLinea, operadores)
      VALUES (
        ${areaLinea}, ${JSON.stringify(operadores)}
      );
      SELECT SCOPE_IDENTITY() AS id;
    `;
    res.status(201).json({ id: result.recordset[0].id });
  } catch (err) {
    console.error("[API][ERROR] POST /matrices:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// Obtener una matriz por ID
exports.getMatrizById = async (req, res) => {
  console.log(`[API] GET /matrices/${req.params.id}`);
  try {
    await sql.connect(config);
    const result =
      await sql.query`SELECT * FROM Matrices WHERE id = ${req.params.id}`;
    if (result.recordset.length === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(`[API][ERROR] GET /matrices/${req.params.id}:`, err.message);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una matriz
exports.updateMatriz = async (req, res) => {
  console.log(`[API] PUT /matrices/${req.params.id}`, req.body);
  try {
    const { areaLinea, operadores } = req.body;
    await sql.connect(config);
    await sql.query`
      UPDATE Matrices SET
        areaLinea = ${areaLinea},
        operadores = ${JSON.stringify(operadores)}
      WHERE id = ${req.params.id}
    `;
    res.json({ message: "Matriz actualizada" });
  } catch (err) {
    console.error(`[API][ERROR] PUT /matrices/${req.params.id}:`, err.message);
    res.status(400).json({ error: err.message });
  }
};

// Eliminar una matriz
exports.deleteMatriz = async (req, res) => {
  console.log(`[API] DELETE /matrices/${req.params.id}`);
  try {
    await sql.connect(config);
    await sql.query`DELETE FROM Matrices WHERE id = ${req.params.id}`;
    res.json({ message: "Matriz eliminada" });
  } catch (err) {
    console.error(
      `[API][ERROR] DELETE /matrices/${req.params.id}:`,
      err.message
    );
    res.status(400).json({ error: err.message });
  }
};
