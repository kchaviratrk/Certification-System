const { sql, config } = require("../models/Entrenamiento");

// Listar todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    await sql.connect(config);
    const result =
      await sql.query`SELECT UsuarioID, Nombre, Email, Rol, FechaRegistro FROM Usuarios`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const { Nombre, Email, PasswordHash, Rol } = req.body;
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO Usuarios (Nombre, Email, PasswordHash, Rol)
      VALUES (${Nombre}, ${Email}, ${PasswordHash}, ${Rol});
      SELECT SCOPE_IDENTITY() AS UsuarioID;
    `;
    res.status(201).json({ UsuarioID: result.recordset[0].UsuarioID });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Editar usuario
exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Email, Rol } = req.body;
    await sql.connect(config);
    await sql.query`
      UPDATE Usuarios SET Nombre=${Nombre}, Email=${Email}, Rol=${Rol} WHERE UsuarioID=${id}
    `;
    res.json({ message: "Usuario actualizado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await sql.connect(config);
    await sql.query`DELETE FROM Usuarios WHERE UsuarioID=${id}`;
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
