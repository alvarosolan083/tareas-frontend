import { motion, AnimatePresence } from "framer-motion";

const TaskList = ({ tasks, onDelete, onEdit }) => {
  const tareasOrdenadas = [...tasks].sort((a, b) => {
    const prioridades = { alta: 1, media: 2, baja: 3 };
    return prioridades[a.prioridad] - prioridades[b.prioridad];
  });

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-center text-white mb-4">
        Lista de Tareas
      </h2>

      {tareasOrdenadas.length === 0 ? (
        <p className="text-white text-center">Aún no hay tareas.</p>
      ) : (
        <ul className="space-y-4">
          <AnimatePresence>
            {tareasOrdenadas.map((task, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.25 }}
                className="bg-white text-gray-800 p-4 rounded shadow relative"
              >
                <div className="absolute top-2 right-3 text-xs text-slate-600 font-medium flex items-center gap-1">
                  {task.fecha} - {task.hora}
                  {task.editado ? (
                    <span className="italic text-yellow-600">(editada)</span>
                  ) : (
                    <motion.span
                      className="text-green-500"
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 1,
                        ease: "easeInOut",
                      }}
                    >
                      🆕
                    </motion.span>
                  )}
                </div>

                <h3 className="text-lg font-bold">{task.titulo}</h3>

                <p className="text-sm mt-1">
                  Prioridad:{" "}
                  {task.prioridad === "alta" && (
                    <span className="text-red-600">🔴 Alta</span>
                  )}
                  {task.prioridad === "media" && (
                    <span className="text-yellow-500">🟡 Media</span>
                  )}
                  {task.prioridad === "baja" && (
                    <span className="text-green-600">🟢 Baja</span>
                  )}
                </p>

                <p className="mt-2">{task.descripcion}</p>

                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => onEdit(index)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
};

export default TaskList;
