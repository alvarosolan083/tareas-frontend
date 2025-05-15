const TaskCounter = ({ count }) => {
    return (
      <p className="text-center text-white mt-4">
        Tienes <span className="font-bold text-cyan-400">{count}</span> tarea{count !== 1 && 's'} pendiente{count !== 1 && 's'} 📝
      </p>
    );
  };
  
  export default TaskCounter;
  