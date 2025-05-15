function Task({ task }) {
    return (
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
            <h3 className="text-lg font-bold text-gray-800">{task.titulo}</h3>
            <p className="text-gray-600">{task.descripcion}</p>
            <button className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                Eliminar
            </button>
        </div>
    );
}

export default Task;
