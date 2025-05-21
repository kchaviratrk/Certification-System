const { sql, config } = require("../models/CheckList");

// Obtener todos los checklists
exports.getCheckLists = async (req, res) => {
  console.log("[API] GET /checklists");
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM CheckLists`;
    res.json(result.recordset);
  } catch (err) {
    console.error("[API][ERROR] GET /checklists:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Registrar un nuevo checklist
exports.createCheckList = async (req, res) => {
  console.log("[API] POST /checklists", req.body);
  try {
    const {
      numeroReloj,
      nombre,
      foto,
      fechaIngreso,
      puesto,
      operaciones,
      firmas,
    } = req.body;
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO CheckLists (numeroReloj, nombre, foto, fechaIngreso, puesto, operaciones, firmas)
      VALUES (
        ${numeroReloj}, ${nombre}, ${foto}, ${fechaIngreso}, ${puesto},
        ${JSON.stringify(operaciones)}, ${JSON.stringify(firmas)}
      );
      SELECT SCOPE_IDENTITY() AS id;
    `;
    res.status(201).json({ id: result.recordset[0].id });
  } catch (err) {
    console.error("[API][ERROR] POST /checklists:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// Obtener un checklist por ID
exports.getCheckListById = async (req, res) => {
  console.log(`[API] GET /checklists/${req.params.id}`);
  try {
    await sql.connect(config);
    const result =
      await sql.query`SELECT * FROM CheckLists WHERE id = ${req.params.id}`;
    if (result.recordset.length === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(
      `[API][ERROR] GET /checklists/${req.params.id}:`,
      err.message
    );
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un checklist
exports.updateCheckList = async (req, res) => {
  console.log(`[API] PUT /checklists/${req.params.id}`, req.body);
  try {
    const {
      numeroReloj,
      nombre,
      foto,
      fechaIngreso,
      puesto,
      operaciones,
      firmas,
    } = req.body;
    await sql.connect(config);
    await sql.query`
      UPDATE CheckLists SET
        numeroReloj = ${numeroReloj},
        nombre = ${nombre},
        foto = ${foto},
        fechaIngreso = ${fechaIngreso},
        puesto = ${puesto},
        operaciones = ${JSON.stringify(operaciones)},
        firmas = ${JSON.stringify(firmas)}
      WHERE id = ${req.params.id}
    `;
    res.json({ message: "Checklist actualizado" });
  } catch (err) {
    console.error(
      `[API][ERROR] PUT /checklists/${req.params.id}:`,
      err.message
    );
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un checklist
exports.deleteCheckList = async (req, res) => {
  console.log(`[API] DELETE /checklists/${req.params.id}`);
  try {
    await sql.connect(config);
    await sql.query`DELETE FROM CheckLists WHERE id = ${req.params.id}`;
    res.json({ message: "Checklist eliminado" });
  } catch (err) {
    console.error(
      `[API][ERROR] DELETE /checklists/${req.params.id}:`,
      err.message
    );
    res.status(400).json({ error: err.message });
  }
};
