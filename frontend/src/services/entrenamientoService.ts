const API_URL = "/api/entrenamientos";

export async function getEntrenamientos() {
  const res = await fetch(API_URL, { headers: authHeader() });
  return res.json();
}

export async function createEntrenamiento(data: {
  nombre: string;
  descripcion: string;
}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateEntrenamiento(
  id: number,
  data: { nombre: string; descripcion: string }
) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteEntrenamiento(id: number) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
}

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
