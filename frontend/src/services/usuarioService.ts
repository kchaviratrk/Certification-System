const API_URL = "/api/usuarios";

export async function getUsuarios() {
  const res = await fetch(API_URL, { headers: authHeader() });
  return res.json();
}

export async function createUsuario(data: { nombre: string; email: string }) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateUsuario(
  id: number,
  data: { nombre: string; email: string }
) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteUsuario(id: number) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
}

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
