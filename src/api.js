const API_URL = 'http://localhost:3000';

let token = localStorage.getItem("token") || '';

export function setToken(newToken) {
  token = newToken;
  localStorage.setItem("token", newToken);
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Error en login');

  const data = await res.json();
  setToken(data.access_token);
  return data.access_token;
}

export async function getTasks() {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Error al obtener tareas');
  return res.json();
}

export async function createTask(tarea) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tarea),
  });

  if (!res.ok) throw new Error('Error al crear tarea');
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Error al eliminar tarea');
}
