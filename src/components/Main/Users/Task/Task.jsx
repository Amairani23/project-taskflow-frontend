import { useContext } from "react"

import CurrentUserContext from "../../../../contexts/CurrentUserContext"
import EditTakUser from "../../../Popup/form/EditTak/EditTakUser"
import RemoveCard from "../../../Popup/RemoveCard/RemoveCard"

import editar from "../../../../images/editar.svg"
import borrar from "../../../../images/borrar.svg"

export default function Task({
  task,
  onOpenPopup,
  handleClosePopup,
  id,
  onTaskUpdated,
  handleUpdateTask,
  onCardDelete,
}) {
  const { usuarios, userEmail, projects } = useContext(CurrentUserContext)

  const currentUser = usuarios.find((user) => user.email === userEmail)
  const proyecto = projects?.find((project) => project._id === id)

  const isAssignedToMe =
    task.assignedTo?._id === currentUser?._id ||
    task.assignedTo === currentUser?._id

  const isOwner =
    proyecto?.ownerId?._id === currentUser?._id ||
    proyecto?.ownerId === currentUser?._id

  const canEditTask = isAssignedToMe || isOwner

  const assignedUser =
    typeof task.assignedTo === "object"
      ? task.assignedTo
      : usuarios.find((user) => user._id === task.assignedTo)

  const editTaskPopup = {
    title: "Editar tarea",
    children: (
      <EditTakUser
        task={task}
        handleClosePopup={handleClosePopup}
        proyectoAsociado={id}
        onTaskUpdated={onTaskUpdated}
        handleUpdateTask={handleUpdateTask}
      />
    ),
  }

  const removePopup = {
    title: "",
    children: <RemoveCard onDelete={handleDeleteClick} />,
  }

  function handleDeleteClick() {
    onCardDelete(task._id)
  }

  return (
    <div className=" rounded-lg shadow-md p-6 bg-[#ffffff]/30 text-white mb-6">
      <div key={task._id}>
        <div className="grid grid-cols-5 gap-4 mt-3 ">
          {/* tareas */}
          <div className="col-span-4 rounded-lg text-left mb-3">
            <h3 className="font-semibold">Tarea: {task.title}</h3>
            <p>Asignado a: {assignedUser?.name || "Propio"}</p>
          </div>
          <div className="rounded-lg text-right">
            {canEditTask && (
              <img
                src={editar}
                alt="Imagen superior"
                className="w-8 h-8 object-cover rounded-lg"
                onClick={() => onOpenPopup(editTaskPopup)}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-gray-300 pt-2">
          <div className="rounded-lg">
            {!assignedUser && (
              <img
                src={borrar}
                alt="Imagen superior"
                className="w-5 h-5 object-cover rounded-lg"
                onClick={() => onOpenPopup(removePopup)}
              />
            )}
          </div>

          <div className="flex items-center gap-2 ">
            <p className="capitalize">{task.prioridad}</p>

            {task.prioridad === "alta" ? (
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            ) : task.prioridad === "media" ? (
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            ) : (
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
