import React, { useEffect, useState } from "react";
import {
  createEntrenamiento,
  deleteEntrenamiento,
  getEntrenamientos,
  updateEntrenamiento,
} from "../services/entrenamientoService";

interface Entrenamiento {
  id: number;
  nombre: string;
  descripcion: string;
}

const Entrenamientos: React.FC = () => {
  const [entrenamientos, setEntrenamientos] = useState<Entrenamiento[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Entrenamiento | null>(null);
  const [form, setForm] = useState({ nombre: "", descripcion: "" });

  const fetchData = async () => {
    const data = await getEntrenamientos();
    setEntrenamientos(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (item?: Entrenamiento) => {
    setEditing(item || null);
    setForm(
      item
        ? { nombre: item.nombre, descripcion: item.descripcion }
        : { nombre: "", descripcion: "" }
    );
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditing(null);
    setForm({ nombre: "", descripcion: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await updateEntrenamiento(editing.id, form);
    } else {
      await createEntrenamiento(form);
    }
    handleClose();
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await deleteEntrenamiento(id);
    fetchData();
  };

  return (
    <div>
      <h2>Entrenamientos</h2>
      <button onClick={() => handleOpen()}>Nuevo Entrenamiento</button>
      <table border={1} cellPadding={4} style={{ marginTop: 16 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {entrenamientos.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.nombre}</td>
              <td>{e.descripcion}</td>
              <td>
                <button onClick={() => handleOpen(e)}>Editar</button>
                <button onClick={() => handleDelete(e.id)}>Eliminar</button>
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
          <h3>{editing ? "Editar" : "Nuevo"} Entrenamiento</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={(e) =>
                setForm({ ...form, descripcion: e.target.value })
              }
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

export default Entrenamientos;
