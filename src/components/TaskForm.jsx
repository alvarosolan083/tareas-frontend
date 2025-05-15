import { useEffect, useState } from "react";

const TaskForm = ({ onAddTask, editData, isEditing, onCancelEdit }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("media");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing && editData) {
      setTitulo(editData.titulo);
      setDescripcion(editData.descripcion);
      setPrioridad(editData.prioridad || "media");
    }
  }, [editData, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim() || !descripcion.trim()) {
      setError("Ambos campos son obligatorios.");
      return;
    }

    onAddTask(titulo.trim(), descripcion.trim(), prioridad);
    setTitulo("");
    setDescripcion("");
    setPrioridad("media");
    setError("");
  };

  const handleCancel = () => {
    setTitulo("");
    setDescripcion("");
    setPrioridad("media");
    setError("");
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-md shadow-md space-y-4">
      <div>
        <label className="block mb-1 text-white">Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej: Hacer compras"
          className="w-full p-2 rounded-md text-black"
        />
      </div>

      <div>
        <label className="block mb-1 text-white">Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ej: Comprar pan, leche y arroz"
          className="w-full p-2 rounded-md text-black"
        ></textarea>
      </div>

      <div>
        <label className="block mb-1 text-white">Prioridad:</label>
        <select
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
          className="w-full p-2 rounded-md text-black"
        >
          <option value="alta">🔴 Alta</option>
          <option value="media">🟡 Media</option>
          <option value="baja">🟢 Baja</option>
        </select>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          className={`${
            isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-cyan-500 hover:bg-cyan-600"
          } text-white px-4 py-2 rounded-md transition w-full`}
        >
          {isEditing ? "Actualizar Tarea" : "Agregar Tarea"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition w-full"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
