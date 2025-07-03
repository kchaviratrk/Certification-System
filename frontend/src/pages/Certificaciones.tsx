import React, { useEffect, useState } from "react";
import {
  createCertificacion,
  deleteCertificacion,
  getCertificaciones,
  updateCertificacion,
} from "../services/certificacionService";

interface Certificacion {
  id: number;
  nombre: string;
  descripcion: string;
}

const Certificaciones: React.FC = () => {
  const [certificaciones, setCertificaciones] = useState<Certificacion[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Certificacion | null>(null);
  const [form, setForm] = useState({ nombre: "", descripcion: "" });

  const fetchData = async () => {
    const data = await getCertificaciones();
    setCertificaciones(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (item?: Certificacion) => {
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
      await updateCertificacion(editing.id, form);
    } else {
      await createCertificacion(form);
    }
    handleClose();
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await deleteCertificacion(id);
    fetchData();
  };

  return (
    <div>
      <h2>Certificaciones</h2>
      <button onClick={() => handleOpen()}>Nueva Certificación</button>
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
          {certificaciones.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nombre}</td>
              <td>{c.descripcion}</td>
              <td>
                <button onClick={() => handleOpen(c)}>Editar</button>
                <button onClick={() => handleDelete(c.id)}>Eliminar</button>
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
          <h3>{editing ? "Editar" : "Nueva"} Certificación</h3>
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

export default Certificaciones;
