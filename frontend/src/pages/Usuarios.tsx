import React, { useEffect, useState } from "react";
import {
  createUsuario,
  deleteUsuario,
  getUsuarios,
  updateUsuario,
} from "../services/usuarioService";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Usuario | null>(null);
  const [form, setForm] = useState({ nombre: "", email: "" });

  const fetchData = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (item?: Usuario) => {
    setEditing(item || null);
    setForm(
      item
        ? { nombre: item.nombre, email: item.email }
        : { nombre: "", email: "" }
    );
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditing(null);
    setForm({ nombre: "", email: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await updateUsuario(editing.id, form);
    } else {
      await createUsuario(form);
    }
    handleClose();
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await deleteUsuario(id);
    fetchData();
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <button onClick={() => handleOpen()}>Nuevo Usuario</button>
      <table border={1} cellPadding={4} style={{ marginTop: 16 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => handleOpen(u)}>Editar</button>
                <button onClick={() => handleDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            padding: 16,
            marginTop: 16,
          }}
        >
          <h3>{editing ? "Editar" : "Nuevo"} Usuario</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <button type="submit">Guardar</button>
            <button type="button" onClick={handleClose}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
