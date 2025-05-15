import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskCounter from "./components/TaskCounter";
import {
  login,
  getTasks,
  createTask,
  deleteTask as deleteTaskApi,
} from "./api";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  // ✅ Verifica si hay token guardado en localStorage y carga tareas
  useEffect(() => {
    async function verificarToken() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const tareas = await getTasks();
        setIsAuthenticated(true);
        setTasks(tareas);
      } catch (err) {
        console.warn("Token inválido o expirado.");
        localStorage.removeItem("token");
      }
    }

    verificarToken();
  }, []);

  const handleLogin = async (email, password) => {
    const token = await login(email, password);
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      const tareas = await getTasks();
      setTasks(tareas);
    }
  };

  const handleRegister = async (email, password) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("No se pudo registrar");

    toast.success("✅ Registro exitoso. Ahora puedes iniciar sesión.");
    setMostrarRegistro(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setTasks([]);
    setEditIndex(null);
    localStorage.removeItem("token");
  };

  const obtenerFechaYHora = () => {
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString();
    const hora = ahora.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { fecha, hora };
  };

  const addTask = async (titulo, descripcion, prioridad) => {
    const { fecha, hora } = obtenerFechaYHora();

    if (editIndex !== null) {
      const tareasActualizadas = [...tasks];
      tareasActualizadas[editIndex] = {
        ...tareasActualizadas[editIndex],
        titulo,
        descripcion,
        prioridad,
        fecha,
        hora,
        editado: true,
      };
      setTasks(tareasActualizadas);
      setEditIndex(null);
    } else {
      try {
        const nuevaTarea = await createTask({
          titulo,
          descripcion,
          prioridad,
          fecha,
          hora,
          editado: false,
        });
        setTasks([...tasks, nuevaTarea]);
      } catch (err) {
        console.error("Error al crear tarea", err);
      }
    }
  };

  const deleteTask = async (index) => {
    const tarea = tasks[index];
    try {
      await deleteTaskApi(tarea.id);
      setTasks(tasks.filter((_, i) => i !== index));
      if (editIndex === index) setEditIndex(null);
    } catch (err) {
      console.error("Error al eliminar tarea", err);
    }
  };

  const editTask = (index) => setEditIndex(index);
  const cancelEdit = () => setEditIndex(null);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4">
      <Header />
      <ToastContainer position="top-center" autoClose={3000} />

      {!isAuthenticated ? (
        mostrarRegistro ? (
          <RegisterForm
            onRegister={handleRegister}
            cambiarAVistaLogin={() => setMostrarRegistro(false)}
          />
        ) : (
          <LoginForm
            onLogin={handleLogin}
            cambiarAVistaRegistro={() => setMostrarRegistro(true)}
          />
        )
      ) : (
        <div className="max-w-xl mx-auto mt-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Cerrar sesión
            </button>
          </div>

          <TaskForm
            onAddTask={addTask}
            editData={editIndex !== null ? tasks[editIndex] : null}
            isEditing={editIndex !== null}
            onCancelEdit={cancelEdit}
          />
          <TaskCounter count={tasks.length} />
          <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
        </div>
      )}
    </div>
  );
}

export default App;
