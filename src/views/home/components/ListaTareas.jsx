import { doc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { db } from "../../../repositories/firebase/config"; 

export const ListaTareas = ({ tasks }) => {
  if (!tasks.length) {
    return <p className="text-white">No tienes tareas todavía.</p>;
  }

  const toggleCompleted = async (task) => {
    try {
      const taskRef = doc(db, "Tareas", task.id);
      await updateDoc(taskRef, {
        completed: !task.completed,
        updateAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      alert("Hubo un problema al actualizar la tarea.");
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) return;

    try {
      const taskRef = doc(db, "Tareas", taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      alert("Hubo un problema al eliminar la tarea.");
    }
  };

  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center">
      {tasks.map((task) => (
        <div key={task.id} className="card border-black text-white shadow-sm" style={{ width: "19rem", backgroundColor: "#572121ff" }}>
          <div className="card-body p-3">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="card-title mb-0" style={{fontSize: "1rem",textDecoration: task.completed ? "line-through" : "none"}}>
                {task.title}
              </h5>
              <span className={`badge ${task.completed ? "bg-success" : "bg-warning text-dark"}`} style={{ fontSize: "0.7rem" }}>
                {task.completed ? "Completada" : "Pendiente"}
              </span>
            </div>

            <p className="card-text mb-2" style={{ fontSize: "0.85rem", textDecoration: task.completed ? "line-through" : "none" }}>
              {task.descripcion}
            </p>

            <div className="" style={{ fontSize: "0.7rem" }}>
              <p className="mb-1">
                Creada:{" "}
                {task.createdAt?.toDate
                  ? task.createdAt.toDate().toLocaleString()
                  : task.createdAt}
              </p>
              <p className="mb-0">
                Actualizada:{" "}
                {task.updateAt?.toDate
                  ? task.updateAt.toDate().toLocaleString()
                  : task.updateAt}
              </p>
            </div>


            <button className={`btn btn-sm w-100 mb-1 ${task.completed ? "btn-warning" : "btn-success"}`} onClick={() => toggleCompleted(task)}>
              {task.completed
                ? "Marcar como pendiente"
                : "Marcar como completada"}
            </button>

            <button className="btn btn-sm btn-danger w-100" onClick={() => deleteTask(task.id)}>
              Eliminar tarea
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
