const { sql, config } = require("../models/Entrenamiento");

// Obtener todos los entrenamientos
exports.getEntrenamientos = async (req, res) => {
  console.log("[API] GET /entrenamientos");
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Entrenamientos`;
    res.json(result.recordset);
  } catch (err) {
    console.error("[API][ERROR] GET /entrenamientos:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Registrar un nuevo entrenamiento
exports.createEntrenamiento = async (req, res) => {
  console.log("[API] POST /entrenamientos", req.body);
  try {
    const {
      motivo,
      fecha,
      tipoCurso,
      duracion,
      nombreCurso,
      nombreInstructor,
      objetivos,
      evaluaciones,
      asistentes,
    } = req.body;
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO Entrenamientos (motivo, fecha, tipoCurso, duracion, nombreCurso, nombreInstructor, objetivos, evaluaciones, asistentes)
      VALUES (
        ${motivo}, ${fecha}, ${tipoCurso}, ${duracion}, ${nombreCurso}, ${nombreInstructor},
        ${JSON.stringify(objetivos)}, ${JSON.stringify(
      evaluaciones
    )}, ${JSON.stringify(asistentes)}
      );
      SELECT SCOPE_IDENTITY() AS id;
    `;
    res.status(201).json({ id: result.recordset[0].id });
  } catch (err) {
    console.error("[API][ERROR] POST /entrenamientos:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// Obtener un entrenamiento por ID
exports.getEntrenamientoById = async (req, res) => {
  console.log(`[API] GET /entrenamientos/${req.params.id}`);
  try {
    await sql.connect(config);
    const result =
      await sql.query`SELECT * FROM Entrenamientos WHERE id = ${req.params.id}`;
    if (result.recordset.length === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(
      `[API][ERROR] GET /entrenamientos/${req.params.id}:`,
      err.message
    );
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un entrenamiento
exports.updateEntrenamiento = async (req, res) => {
  console.log(`[API] PUT /entrenamientos/${req.params.id}`, req.body);
  try {
    const {
      motivo,
      fecha,
      tipoCurso,
      duracion,
      nombreCurso,
      nombreInstructor,
      objetivos,
      evaluaciones,
      asistentes,
      area,
      nivel,
    } = req.body;
    await sql.connect(config);
    await sql.query`
      UPDATE Entrenamientos SET
        motivo = ${motivo},
        fecha = ${fecha},
        tipoCurso = ${tipoCurso},
        duracion = ${duracion},
        nombreCurso = ${nombreCurso},
        nombreInstructor = ${nombreInstructor},
        objetivos = ${JSON.stringify(objetivos)},
        evaluaciones = ${JSON.stringify(evaluaciones)},
        asistentes = ${JSON.stringify(asistentes)},
        area = ${area},
        nivel = ${nivel}
      WHERE id = ${req.params.id}
    `;
    res.json({ message: "Entrenamiento actualizado" });
  } catch (err) {
    console.error(
      `[API][ERROR] PUT /entrenamientos/${req.params.id}:`,
      err.message
    );
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un entrenamiento
exports.deleteEntrenamiento = async (req, res) => {
  console.log(`[API] DELETE /entrenamientos/${req.params.id}`);
  try {
    await sql.connect(config);
    await sql.query`DELETE FROM Entrenamientos WHERE id = ${req.params.id}`;
    res.json({ message: "Entrenamiento eliminado" });
  } catch (err) {
    console.error(
      `[API][ERROR] DELETE /entrenamientos/${req.params.id}:`,
      err.message
    );
    res.status(400).json({ error: err.message });
  }
};
